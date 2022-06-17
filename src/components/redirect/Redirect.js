import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { utils } from 'ethers';
import { getIpfs } from '../../lib/ipfs';
import { useSharedState } from '../../context/store';

export default function Redirect({ ...props }) {
  const [{ provider }, dispatch] = useSharedState();
  const [ipfsData, setIpfsData] = useState({});

  const ipfsHash = props.ipfshash;
  //QmW7jzEQmiEidr9TQxk7er2rMu2qCBnkvnncxnf29xXZeh
  useEffect(() => {
    const getIpfsData = async () => {
      const urlToFetch = 'https://ipfs.infura.io/ipfs/' + ipfsHash;
      let resUrl, dataIpfs;
      await fetch(urlToFetch).then((res) => (resUrl = res.url));
      await fetch(resUrl).then(async (data) => (dataIpfs = await data.json()));
      console.log(dataIpfs);
      const req = {
        campaignsAddress: dataIpfs.campaignsAddress,
        inflenserId: dataIpfs.inflenserId.hex,
      };
      fetch('https://jjmby4bsuc.execute-api.eu-west-1.amazonaws.com/redirectHandleClick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      }).then((res) => {
        window.location.href = dataIpfs.urlToRedirect;
      });
      setIpfsData(dataIpfs);

      //;
    };

    getIpfsData();
  }, []);

  return <>{ipfsData?.urlToRedirect && <Box>Redirect...</Box>}</>;
}
