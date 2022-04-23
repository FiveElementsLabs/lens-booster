import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Spinner } from '@chakra-ui/react';

//id is a number randomly generated between 1 and a billion
const id = Math.floor(Math.random() * 1000000000);

//where the Superfluid logic takes place

async function createIndex(indexId) {
  const sf = await Framework.create({
    networkName: "kovan",
    provider: customHttpProvider
  });

  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
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
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

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
