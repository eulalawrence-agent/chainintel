'use client'

import { useState, useEffect } from 'react'

interface ChainData { name: string; tvl: number }
interface ProtocolData { name: string; tvl: number; change_1d: number; chain: string }
interface Stats {
  totalTvl: number
  chainCount: number
  protocolCount: number
  topChains: ChainData[]
  topProtocols: ProtocolData[]
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/dashboard')
        const data = await res.json()
        setStats(data)
      } catch { setStats(null) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="text-center py-20 text-[#8b949e]">Loading real-time data...</div>

  const fmt = (n: number) => {
    if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`
    if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`
    return `$${n.toFixed(0)}`
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Real TVL Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="text-sm text-[#8b949e]">Total DeFi TVL (DeFiLlama)</div>
          <div className="text-2xl font-bold text-[#58a6ff]">{stats ? fmt(stats.totalTvl) : 'N/A'}</div>
          <div className="text-xs text-[#3fb950] mt-1">Live from DeFiLlama API</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="text-sm text-[#8b949e]">Chains Tracked</div>
          <div className="text-2xl font-bold text-[#bc8cff]">{stats?.chainCount || 0}</div>
          <div className="text-xs text-[#8b949e] mt-1">Real chain data</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="text-sm text-[#8b949e]">Protocols Monitored</div>
          <div className="text-2xl font-bold text-[#d29922]">{stats?.protocolCount || 0}</div>
          <div className="text-xs text-[#8b949e] mt-1">Real protocol data</div>
        </div>
      </div>

      {/* Top Chains by TVL */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">⛓️ Chain TVL Rankings (Live)</h3>
        <div className="space-y-2">
          {stats?.topChains.map((chain, i) => {
            const maxTvl = stats.topChains[0]?.tvl || 1
            const pct = (chain.tvl / maxTvl) * 100
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 text-right text-sm text-[#8b949e]">#{i+1}</div>
                <div className="w-24 text-sm text-white">{chain.name}</div>
                <div className="flex-1 h-5 bg-[#0d1117] rounded-full overflow-hidden">
                  <div className="h-full bg-[#58a6ff] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <div className="w-24 text-right text-sm font-mono text-[#58a6ff]">{fmt(chain.tvl)}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Protocols */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">📊 Top Protocols by TVL (Live)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stats?.topProtocols.map((proto, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <div>
                <div className="text-sm text-white">{proto.name}</div>
                <div className="text-xs text-[#8b949e]">{proto.chain}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-[#58a6ff]">{fmt(proto.tvl)}</div>
                <div className={`text-xs ${proto.change_1d >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                  {proto.change_1d >= 0 ? '+' : ''}{proto.change_1d?.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
