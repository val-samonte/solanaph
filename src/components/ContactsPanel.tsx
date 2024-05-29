import cs from 'classnames'
import { useMemo } from 'react'
import { trimAddress } from '@/utils/trimAddress'
import { BellSimpleRinging } from '@phosphor-icons/react'
import { useWallet } from '@solana/wallet-adapter-react'

export default function ContactsPanel() {
  const { publicKey } = useWallet()

  const walletAddress = useMemo(
    () => (publicKey ? trimAddress(publicKey.toBase58()) : null),
    [publicKey]
  )

  return (
    <div className='w-[22.5rem] h-full flex-none flex flex-col bg-gray-200 dark:bg-gray-800 rounded-xl'>
      <div className='flex-none flex gap-4 h-14 w-full border-b dark:border-gray-900/50 items-center px-4'>
        <h2>Contacts</h2>
        <div className='flex items-center ml-auto gap-2'>
          <span className='dark:text-gray-600'>SOL&nbsp;</span>
          <span>₱9,535.17</span>
          <span className='flex items-center text-red-500 gap-1'>
            <div
              className={cs(
                'rotate-180',
                'w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-t-0 border-b-red-500'
              )}
            />
            <span className='text-xs'>2.2%</span>
          </span>
        </div>
      </div>
      <div className='flex-auto flex flex-col'>
        <div className='bg-black/20 text-sm py-1 dark:text-gray-500 px-4'>
          Takers
        </div>
        <ContactCard active />
        <ContactCard />
        <div className='bg-black/20 text-sm py-1 dark:text-gray-500 px-4'>
          Makers
        </div>
        <ContactCard />
        <ContactCard />
      </div>
      <div className='flex-none flex gap-4 h-14 w-full border-t dark:border-gray-900/50 items-center px-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-3 h-3 rounded-full bg-green-500' />
          <span>Online</span>
        </div>
        {walletAddress && (
          <div className='flex items-center ml-auto gap-1'>
            <span className='text-xs dark:text-gray-600'>Connected as</span>
            <span>{walletAddress}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ContactCard({ active }: { active?: boolean }) {
  return (
    <div className='flex flex-col p-2 gap-1'>
      <div
        className={cs(
          'transition-all duration-300',
          active
            ? 'bg-black/5 dark:bg-white/10'
            : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
          'rounded-lg flex flex-col p-2 gap-2'
        )}
      >
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <h3 className='font-bold'>
              {trimAddress('53vUyd7iFntjgcwtmAZAhtyrWmssiRvs3AvWiUJfoXw5')}
            </h3>
            {active && (
              <div className='flex items-center ml-auto'>
                <BellSimpleRinging size={16} />
              </div>
            )}
          </div>
          <p>Selling 1 SOL for 9000 PHP</p>
        </div>
        {active && (
          <div className='flex gap-2'>
            <button
              className={cs(
                'flex-auto',
                'text-white bg-green-500 hover:bg-green-600 dark:hover:bg-green-400',
                'relative px-4 h-10 rounded-lg dark:text-gray-800 transition-colors duration-300'
              )}
            >
              Accept
            </button>
            <button
              className={cs(
                'flex-auto',
                'text-white bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400',
                'relative px-4 h-10 rounded-lg dark:text-gray-800 transition-colors duration-300'
              )}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
