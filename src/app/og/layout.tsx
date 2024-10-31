import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const WalletAdapterWrapper = dynamic(
  () => import('@/components/WalletAdapterWrapper'),
  {
    ssr: false,
  }
)

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <WalletAdapterWrapper>{children}</WalletAdapterWrapper>
}
