import React, { useState } from 'react';
import { customHttpProvider } from './config';
import { Framework } from '@superfluid-finance/sdk-core';
import { FormGroup } from 'react-bootstrap';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

//where the Superfluid logic takes place
export default async function distribute(id, amount) {
  const sf = await Framework.create({
    networkName: 'kovan',
    provider: customHttpProvider,
  });

  const signer = sf.createSigner({
    privateKey: 'aff925838ff510ae38e25daf0971e517b7c98e8a67bbdb685875d191d25f3f03',
    provider: customHttpProvider,
  });

  const DAIx = '0xe3cb950cb164a31c66e32c320a800d477019dcff';

  try {
    const distributeOperation = sf.idaV1.distribute({
      indexId: id,
      superToken: DAIx,
      amount: amount,
      // userData?: string
    }, { gasLimit: 3000000, gas: 3000000 });

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

  const onDistributeFunds = async (e) => {

    e.preventDefault();
    console.log(e.target.value);

    distribute(id, amount);
    // setTimeout(() => {
    //   setIsButtonLoading(false);
    // }, 1000);
  };

  const handleIdChange = (e) => {
    setId(() => ([e.target.name] = e.target.value));
  };

  const handleAmountChange = (e) => {
    setAmount(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Distribute Funds</h2>
      <form onSubmit={onDistributeFunds}>
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
