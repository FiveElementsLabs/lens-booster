import React, { useState } from 'react';
import { customHttpProvider } from './config';
import { Framework } from '@superfluid-finance/sdk-core';
import { Form, FormGroup, Spinner } from 'react-bootstrap';
import { Button, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';

//where the Superfluid logic takes place
async function distribute(id, amount) {
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
    const distributeOperation = sf.idaV1.distribute({
      indexId: id,
      superToken: DAIx,
      amount: amount,
      // userData?: string
    });

    console.log('Distributing funds to your index subscribers...');

    await distributeOperation.exec(signer);

    console.log(
      `Congrats - you've just sent funds to your index!
       Network: Kovan
       Super Token: DAIx
       Index ID: ${id}
       Total Sent: ${amount}
    `,
    );
  } catch (error) {
    console.error(error);
  }
}

export const DistributeFunds = () => {
  const [id, setId] = useState('');
  const [amount, setAmount] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function DistributeButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleIdChange = (e) => {
    setId(() => ([e.target.name] = e.target.value));
  };

  const handleAmountChange = (e) => {
    setAmount(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Distribute Funds</h2>
      <form onSubmit={distribute}>
        <FormGroup className="mb-3">
          <FormControl mt={5}>
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
            <FormLabel htmlFor="name">Enter an amount to distribute in wei</FormLabel>
            <Input
              name="amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </FormControl>
        </FormGroup>
        <Button mt={5} type="submit" colorScheme="teal" variant="outline">
          Click to Distribute Funds to Your Index
        </Button>
      </form>
    </div>
  );
};
