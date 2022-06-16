import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getIpfs } from '../../lib/ipfs';
import { useSharedState } from '../../context/store';

export default function Redirect({ ...props }) {
  const [{ provider }, dispatch] = useSharedState();

  const ipfsHash = props.ipfshash;
  //QmW7jzEQmiEidr9TQxk7er2rMu2qCBnkvnncxnf29xXZeh
  useEffect(() => {
    const getIpfsData = async () => {
      const urlToFetch = 'https://ipfs.infura.io/ipfs/' + ipfsHash;
      let resUrl, dataIpfs;
      await fetch(urlToFetch).then((res) => (resUrl = res.url));
      await fetch(resUrl).then(async (data) => (dataIpfs = await data.json()));
      console.log(dataIpfs);
    };

    getIpfsData();
  }, []);

  return (
    <>
      <Box>Redirect</Box>
    </>
  );
}
