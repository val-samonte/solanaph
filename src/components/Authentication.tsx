import bs58 from 'bs58'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomFamily, atomWithStorage } from 'jotai/utils'
import { ReactNode, useEffect, useState } from 'react'
import { useSignIn } from '@/hooks/useSignIn'
import { useSignOut } from '@/hooks/useSignOut'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Keypair } from '@solana/web3.js'
import { FancyButton } from './FancyButton'

// https://github.com/zkemail

export const storedSessionKeypairAtom = atomFamily((publicKey: string) =>
  atomWithStorage<string | null>(`session_${publicKey}`, null)
)
export const walletAddressAtom = atom<string | null>(null)
export const isAuthenticatedAtom = atom<boolean | null>(null)

export default function Authentication({
  children,
}: Readonly<{ children: ReactNode }>) {
  // 2 things needed in order for the user to be authenticated:
  // 1. wallet is connected
  // 2. session keypair is valid and is registered in the backend

  // session keypair is used as an authentication token which
  // takes care of the user's READ access when calling any GET API
  // this works by signing the GET API request with the session keypair
  // and the backend will verify the signature using the stored session's public key + owner's public key

  // any WRITE operations should be directly signed by the user's wallet (not by the session keypair)
  // when the user signs out, the session keypair
  // should be deleted from the user's local storage and the backend

  // steps:

  // 1. check if the user's wallet is connected
  // if not, show a button to connect the wallet

  // 2. check if the user's session keypair is valid
  // we do this with the following steps:
  // a. check if the user has indeed a session keypair stored in the local storage
  // b. check if the session keypair is valid calling the /user/:publickey/session API
  // c. we then need to call /signin API, by asking for the user's signature and submitting the session keypair to be registered in the backend
  // d. if the session keypair is valid, resume to step 3
  // e. if the session keypair is invalid, show a button to sign in

  // 3. if everything is green, show the children

  // notes:

  // to prevent flickering of rendering the components
  // we have to check for the wallet's state (connected or disconnected)
  // and the session keypair's state (valid or invalid)
  // before rendering the children

  return (
    <WalletConnect>
      <SessionKeypairCheck>{children}</SessionKeypairCheck>
    </WalletConnect>
  )
}

function WalletConnect({ children }: Readonly<{ children: ReactNode }>) {
  const { setVisible } = useWalletModal()
  const { connecting, publicKey, disconnecting } = useWallet()
  const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom)

  useEffect(() => {
    setWalletAddress(publicKey?.toBase58() || null)
  }, [publicKey, setWalletAddress])

  if (connecting) return null
  if (disconnecting) return null

  if (!walletAddress) {
    return (
      <Prompt
        title='Connect your wallet'
        cta='Connect'
        onClick={() => setVisible(true)}
      />
    )
  }

  return children
}

function SessionKeypairCheck({ children }: Readonly<{ children: ReactNode }>) {
  const walletAddress = useAtomValue(walletAddressAtom)
  const [storedSession, setStoredSession] = useAtom(
    storedSessionKeypairAtom(walletAddress || '')
  )
  const [authenticated, setAuthenticated] = useAtom(isAuthenticatedAtom)
  const [verified, setVerified] = useState<boolean | null>(null)
  const signIn = useSignIn()
  const signOut = useSignOut()

  useEffect(() => {
    setAuthenticated(!!walletAddress && !!storedSession && verified)
  }, [walletAddress, storedSession, verified, setAuthenticated])

  // check if the session keypair is valid
  useEffect(() => {
    if (!storedSession) {
      setVerified(null)
      return
    }
    const check = async () => {
      try {
        const response = await fetch(`/api/user/${walletAddress}/session`)
        if (!response.ok) {
          throw new Error('Unauthorized')
        }
        const sessionRegistered = await response.text()
        const sessionKeypair = Keypair.fromSecretKey(bs58.decode(storedSession))
        if (sessionRegistered !== sessionKeypair.publicKey.toBase58()) {
          setStoredSession(null)
          window.localStorage.removeItem(`session_${walletAddress}`)
          throw new Error('Unauthorized')
        }
        return true
      } catch (e) {
        console.error(e)
      }
      return false
    }
    check().then((verified) => setVerified(verified))
  }, [walletAddress, storedSession, setVerified])

  if (!authenticated) {
    return (
      <Prompt title='Sign in to continue' cta='Sign in' onClick={signIn}>
        <div>
          <button
            className='text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all duration-300'
            onClick={signOut}
          >
            Or you can disconnect
          </button>
        </div>
      </Prompt>
    )
  }

  return children
}

function Prompt({
  title,
  cta,
  onClick,
  children,
}: {
  title: string
  cta: string
  onClick: () => void
  children?: ReactNode
}) {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4 text-center'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <FancyButton onClick={onClick}>{cta}</FancyButton>
      {children}
    </div>
  )
}
