import cs from 'classnames'
import { useAtom, useAtomValue } from 'jotai'
import { ReactNode, useMemo, useState } from 'react'
import { trimAddress } from '@/utils/trimAddress'
import { DotsThreeOutline } from '@phosphor-icons/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { FancyButton } from './FancyButton'
import { MessagesAtom, ParticipantsAtom } from './PartyKitManager'

export default function ChatPanel() {
  const { publicKey } = useWallet()
  const [showDetails, setShowDetails] = useState(true)
  const participants = useAtomValue(ParticipantsAtom)
  const [messages, sendMessage] = useAtom(MessagesAtom)
  const [chatText, setChatText] = useState('')

  const walletAddress = useMemo(
    () => publicKey?.toBase58() ?? null,
    [publicKey]
  )
  const trimmedParticipants = useMemo(
    () =>
      participants.map((participant) => ({
        trim: trimAddress(participant),
        address: participant,
      })),
    [participants]
  )

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
          <div className='mt-auto pl-4 pr-2 pb-4 flex flex-col gap-2'>
            {messages.map((message, i) => (
              <ChatMessageBubble
                name={trimAddress(message.owner)}
                key={message.timestamp}
                own={message.owner === walletAddress}
                hideName={messages[i - 1]?.owner === message.owner}
              >
                {message.data}
              </ChatMessageBubble>
            ))}
          </div>
        </div>
        <form
          className='flex-none flex gap-2 h-14 w-full border-t dark:border-gray-900/50 items-center p-2'
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(chatText)
            setChatText('')
          }}
        >
          <input
            type='text'
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            placeholder='Aa'
            className={cs(
              'flex-auto',
              'focus:outline-none border-2',
              'border-gray-500 h-10 w-full',
              'bg-transparent pl-2',
              'flex transition-colors duration-300 border-2 p-1 rounded-lg items-center'
            )}
          />
          <FancyButton
            type='submit'
            disabled={chatText === ''}
            className='flex-none'
          >
            Send
          </FancyButton>
        </form>
      </div>
      {showDetails && (
        <div
          className={cs(
            'overflow-hidden',
            'w-[22.5rem] h-full flex-none flex flex-col bg-gray-200 dark:bg-gray-800 rounded-xl'
            // 'absolute 2xl:relative right-0'
          )}
        >
          <div className='drop-shadow-xl 2xl:drop-shadow-none flex-none flex gap-4 h-14 w-full border-b dark:border-gray-900/50 items-center px-4'>
            <h2>Participants</h2>
            {/* <button
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
            </button> */}
          </div>

          <div className='flex flex-col flex-auto overflow-y-scroll overflow-x-hidden relative'>
            {trimmedParticipants.map((participant) => (
              <div
                className={cs(
                  participant.address === walletAddress && 'font-bold',
                  'flex justify-between items-center py-2 px-4 gap-4 border-b dark:border-gray-900/50'
                )}
                key={participant.address}
              >
                <div>{participant.trim}</div>
                {participant.address === walletAddress && <div>(You)</div>}
              </div>
            ))}
          </div>
          <div className='flex-none flex gap-4 h-14 w-full border-t dark:border-gray-900/50 items-center px-4'></div>
        </div>
      )}
    </div>
  )
}

function ChatMessageBubble({
  name,
  children,
  own,
  hideName,
}: {
  name: string
  children: ReactNode
  own?: boolean
  hideName?: boolean
}) {
  return (
    <div className={cs('flex flex-col', own && 'items-end')}>
      {!hideName && !own && (
        <div className='px-4 text-gray-500 text-sm mb-1'>{name}</div>
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