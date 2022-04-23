import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button } from '@chakra-ui/react';

//id is a number randomly generated between 1 and a billion
const id = Math.floor(Math.random() * 1000000000);

//where the Superfluid logic takes place

export default async function createIndex(indexId) {
  const sf = await Framework.create({
    networkName: "kovan",
    provider: customHttpProvider
  });

  const signer = sf.createSigner({
    privateKey:
      "aff925838ff510ae38e25daf0971e517b7c98e8a67bbdb685875d191d25f3f03",
    provider: customHttpProvider
  });

  const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";

  try {
    const createIndexOperation = sf.idaV1.createIndex({
      indexId: id,
      superToken: DAIx
      // userData?: string
    });

    console.log("Creating your Index...");

    await createIndexOperation.exec(signer);

    console.log(
      `Congrats - you've just created a new Index!
       Network: Kovan
       Super Token: DAIx
       Index ID: ${id}
    `
    );
  } catch (error) {
    console.error(error);
  }
}

export const CreateIndex = () => {
  const [setIsButtonLoading] = useState(false);


  return (
    <div>
      <h2>Create a New Index</h2>

      <Button mt={5} type="submit" colorScheme="teal" variant="outline"

        onClick={() => {
          setIsButtonLoading(true);
          createIndex(id);
          setTimeout(() => {
            setIsButtonLoading(false);
          }, 1000);
        }}
      >
        Click to Create Your Index
      </Button>
    </div>
  );
};
