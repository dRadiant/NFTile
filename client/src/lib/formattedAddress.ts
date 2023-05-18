export const formattedAddress = (address: string | Uint8Array): string => {
  const normalizeAddress = (address: string | Uint8Array) => {
    if (typeof address === 'string') {
      return address;
    } else {
      return Buffer.from(address).toString('hex');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    const start = address.slice(0, 4).toLowerCase();
    const end = address.slice(-2).toLowerCase();
    return `${start}...${end}`;
  };

  const normalizedAddress = normalizeAddress(address);
  return truncateAddress(normalizedAddress);
};
