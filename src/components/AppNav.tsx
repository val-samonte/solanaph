import cs from 'classnames'
import Image from 'next/image'
import {
  ChatCircle,
  DotsNine,
  GearSix,
  Monitor,
  Swap,
  Wallet,
} from '@phosphor-icons/react'

export default function AppNav() {
  return (
    <nav className='h-full w-11 flex flex-col gap-2'>
      <Image width={44} height={44} src='/logo.svg' alt='Solana Philippines' />
      <div className='flex flex-col gap-2'>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Swap size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Monitor size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <ChatCircle size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
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
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <GearSix size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Wallet size={30} />
        </button>
      </div>
    </nav>
  )
}
