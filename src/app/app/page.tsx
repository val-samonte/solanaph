'use client'

import ChatPanel from '@/components/ChatPanel'
import OrdersList from '@/components/OrdersList'

export default function App({ searchParams }: { searchParams: any }) {
  return (
    <>
      <ChatPanel />
      <OrdersList />
    </>
  )
}
