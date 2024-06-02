'use client'

import bs58 from 'bs58'
import { atom, useAtom, useSetAtom } from 'jotai'
import { atomFamily, atomWithStorage } from 'jotai/utils'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useSignOut } from '@/hooks/useSignOut'
import { trimAddress } from '@/utils/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Keypair } from '@solana/web3.js'
import { FancyButton } from './FancyButton'

// https://github.com/zkemail

export const storedSessionKeypairAtom = atomFamily((publicKey: string) =>
  atomWithStorage<string | null>(`session_${publicKey}`, null)
)
export const walletAddressAtom = atom<string | null>(null)

// export const sessionKeypairAtom = atomFamily((_: string) =>
//   atom<string | null>(null)
// )
// TODO: use pin-code (from the user) to encrypt session keypair
// export const userPinCodeAtom = atom<string | null>(null)

// TODO: refactor this mess

export default function ConnectPrompt({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { setVisible } = useWalletModal()
  const { connecting, publicKey, disconnecting, disconnect, signMessage } =
    useWallet()
  const [storedSession, setStoredSession] = useAtom(
    storedSessionKeypairAtom(publicKey?.toBase58() || '')
  )
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const signOut = useSignOut()
  const setWalletAddress = useSetAtom(walletAddressAtom)
  const [busy, setBusy] = useState(false)
  // const [pinCode, setPinCode] = useAtom(userPinCodeAtom)

  useEffect(() => {
    setWalletAddress(publicKey?.toBase58() || null)
  }, [publicKey, setWalletAddress])

  useEffect(() => {
    // console.log(JSON.stringify({ publicKey, storedSession, authorized }))
    if (authorized) return
    if (!publicKey) {
      setAuthorized(null)
      return
    }
    if (!storedSession) {
      setAuthorized(false)
      return
    }
    const isAuthorized = async () => {
      const storedSessionJSON = JSON.parse(
        window.localStorage.getItem(`session_${publicKey}`) ?? 'null'
      )

      if (!storedSessionJSON) return false

      try {
        const response = await fetch(
          `/api/user/${publicKey.toBase58()}/session`
        )

        if (!response.ok) {
          throw new Error('Unauthorized')
        }

        const sessionRegistered = await response.text()
        // todo: was called twice
        const sessionKeypair = Keypair.fromSecretKey(
          bs58.decode(storedSessionJSON)
        )

        if (sessionRegistered !== sessionKeypair.publicKey.toBase58()) {
          setStoredSession(null)
          window.localStorage.removeItem(`session_${publicKey}`)
          throw new Error('Unauthorized')
        }

        console.log('>>>', sessionRegistered)

        return true
      } catch (e) {
        console.error(e)
      }
      return false
    }
    if (!busy) {
      setBusy(true)
      isAuthorized()
        .then((authorized) => setAuthorized(authorized))
        .finally(() => {
          setBusy(false)
        })
    }
  }, [
    busy,
    publicKey,
    storedSession,
    authorized,
    setStoredSession,
    setAuthorized,
    setBusy,
  ])

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

  if (busy) return null // <>Busy</>
  if (connecting) return null // <>Connecting</>
  if (disconnecting) return null // <>Disconnecting</>

  if (authorized && publicKey && storedSession) {
    return <>{children}</>
  }

  if (publicKey && authorized !== null) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full gap-4 text-center'>
        <h1 className='text-3xl font-bold'>
          Hello {trimAddress(publicKey.toBase58())}
          <br />
          Please Sign In
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
            className='text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all duration-300'
            onClick={() => {
              setAuthorized(false)
              signOut()
            }}
          >
            Or you can disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4 text-center'>
      <h1 className='text-3xl font-bold'>Connect Your Wallet</h1>
      <FancyButton onClick={() => setVisible(true)}>Connect</FancyButton>
    </div>
  )
}
