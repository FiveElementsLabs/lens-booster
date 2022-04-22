const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    mumbai: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: 'Mumbai Testnet',
      nativeCurrency: {
        name: 'Matic Testnet',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
  };
  
  export default networks;