'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import AgentPanel from '@/components/AgentPanel'
import WhaleFeed from '@/components/WhaleFeed'
import ChainStats from '@/components/ChainStats'
import TokenUsage from '@/components/TokenUsage'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div className="min-h-screen bg-[#0d1117]" />

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Header */}
      <header className="border-b border-[#30363d] px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#58a6ff] to-[#bc8cff] flex items-center justify-center text-xl">
              🔍
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ChainIntel</h1>
              <p className="text-xs text-[#8b949e]">Cross-Chain Whale Tracker • 9 AI Agents</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d]">
              <div className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse-glow" />
              <span className="text-sm text-[#3fb950]">LIVE</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-[#58a6ff]">1.5B tokens/day</div>
              <div className="text-xs text-[#8b949e]">9 agents active</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-[#30363d] px-6">
        <div className="max-w-[1600px] mx-auto flex gap-1">
          {['dashboard', 'agents', 'whales', 'chains', 'tokens'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-[#58a6ff] border-b-2 border-[#58a6ff]'
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'agents' && <AgentPanel />}
        {activeTab === 'whales' && <WhaleFeed />}
        {activeTab === 'chains' && <ChainStats />}
        {activeTab === 'tokens' && <TokenUsage />}
      </div>
    </main>
  )
}
