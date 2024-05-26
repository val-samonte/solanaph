import cs from 'classnames'
import { trimAddress } from '@/utils/trimAddress'

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
