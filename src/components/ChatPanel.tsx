import cs from 'classnames'
import { trimAddress } from '@/utils/trimAddress'
import { BellSimpleRinging } from '@phosphor-icons/react'

export default function ChatPanel() {
  return (
    <div className='w-[22.5rem] h-full flex-none flex flex-col bg-gray-800 rounded-xl'>
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
        <ChatCard active />
        <ChatCard />
        <div className='bg-black/20 text-sm py-1 dark:text-gray-500 px-4'>
          Makers
        </div>
        <ChatCard />
        <ChatCard />
      </div>
      <div className='flex-none flex gap-4 h-14 w-full border-t dark:border-gray-900/50 items-center px-4'>
        <div className='flex gap-4 items-center'>
          <span className='w-3 h-3 rounded-full bg-green-500' />
          <span>Online</span>
        </div>
        <div className='flex items-center ml-auto gap-1'>
          <span className='text-xs dark:text-gray-600'>Connected as</span>
          <span>
            {trimAddress('53vUyd7iFntjgcwtmAZAhtyrWmssiRvs3AvWiUJfoXw5')}
          </span>
        </div>
      </div>
    </div>
  )
}

function ChatCard({ active }: { active?: boolean }) {
  return (
    <div className='flex flex-col p-2 gap-1'>
      <div
        className={cs(
          active && 'bg-white/10',
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
                'bg-green-500',
                'relative px-4 h-10 rounded-lg dark:text-gray-800 transition-colors duration-300'
              )}
            >
              Accept
            </button>
            <button
              className={cs(
                'flex-auto',
                'bg-gray-500',
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
