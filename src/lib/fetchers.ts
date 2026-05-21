// Real data fetchers using free APIs (no API key required)

const DEFILLAMA_BASE = 'https://api.llama.fi';
const COINS_BASE = 'https://coins.llama.fi';

// ============ DeFiLlama Fetchers ============

export async function fetchProtocols() {
  try {
    const res = await fetch(`${DEFILLAMA_BASE}/protocols`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.slice(0, 50).map((p: any) => ({
      name: p.name,
      slug: p.slug,
      chain: p.chain,
      tvl: p.tvl,
      change_1d: p.change_1d,
      change_7d: p.change_7d,
      category: p.category,
    }));
  } catch { return []; }
}

export async function fetchChainTvls() {
  try {
    const res = await fetch(`${DEFILLAMA_BASE}/v2/chains`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data
      .filter((c: any) => c.tvl > 0)
      .sort((a: any, b: any) => b.tvl - a.tvl)
      .slice(0, 15)
      .map((c: any) => ({
        name: c.name,
        tvl: c.tvl,
        chainId: c.chainId,
      }));
  } catch { return []; }
}

export async function fetchPrices(coins: string[]) {
  try {
    const coinsParam = coins.map(c => `coingecko:${c}`).join(',');
    const res = await fetch(`${COINS_BASE}/prices/current/${coinsParam}`);
    const data = await res.json();
    return Object.entries(data.coins || {}).map(([key, val]: [string, any]) => ({
      coin: key.replace('coingecko:', ''),
      price: val.price,
      confidence: val.confidence,
    }));
  } catch { return []; }
}

export async function fetchStablecoins() {
  try {
    const res = await fetch(`${DEFILLAMA_BASE}/stablecoins`, { next: { revalidate: 300 } });
    const data = await res.json();
    return (data.peggedAssets || []).slice(0, 10).map((s: any) => ({
      name: s.name,
      symbol: s.symbol,
      circulating: s.circulating?.peggedUSD || 0,
      chainCirculating: s.chainCirculating || {},
    }));
  } catch { return []; }
}

export async function fetchTvlByChain() {
  try {
    const res = await fetch(`${DEFILLAMA_BASE}/v2/chains`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data
      .filter((c: any) => c.tvl > 1000000)
      .sort((a: any, b: any) => b.tvl - a.tvl)
      .map((c: any) => ({
        chain: c.name,
        tvl: c.tvl,
      }));
  } catch { return []; }
}

// ============ Known Whale Addresses ============

export const WHALE_ADDRESSES = {
  ethereum: [
    { addr: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8', label: 'Binance Cold Wallet', type: 'exchange' },
    { addr: '0x28C6c06298d514Db089934071355E5743bf21d60', label: 'Binance Hot Wallet', type: 'exchange' },
    { addr: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18', label: 'Jump Trading', type: 'institutional' },
    { addr: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d', label: 'Wintermute', type: 'institutional' },
    { addr: '0xf977814e90dA44bFA03b6295A0616a897441aceC', label: 'Alameda Research', type: 'defunct' },
    { addr: '0x56Eddb7aa87536c09CCc2793473599fD21A8b17F', label: 'Coinbase Prime', type: 'exchange' },
    { addr: '0xA7EFAe728D2936e78BDA97dc267687568dD593f3', label: 'Maker: PSM-USDC', type: 'protocol' },
    { addr: '0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503', label: 'Justin Sun', type: 'individual' },
  ],
  arbitrum: [
    { addr: '0x176F3DAb24a159341c0509bB36B63E4f4f431C1f', label: 'Arbitrum: Bridge', type: 'protocol' },
    { addr: '0xc3a6F888A88e38B8b74C813c3cF3AbF7D3F19F75', label: 'GMX: Treasury', type: 'protocol' },
  ],
  base: [
    { addr: '0x3cD751E6b0078Be393132286c442345e68FF0aab', label: 'Base: Sequencer', type: 'protocol' },
  ],
  bsc: [
    { addr: '0x8894E0a0c962CB723c1ef8a1B26D52B3B2F6bB84', label: 'Binance: Hot Wallet', type: 'exchange' },
    { addr: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8', label: 'Binance Cold', type: 'exchange' },
  ],
  solana: [
    { addr: '5tzFkiKscjHKkLqPS42bFvFRwPNN3fkJU4rCQ4VmUjR', label: 'Wintermute (SOL)', type: 'institutional' },
    { addr: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', label: 'Binance (SOL)', type: 'exchange' },
  ],
};

// ============ RPC Fetchers (Free, no API key) ============

const RPC_ENDPOINTS: Record<string, string> = {
  ethereum: 'https://ethereum.publicnode.com',
  arbitrum: 'https://arb1.arbitrum.io/rpc',
  base: 'https://mainnet.base.org',
  optimism: 'https://mainnet.optimism.io',
  bsc: 'https://bsc-dataseed.binance.org',
  polygon: 'https://polygon-rpc.com',
};

export async function fetchBalance(chain: string, address: string): Promise<string> {
  const rpc = RPC_ENDPOINTS[chain];
  if (!rpc) return '0';
  try {
    const res = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }),
    });
    const data = await res.json();
    const wei = parseInt(data.result, 16);
    return (wei / 1e18).toFixed(4);
  } catch { return '0'; }
}

export async function fetchBlockNumber(chain: string): Promise<number> {
  const rpc = RPC_ENDPOINTS[chain];
  if (!rpc) return 0;
  try {
    const res = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    });
    const data = await res.json();
    return parseInt(data.result, 16);
  } catch { return 0; }
}

// ============ Combined Dashboard Data ============

export async function getDashboardData() {
  const [chains, protocols, stablecoins] = await Promise.all([
    fetchChainTvls(),
    fetchProtocols(),
    fetchStablecoins(),
  ]);

  const totalTvl = chains.reduce((sum: number, c: any) => sum + c.tvl, 0);

  return {
    chains,
    protocols,
    stablecoins,
    stats: {
      totalTvl,
      chainCount: chains.length,
      protocolCount: protocols.length,
      topChains: chains.slice(0, 5),
      topProtocols: protocols.slice(0, 10),
      stablecoinVolume: stablecoins.reduce((sum: number, s: any) => sum + (s.circulating || 0), 0),
    },
  };
}
