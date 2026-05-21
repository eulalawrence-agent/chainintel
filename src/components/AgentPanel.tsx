'use client'

const agents = [
  {
    name: 'Address Clusterer',
    desc: 'Groups related addresses using heuristic analysis and on-chain behavior patterns',
    tokens: '12M/day',
    ops: '45K/hr',
    accuracy: '94.2%',
    icon: '🔗',
    color: '#58a6ff',
  },
  {
    name: 'Movement Detector',
    desc: 'Real-time detection of large fund movements across 15+ chains',
    tokens: '18M/day',
    ops: '120K/hr',
    accuracy: '99.1%',
    icon: '📡',
    color: '#3fb950',
  },
  {
    name: 'Pattern Analyzer',
    desc: 'Identifies trading patterns, accumulation/distribution cycles',
    tokens: '25M/day',
    ops: '85K/hr',
    accuracy: '87.6%',
    icon: '📊',
    color: '#d29922',
  },
  {
    name: 'Risk Scorer',
    desc: 'Scores whale addresses by manipulation risk, rugpull probability',
    tokens: '15M/day',
    ops: '95K/hr',
    accuracy: '91.3%',
    icon: '⚠️',
    color: '#f85149',
  },
  {
    name: 'Timeline Builder',
    desc: 'Constructs chronological event sequences for whale activity analysis',
    tokens: '8M/day',
    ops: '60K/hr',
    accuracy: '96.8%',
    icon: '📅',
    color: '#bc8cff',
  },
  {
    name: 'Correlation Engine',
    desc: 'Cross-references whale movements with price, sentiment, and news',
    tokens: '22M/day',
    ops: '40K/hr',
    accuracy: '82.4%',
    icon: '🔗',
    color: '#58a6ff',
  },
  {
    name: 'Alert Generator',
    desc: 'Generates actionable alerts based on multi-agent consensus',
    tokens: '10M/day',
    ops: '35K/hr',
    accuracy: '93.7%',
    icon: '🚨',
    color: '#d29922',
  },
  {
    name: 'Report Writer',
    desc: 'Generates comprehensive whale analysis reports with visualizations',
    tokens: '30M/day',
    ops: '25K/hr',
    accuracy: '95.1%',
    icon: '📝',
    color: '#3fb950',
  },
  {
    name: 'Historical Comparator',
    desc: 'Compares current patterns with historical data for anomaly detection',
    tokens: '20M/day',
    ops: '55K/hr',
    accuracy: '89.5%',
    icon: '📈',
    color: '#bc8cff',
  },
]

export default function AgentPanel() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">🤖 AI Agent Pipeline</h2>
        <div className="text-sm text-[#8b949e]">9 agents • 1.5B tokens/day • 15 chains</div>
      </div>

      {/* Pipeline Flow */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#8b949e] mb-3">PROCESSING PIPELINE</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {agents.map((agent, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className="px-3 py-2 rounded-lg border border-[#30363d] bg-[#0d1117] text-center min-w-[120px]">
                <div className="text-lg">{agent.icon}</div>
                <div className="text-xs text-[#c9d1d9] mt-1">{agent.name}</div>
              </div>
              {i < agents.length - 1 && (
                <div className="text-[#30363d] text-lg">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, i) => (
          <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-[#58a6ff] transition-colors">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{agent.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{agent.name}</h4>
                <p className="text-sm text-[#8b949e] mt-1">{agent.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#30363d]">
              <div>
                <div className="text-xs text-[#8b949e]">Tokens</div>
                <div className="text-sm font-mono" style={{ color: agent.color }}>{agent.tokens}</div>
              </div>
              <div>
                <div className="text-xs text-[#8b949e]">Throughput</div>
                <div className="text-sm font-mono text-[#58a6ff]">{agent.ops}</div>
              </div>
              <div>
                <div className="text-xs text-[#8b949e]">Accuracy</div>
                <div className="text-sm font-mono text-[#3fb950]">{agent.accuracy}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
