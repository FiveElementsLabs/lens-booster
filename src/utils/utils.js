export const shortenAddress = (address) => (address ? address.slice(0, 4) + '...' + address.slice(-4) : 'No Wallet');
