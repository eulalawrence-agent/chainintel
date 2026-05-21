'use client'

const whales = [
  { addr: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18', chain: 'Ethereum', label: 'Jump Trading', balance: '45,230 ETH', risk: 'low', tags: ['institutional', 'market-maker'] },
  { addr: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8', chain: 'Ethereum', label: 'Binance Cold', balance: '289,150 ETH', risk: 'low', tags: ['exchange', 'cold-wallet'] },
  { addr: '0xf977814e90dA44bFA03b6295A0616a897441aceC', chain: 'Ethereum', label: 'Alameda Research', balance: '12,450 ETH', risk: 'high', tags: ['defunct', 'monitoring'] },
  { addr: '0x28C6c06298d514Db089934071355E5743bf21d60', chain: 'Ethereum', label: 'Binance Hot', balance: '156,890 ETH', risk: 'medium', tags: ['exchange', 'hot-wallet'] },
  { addr: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d', chain: 'Arbitrum', label: 'Wintermute', balance: '8,200 ETH', risk: 'low', tags: ['institutional', 'trading'] },
  { addr: '0x56Eddb7aa87536c09CCc2793473599fD21A8b17F', chain: 'Base', label: 'BaseDeployer', balance: '5,100 ETH', risk: 'medium', tags: ['deployer', 'monitoring'] },
]

export default function WhaleFeed() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">🐋 Whale Registry</h2>
        <div className="text-sm text-[#8b949e]">12,847 tracked addresses • 15 chains</div>
      </div>

      <div className="space-y-3">
        {whales.map((whale, i) => (
          <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-[#58a6ff] transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{whale.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    whale.risk === 'high' ? 'bg-[#f85149]/20 text-[#f85149]' :
                    whale.risk === 'medium' ? 'bg-[#d29922]/20 text-[#d29922]' :
                    'bg-[#3fb950]/20 text-[#3fb950]'
                  }`}>
                    {whale.risk} risk
                  </span>
                </div>
                <div className="font-mono text-sm text-[#58a6ff] mt-1">{whale.addr}</div>
                <div className="flex gap-2 mt-2">
                  {whale.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded bg-[#30363d] text-[#8b949e]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#8b949e]">{whale.chain}</div>
                <div className="text-lg font-bold text-white mt-1">{whale.balance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
