'use client'

import { useState, useEffect } from 'react'

interface ChainTvl { chain: string; tvl: number }

export default function ChainStats() {
  const [chains, setChains] = useState<ChainTvl[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/chains')
        const data = await res.json()
        setChains(data.chains || [])
      } catch { setChains([]) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="text-center py-20 text-[#8b949e]">Loading chain data...</div>

  const fmt = (n: number) => {
    if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`
    if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`
    return `$${n.toFixed(0)}`
  }

  const colors = ['#627eea', '#28a0f0', '#0052ff', '#ff0420', '#8247e5', '#f3ba2f', '#9945ff', '#e84142', '#1969ff', '#4e529a', '#6d6d6d', '#ffd900', '#00c9a7', '#f42b4f', '#3d3d3d']

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">⛓️ Chain Coverage (DeFiLlama Live)</h2>
        <div className="text-sm text-[#8b949e]">{chains.length} chains • Real TVL data</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chains.map((chain, i) => (
          <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-[#58a6ff] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: (colors[i] || '#58a6ff') + '20', color: colors[i] || '#58a6ff' }}>
                {chain.chain.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-white">{chain.chain}</h4>
                <div className="text-xs text-[#8b949e]">Chain #{i+1}</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#30363d]">
              <div className="text-xs text-[#8b949e]">Total Value Locked</div>
              <div className="text-xl font-bold text-[#58a6ff]">{fmt(chain.tvl)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
