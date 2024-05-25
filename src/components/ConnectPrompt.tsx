'use client'

import bs58 from 'bs58'
import { useAtom } from 'jotai'
import { atomFamily, atomWithStorage } from 'jotai/utils'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { sign } from 'tweetnacl'
import { trimAddress } from '@/utils/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Keypair } from '@solana/web3.js'

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

  const signOut = useCallback(async () => {
    await (async () => {
      if (!publicKey) return

      const storedSession = JSON.parse(
        window.localStorage.getItem(`session_${publicKey}`) ?? 'null'
      )
      if (!storedSession) return

      const sessionKeypair = Keypair.fromSecretKey(bs58.decode(storedSession))

      const message = `Signout ${publicKey.toBase58()}`
      const signature = sign.detached(
        Buffer.from(message),
        sessionKeypair.secretKey
      )

      try {
        const response = await fetch('/api/signout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            signature: bs58.encode(signature),
            session_publickey: sessionKeypair.publicKey.toBase58(),
          }),
        })

        if (!response.ok) {
          throw new Error('Signout failed')
        }

        setStoredSession(null)
        window.localStorage.removeItem(`session_${publicKey}`)
      } catch (e) {
        console.error(e)
      }
    })()
    disconnect()
  }, [publicKey, setStoredSession])

  if (connecting) return null // <>Connecting</>
  if (disconnecting) return null // <>Disconnecting</>

  if (authorized) {
    // return <>{children}</>
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  if (publicKey) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <h1 className='text-3xl font-bold'>
          Hello {trimAddress(publicKey.toBase58())} Please sign in
        </h1>
        {/* <PinInput length={6} onChange={(pin) => setPinCode(pin)} /> */}
        <button
          // disabled={pinCode?.length !== 6}
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <h1 className='text-3xl font-bold'>Connect your wallet</h1>
      <p className='text-gray-600'>To continue, please connect your wallet.</p>
      <button onClick={() => setVisible(true)}>Connect</button>
    </div>
  )
}
