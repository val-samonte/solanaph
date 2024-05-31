import cn from 'classnames'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { FunnelSimple } from '@phosphor-icons/react'
import { currencies, modeAtom, selectedCurrencyAtom } from './AppWrapper'
import { FancyButton } from './FancyButton'
import OrderItem from './OrderItem'

export default function OrdersList() {
  const [mode, setMode] = useAtom(modeAtom)
  const [selectedCurrency, selectCurrency] = useAtom(selectedCurrencyAtom)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className='h-full flex-auto flex gap-4 overflow-hidden relative rounded-xl'>
      <div
        className={cn(
          mode === 'buy' ? 'from-teal-400/10' : 'from-fuchsia-400/10',
          'bg-gradient-to-br to-violet-700/10 rounded-xl flex-auto h-full mx-auto flex flex-col'
        )}
      >
        <div className='flex-none flex gap-4 h-14 w-full border-b border-gray-900/10 dark:border-gray-900/50 items-stretch px-2'>
          <div
            className={cn(
              mode === 'buy'
                ? 'border-teal-600 dark:border-teal-400'
                : 'border-fuchsia-600 dark:border-fuchsia-400',
              'flex my-2 transition-colors duration-300 border-2 p-1 rounded-lg items-center'
            )}
          >
            <button
              onClick={() => setMode('buy')}
              className={cn(
                'transition-colors duration-300',
                mode === 'buy'
                  ? 'bg-teal-600 dark:bg-teal-400 text-white dark:text-gray-800'
                  : 'bg-transparent dark:text-gray-100/50',
                'px-2 h-full rounded '
              )}
            >
              Buy
            </button>
            <button
              onClick={() => setMode('sell')}
              className={cn(
                'transition-colors duration-300',
                mode === 'sell'
                  ? 'bg-fuchsia-600 dark:bg-fuchsia-400 text-white dark:text-gray-800'
                  : 'bg-transparent dark:text-gray-100/50',
                'px-2 h-full rounded'
              )}
            >
              Sell
            </button>
          </div>
          <div className='flex gap-4 items-center'>
            {currencies.map((currency) => (
              <button
                onClick={() => selectCurrency(currency)}
                key={currency}
                className={cn(
                  'transition-colors duration-300',
                  'font-bold',
                  selectedCurrency === currency
                    ? mode === 'buy'
                      ? 'text-teal-600 dark:text-teal-400'
                      : 'text-fuchsia-600 dark:text-fuchsia-400'
                    : 'dark:text-gray-100/50'
                )}
              >
                {currency}
              </button>
            ))}
          </div>
          <div className='ml-auto flex items-stretch gap-2'>
            <div className='portrait:hidden relative flex'>
              <input
                type='text'
                placeholder='Amount'
                inputMode='numeric'
                className={cn(
                  'focus:outline-none',
                  mode === 'buy'
                    ? 'border-teal-600 outline-teal-600 dark:border-teal-400 dark:outline-teal-400'
                    : 'border-fuchsia-600 outline-fuchsia-600 dark:border-fuchsia-400 dark:outline-fuchsia-400',
                  'bg-transparent pl-2 pr-14 w-64',
                  'flex my-2 transition-colors duration-300 border-2 p-1 rounded-lg items-center'
                )}
              />
              <div className='absolute right-3 top-4 pl-2'>PHP</div>
            </div>
            <div className='flex items-center'>
              <button
                onClick={() => setShowFilter((prev) => !prev)}
                className={cn(
                  showFilter
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'bg-transparent',
                  'transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10',
                  'w-9 h-9 rounded-full flex items-center justify-center'
                )}
              >
                <FunnelSimple size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className='hidden lg:grid grid-cols-12 bg-black/20 text-sm py-1 dark:text-gray-500 pr-2'>
          <div className='col-span-2 px-4'>Price</div>
          <div className='col-span-2 px-4'>
            {mode === 'buy' ? 'Seller' : 'Buyer'}
          </div>

          <div className='col-span-3 px-4'>Available / Limit</div>
          <div className='col-span-5 px-4'>Rating</div>
        </div>
        <div className='flex-auto relative overflow-y-scroll overflow-x-hidden flex flex-col'>
          {Array.from(Array(100)).map((_, i) => (
            <OrderItem
              selected={expandedIndex === i}
              onSelect={() => {
                if (expandedIndex !== i) {
                  setExpandedIndex(i)
                } else {
                  setExpandedIndex(null)
                }
              }}
              key={`order_${i}`}
            />
          ))}
        </div>
        <div className='flex-none flex gap-4 h-14 w-full border-t border-gray-900/10 dark:border-gray-900/50 items-stretch px-2'>
          <div className='hidden sm:flex dark:text-gray-100/50 items-center gap-2'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
                />
              </svg>
            </span>
            <span className='text-xs xl:text-sm'>
              The developer is not liable for any losses incurred during p2p
              transactions. Use at your own risk.
            </span>
          </div>
          <div className='py-2 sm:ml-auto w-full sm:w-auto'>
            <FancyButton>Post A Trade</FancyButton>
          </div>
        </div>
      </div>
      {/* show filter as sidebar */}
      {showFilter && (
        <div
          className={cn(
            // showFilter ? 'w-80 opacity-100' : 'w-0 opacity-0',
            // 'transition-all duration-300',
            'panel-shadow',
            'overflow-hidden',
            'w-[22.5rem] portrait:w-full h-full flex-none flex flex-col bg-gray-200 dark:bg-gray-800 rounded-xl',
            'absolute 2xl:relative right-0 z-20'
          )}
        >
          <div className='drop-shadow-xl 2xl:drop-shadow-none flex-none flex gap-4 h-14 w-full border-b border-gray-900/10 dark:border-gray-900/50 items-center px-4'>
            <h2>Filters</h2>
            <button
              className='block 2xl:hidden ml-auto hover:text-gray-600 dark:hover:text-gray-400'
              onClick={() => {
                setShowFilter(false)
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
          <div className='bg-black/20 text-sm py-1 dark:text-gray-500 px-4'>
            Sort By
          </div>
        </div>
      )}
    </div>
  )
}
