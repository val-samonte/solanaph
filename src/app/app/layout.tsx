import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const AppWrapper = dynamic(() => import('@/components/AppWrapper'), {
  ssr: false,
})

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <AppWrapper>{children}</AppWrapper>
}
