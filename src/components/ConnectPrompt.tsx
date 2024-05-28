'use client'

import bs58 from 'bs58'
import { useAtom } from 'jotai'
import { atomFamily, atomWithStorage } from 'jotai/utils'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useSignOut } from '@/hooks/useSignOut'
import { trimAddress } from '@/utils/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Keypair } from '@solana/web3.js'
import { FancyButton } from './FancyButton'

export const storedSessionKeypairAtom = atomFamily((publicKey: string) =>
  atomWithStorage<string | null>(`session_${publicKey}`, null)
)
// export const sessionKeypairAtom = atomFamily((_: string) =>
//   atom<string | null>(null)
// )
// TODO: use pin-code (from the user) to encrypt session keypair
// export const userPinCodeAtom = atom<string | null>(null)

export default function ConnectPrompt({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { setVisible } = useWalletModal()
  const { connecting, publicKey, disconnecting, disconnect, signMessage } =
    useWallet()
  const [storedSession, setStoredSession] = useAtom(
    storedSessionKeypairAtom(publicKey?.toBase58() || '')
  )
  const [authorized, setAuthorized] = useState(false)
  const signOut = useSignOut()
  // const [pinCode, setPinCode] = useAtom(userPinCodeAtom)

  useEffect(() => {
    const isAuthorized = async () => {
      if (!publicKey) return false
      if (!storedSession) return false

      const storedSessionJSON = JSON.parse(
        window.localStorage.getItem(`session_${publicKey}`) ?? 'null'
      )
      if (!storedSessionJSON) return false

      try {
        const response = await fetch(
          `/api/user/${publicKey.toBase58()}/session`,
          { cache: 'no-store' }
        )

        if (!response.ok) {
          throw new Error('Unauthorized')
        }

        const sessionRegistered = await response.text()
        const sessionKeypair = Keypair.fromSecretKey(
          bs58.decode(storedSessionJSON)
        )

        if (sessionRegistered !== sessionKeypair.publicKey.toBase58()) {
          setStoredSession(null)
          window.localStorage.removeItem(`session_${publicKey}`)
          throw new Error('Unauthorized')
        }

        return true
      } catch (e) {
        console.error(e)
      }
      return false
    }
    isAuthorized().then((authorized) => setAuthorized(authorized))
  }, [publicKey, storedSession, setStoredSession, setAuthorized])

  const signIn = useCallback(async () => {
    if (!publicKey) return
    if (!signMessage) return

    // on sign in, try to decrypt the stored session keypair
    // if it succeed, reuse the same session keypair
    // and check to see if we have valid session keypair
    // in db
    // if it fails, continue with the sign in process

    const sessionKeypair = Keypair.generate()
    const sessionPublicKey = sessionKeypair.publicKey.toBase58()
    const timestamp = Date.now().toString(16)

    const message = `Solana Philippines would like you to sign this message to continue\n ${sessionPublicKey} ${timestamp}`

    const signature = bs58.encode(await signMessage(Buffer.from(message)))

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          signature,
          owner_publickey: publicKey.toBase58(),
        }),
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      // NOTE: session_keypair is only used to do "read" operations from the backend
      // or for calling signout API

      // Any "write" operations should be signed by the user's wallet

      setStoredSession(bs58.encode(sessionKeypair.secretKey))
    } catch (e) {
      console.error(e)
    }
  }, [publicKey, setStoredSession, signMessage])

  if (connecting) return null // <>Connecting</>
  if (disconnecting) return null // <>Disconnecting</>

  if (authorized) {
    return <>{children}</>
  }

  if (publicKey) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
        <h1 className='text-3xl font-bold'>
          Hello {trimAddress(publicKey.toBase58())} Please Sign In
        </h1>
        {/* <PinInput length={6} onChange={(pin) => setPinCode(pin)} /> */}
        <FancyButton
          // disabled={pinCode?.length !== 6}
          onClick={() => signIn()}
        >
          Sign In
        </FancyButton>
        <div>
          <button
            className='text-gray-500 hover:text-gray-100 transition-all duration-300'
            onClick={() => signOut()}
          >
            Or you can disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
      <h1 className='text-3xl font-bold'>Connect Your Wallet</h1>
      <FancyButton onClick={() => setVisible(true)}>Connect</FancyButton>
    </div>
  )
}
