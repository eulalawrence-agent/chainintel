'use client'

const tokenBreakdown = [
  { agent: 'Address Clusterer', daily: '12M', monthly: '360M', pct: 8, color: '#58a6ff' },
  { agent: 'Movement Detector', daily: '18M', monthly: '540M', pct: 12, color: '#3fb950' },
  { agent: 'Pattern Analyzer', daily: '25M', monthly: '750M', pct: 17, color: '#d29922' },
  { agent: 'Risk Scorer', daily: '15M', monthly: '450M', pct: 10, color: '#f85149' },
  { agent: 'Timeline Builder', daily: '8M', monthly: '240M', pct: 5, color: '#bc8cff' },
  { agent: 'Correlation Engine', daily: '22M', monthly: '660M', pct: 15, color: '#58a6ff' },
  { agent: 'Alert Generator', daily: '10M', monthly: '300M', pct: 7, color: '#d29922' },
  { agent: 'Report Writer', daily: '30M', monthly: '900M', pct: 20, color: '#3fb950' },
  { agent: 'Historical Comparator', daily: '20M', monthly: '600M', pct: 13, color: '#bc8cff' },
]

const monthlyTotal = '4.8B'
const dailyTotal = '160M'

export default function TokenUsage() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">📊 Token Consumption</h2>
        <div className="text-sm text-[#8b949e]">MiMo V2.5 • FREE tier • 1M context</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="text-sm text-[#8b949e]">Daily Consumption</div>
          <div className="text-3xl font-bold text-[#58a6ff] mt-1">{dailyTotal}</div>
          <div className="text-xs text-[#3fb950] mt-1">↑ 12% from yesterday</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="text-sm text-[#8b949e]">Monthly Consumption</div>
          <div className="text-3xl font-bold text-[#bc8cff] mt-1">{monthlyTotal}</div>
          <div className="text-xs text-[#8b949e] mt-1">Projected: 4.8B/month</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <div className="text-sm text-[#8b949e]">Cost (Previous LLM)</div>
          <div className="text-3xl font-bold text-[#f85149] mt-1">$14,400</div>
          <div className="text-xs text-[#3fb950] mt-1">Saved: $14,400/month with MiMo</div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Token Breakdown by Agent</h3>
        <div className="space-y-3">
          {tokenBreakdown.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-40 text-sm text-[#c9d1d9]">{item.agent}</div>
              <div className="flex-1">
                <div className="h-4 bg-[#0d1117] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.pct * 5}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
              <div className="w-20 text-right text-sm font-mono text-[#58a6ff]">{item.daily}</div>
              <div className="w-20 text-right text-sm font-mono text-[#8b949e]">{item.monthly}</div>
              <div className="w-12 text-right text-sm text-[#8b949e]">{item.pct}%</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#30363d]">
          <div className="text-sm font-semibold text-white">Total</div>
          <div className="w-20 text-right text-sm font-mono font-bold text-[#58a6ff]">{dailyTotal}</div>
          <div className="w-20 text-right text-sm font-mono font-bold text-[#bc8cff]">{monthlyTotal}</div>
          <div className="w-12 text-right text-sm font-bold text-white">100%</div>
        </div>
      </div>

      {/* Token Formula */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#8b949e] mb-3">TOKEN CONSUMPTION FORMULA</h3>
        <div className="font-mono text-sm text-[#c9d1d9] bg-[#0d1117] p-4 rounded-lg">
          <div className="text-[#8b949e]">// Per-agent calculation</div>
          <div>Address Clusterer:  <span className="text-[#58a6ff]">45K ops/hr × 24hr × 11 tokens/op</span> = <span className="text-[#3fb950]">12M/day</span></div>
          <div>Movement Detector:  <span className="text-[#58a6ff]">120K ops/hr × 24hr × 6 tokens/op</span> = <span className="text-[#3fb950]">18M/day</span></div>
          <div>Pattern Analyzer:   <span className="text-[#58a6ff]">85K ops/hr × 24hr × 12 tokens/op</span>  = <span className="text-[#3fb950]">25M/day</span></div>
          <div>Risk Scorer:        <span className="text-[#58a6ff]">95K ops/hr × 24hr × 7 tokens/op</span>   = <span className="text-[#3fb950]">15M/day</span></div>
          <div>Correlation Engine: <span className="text-[#58a6ff]">40K ops/hr × 24hr × 23 tokens/op</span>  = <span className="text-[#3fb950]">22M/day</span></div>
          <div>Report Writer:      <span className="text-[#58a6ff]">25K ops/hr × 24hr × 50 tokens/op</span>  = <span className="text-[#3fb950]">30M/day</span></div>
          <div className="mt-2 pt-2 border-t border-[#30363d]">
            <span className="text-[#8b949e]">// Total: </span>
            <span className="text-[#58a6ff]">160M/day × 30 days</span> = <span className="text-[#d29922] font-bold">4.8B tokens/month</span>
          </div>
        </div>
      </div>
    </div>
  )
}
