import cs from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSignOut } from '@/hooks/useSignOut'
import {
  ChatCircle,
  DotsNine,
  GearSix,
  Monitor,
  Swap,
  Wallet,
} from '@phosphor-icons/react'

export default function AppNav() {
  const signOut = useSignOut()
  const path = usePathname()

  return (
    <nav className='h-full w-11 flex flex-col gap-2'>
      <Image width={44} height={44} src='/logo.svg' alt='Solana Philippines' />
      <div className='flex flex-col gap-2'>
        <Link
          href='/app/p2p/trade'
          className={cs(
            path.includes('/app/p2p/trade')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-transparent',
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10'
          )}
        >
          <Swap size={30} />
        </Link>
        <Link
          href='/app/p2p/dashboard'
          className={cs(
            path.includes('/app/p2p/dashboard')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-transparent',
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10'
          )}
        >
          <Monitor size={30} />
        </Link>
        <Link
          href='/app/p2p/chat'
          className={cs(
            path.includes('/app/p2p/chat')
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-transparent',
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10'
          )}
        >
          <ChatCircle size={30} />
        </Link>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <DotsNine size={30} />
        </button>
      </div>
      <div className='mt-auto flex flex-col gap-2'>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <GearSix size={30} />
        </button>
        <button
          onClick={() => signOut()}
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Wallet size={30} />
        </button>
      </div>
    </nav>
  )
}
