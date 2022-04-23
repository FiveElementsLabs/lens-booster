import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { FormGroup } from "react-bootstrap";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

//where the Superfluid logic takes place
export default async function updateSubscription(id, address, shares) {
  const sf = await Framework.create({
    networkName: "kovan",
    provider: customHttpProvider,
  });

  const signer = sf.createSigner({
    privateKey:
      "aff925838ff510ae38e25daf0971e517b7c98e8a67bbdb685875d191d25f3f03",
    provider: customHttpProvider,
  });

  const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";

  try {
    const updateSubscriptionOperation = sf.idaV1.updateSubscriptionUnits({
      indexId: id,
      superToken: DAIx,
      subscriber: address,
      units: shares,
      // userData?: string
    });

    console.log("Updating your Index...");

    await updateSubscriptionOperation.exec(signer);

    console.log(
      `Congrats - you've just updated an Index!
       Network: Kovan
       Super Token: DAIx
       Index ID: ${id}
       Subscriber: ${address}
       Units: ${shares} units
       
    `
    );
  } catch (error) {
    console.error(error);
  }
}

export const UpdateSubscription = () => {
  const [id, setId] = useState("");
  const [subscriber, setSubscriber] = useState("");
  const [units, setUnits] = useState("");

  const onUpdateSubscription = async (e) => {

    e.preventDefault();
    console.log(e.target.value);

    console.log(id, subscriber, units);
    updateSubscription(id, subscriber, units);
    // setTimeout(() => {
    //   setIsButtonLoading(false);
    // }, 1000);
  };

  const handleIdChange = (e) => {
    setId(() => ([e.target.name] = e.target.value));
  };

  const handleSubscriberChange = (e) => {
    setSubscriber(() => ([e.target.name] = e.target.value));
  };

  const handleUnitsChange = (e) => {
    setUnits(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Give Units to Subscribers of Your Index</h2>
      <form onSubmit={onUpdateSubscription}>
        <FormGroup className="mb-3">
          <FormControl>
            <FormLabel htmlFor="name">Enter your index ID</FormLabel>
            <Input name="id" value={id} onChange={handleIdChange} />
          </FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl>
            <FormLabel htmlFor="name">Enter subscriber address</FormLabel>
            <Input
              name="subscriber"
              value={subscriber}
              onChange={handleSubscriberChange}
            />
          </FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl>
            <FormLabel htmlFor="name">
              Enter the number of shares to give subscriber
            </FormLabel>
            <Input name="units" value={units} onChange={handleUnitsChange} />
          </FormControl>
        </FormGroup>
        <Button mt={5} type="submit" colorScheme="teal" variant="outline">
          Click to Update Your Index
        </Button>
      </form>
    </div>
  );
};
