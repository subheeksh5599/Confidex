export function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function formatBalance(value: string | bigint, decimals: number): string {
  const big = typeof value === "string" ? BigInt(value) : value;
  if (decimals === 0) return big.toString();
  const divisor = 10n ** BigInt(decimals);
  const intPart = big / divisor;
  const fracPart = big % divisor;
  const padded = fracPart.toString().padStart(decimals, "0").replace(/0+$/, "");
  return padded ? `${intPart}.${padded}` : intPart.toString();
}

export function getExplorerUrl(address: string): string {
  return `https://sepolia.etherscan.io/address/${address}`;
}

export function getBlockscoutUrl(address: string): string {
  return `https://eth-sepolia.blockscout.com/address/${address}`;
}
