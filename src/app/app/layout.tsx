import bs58 from 'bs58'
import { cookies } from 'next/headers'
import AppWrapper from '@/components/AppWrapper'
import { decrypt } from '@/utils/encrypt'
import { hashv } from '@/utils/hashv'

// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

// const WalletAdapterWrapper = dynamic(
//   () => import('@/components/WalletAdapterWrapper'),
//   {
//     ssr: false,
//   }
// )

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // get the cookies, parse it and retrieve the public key

  const encryptedSession = cookies().get('session')
  let publicKey = ''

  if (encryptedSession?.value) {
    // hash it so that it is still hidden
    publicKey = bs58.encode(
      hashv([bs58.decode(decrypt(encryptedSession.value).split('.')[0])])
    )
  }

  return <AppWrapper sessionHash={publicKey} children={children} />
}
