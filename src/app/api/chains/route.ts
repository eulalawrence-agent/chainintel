import { NextResponse } from 'next/server'
import { fetchTvlByChain } from '@/lib/fetchers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const chains = await fetchTvlByChain()
    return NextResponse.json({ chains })
  } catch {
    return NextResponse.json({ chains: [] })
  }
}
