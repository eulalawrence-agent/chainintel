import { NextResponse } from 'next/server'
import { fetchChainTvls, fetchProtocols, fetchStablecoins } from '@/lib/fetchers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [chains, protocols, stablecoins] = await Promise.all([
      fetchChainTvls(),
      fetchProtocols(),
      fetchStablecoins(),
    ])

    const totalTvl = chains.reduce((sum: number, c: any) => sum + c.tvl, 0)

    return NextResponse.json({
      chains,
      protocols,
      stablecoins,
      totalTvl,
      chainCount: chains.length,
      protocolCount: protocols.length,
      topChains: chains.slice(0, 10),
      topProtocols: protocols.slice(0, 10),
      stablecoinVolume: stablecoins.reduce((sum: number, s: any) => sum + (s.circulating || 0), 0),
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
