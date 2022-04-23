import React, { useState } from 'react';
import { customHttpProvider } from './config';
import { Framework } from '@superfluid-finance/sdk-core';
import { FormGroup, Spinner } from 'react-bootstrap';
import { Button, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';

//where the Superfluid logic takes place
async function updateSubscription(id, address, shares) {
  const sf = await Framework.create({
    networkName: 'kovan',
    provider: customHttpProvider,
  });

  const signer = sf.createSigner({
    privateKey: '0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1',
    provider: customHttpProvider,
  });

  const DAIx = '0xe3cb950cb164a31c66e32c320a800d477019dcff';

  try {
    const updateSubscriptionOperation = sf.idaV1.updateSubscriptionUnits({
      indexId: id,
      superToken: DAIx,
      subscriber: address,
      units: shares,
      // userData?: string
    });

    console.log('Updating your Index...');

    await updateSubscriptionOperation.exec(signer);

    console.log(
      `Congrats - you've just updated an Index!
       Network: Kovan
       Super Token: DAIx
       Index ID: ${id}
       Subscriber: ${address}
       Units: ${shares} units
       
    `,
    );
  } catch (error) {
    console.error(error);
  }
}

export const UpdateSubscription = () => {
  const [id, setId] = useState('');
  const [subscriber, setSubscriber] = useState('');
  const [units, setUnits] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function UpdateSubButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

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
      <form>
        <FormGroup className="mb-3">
          <FormControl>
            <FormLabel htmlFor="name">Enter your index ID</FormLabel>
            <Input
              name="id"
              value={id}
              onChange={handleIdChange}
            />
          </FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl>
            <FormLabel htmlFor="name">Enter subscriber address</FormLabel>
            <Input
              name="subscriber"
              value={subscriber}
              onChange={handleSubscriberChange}
              color={useColorModeValue('white', 'black')}
            />
          </FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl>
            <FormLabel htmlFor="name">Enter the number of shares to give subscriber</FormLabel>
            <Input
              name="units"
              value={units}
              onChange={handleUnitsChange}
              color={useColorModeValue('white', 'black')}
            />
          </FormControl>
        </FormGroup>
        <Button mt={5} type="submit" colorScheme="teal" variant="outline"
          onClick={() => {
            setIsButtonLoading(true);
            updateSubscription(id, subscriber, units);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Update Your Index
        </Button>
      </form>
    </div>
  );
};
