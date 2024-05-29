import cs from 'classnames'
import { ReactNode, useState } from 'react'
import { DotsThreeOutline } from '@phosphor-icons/react'
import { FancyButton } from './FancyButton'

export default function ChatPanel() {
  const [showDetails, setShowDetails] = useState(true)

  return (
    <div className='h-full flex-auto flex gap-4 overflow-hidden relative'>
      <div className='h-full flex-auto flex flex-col bg-gray-200 dark:bg-gray-800 rounded-xl'>
        <div className='flex-none flex gap-4 h-14 w-full border-b dark:border-gray-900/50 items-center px-4'>
          <h2>Chat Lobby</h2>
          <div className='flex items-center ml-auto gap-2'>
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className={cs(
                showDetails ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent',
                'transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10',
                'w-9 h-9 rounded-full flex items-center justify-center'
              )}
            >
              <DotsThreeOutline size={16} />
            </button>
          </div>
        </div>
        {/* chat body */}
        <div className='flex flex-col flex-auto overflow-y-scroll overflow-x-hidden relative '>
          <div className='mt-auto pl-4 pr-2 pb-4 flex flex-col gap-4'>
            <ChatMessageBubble>
              Hello, I'm looking to buy some SOL. Can you help me with that?
            </ChatMessageBubble>
            <ChatMessageBubble own>
              Sure! How much are you looking to buy?
            </ChatMessageBubble>
          </div>
        </div>
        <div className='flex-none flex gap-2 h-14 w-full border-t dark:border-gray-900/50 items-center p-2'>
          <input
            type='text'
            placeholder='Aa'
            className={cs(
              'flex-auto',
              'focus:outline-none border-2',
              'border-gray-500 h-10 w-full',
              'bg-transparent pl-2',
              'flex transition-colors duration-300 border-2 p-1 rounded-lg items-center'
            )}
          />
          <FancyButton className='flex-none'>Send</FancyButton>
        </div>
      </div>
      {showDetails && (
        <div
          className={cs(
            'overflow-hidden',
            'w-[22.5rem] h-full flex-none flex flex-col bg-gray-200 dark:bg-gray-800 rounded-xl',
            'absolute 2xl:relative right-0'
          )}
        >
          <div className='drop-shadow-xl 2xl:drop-shadow-none flex-none flex gap-4 h-14 w-full border-b dark:border-gray-900/50 items-center px-4'>
            <h2>Participants</h2>
            <button
              className='block 2xl:hidden ml-auto hover:text-gray-600 dark:hover:text-gray-400'
              onClick={() => {
                setShowDetails(false)
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='flex flex-auto overflow-y-scroll overflow-x-hidden relative'>
            {/* <div className='bg-black/20 text-sm py-1 dark:text-gray-500 px-4'>
            Sort By
          </div> */}
          </div>
          <div className='flex-none flex gap-4 h-14 w-full border-t dark:border-gray-900/50 items-center px-4'></div>
        </div>
      )}
    </div>
  )
}

function ChatMessageBubble({
  children,
  own,
  hideName,
}: {
  children: ReactNode
  own?: boolean
  hideName?: boolean
}) {
  return (
    <div className={cs('flex flex-col', own && 'items-end')}>
      {!hideName && !own && (
        <div className='px-4 text-gray-500 text-sm'>Anon</div>
      )}
      {/* chat bubble row */}
      <div className={cs('flex', own && 'flex-row-reverse')}>
        {/* text content */}
        <div
          className={cs(
            own ? 'bg-teal-600' : 'bg-black/5 dark:bg-white/10 ',
            'py-2 px-4 rounded-lg',
            own ? 'rounded-br-none' : 'rounded-bl-none'
          )}
        >
          {children}
        </div>
        {/* hidden action buttons */}
        <div className='w-64'></div>
      </div>
    </div>
  )
}
