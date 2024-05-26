'use client'

import cs from 'classnames'
import { atom, useAtom } from 'jotai'
import { ReactNode, useState } from 'react'
import OrderItem from './OrderItem'
import WalletAdapterWrapper from './WalletAdapterWrapper'

const currencies = ['USDC', 'SOL']
export const selectedCurrencyAtom = atom(currencies[0])
export const modeAtom = atom<'buy' | 'sell'>('buy')

export default function AppWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [mode, setMode] = useAtom(modeAtom)
  const [selectedCurrency, selectCurrency] = useAtom(selectedCurrencyAtom)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <WalletAdapterWrapper>
      <main className='fixed inset-0 p-4 gap-4 flex'>
        <nav className='h-full w-12'></nav>
        {/* stage */}
        <div className='h-full flex-auto'>
          <div
            className={cs(
              mode === 'buy' ? 'from-teal-400/10' : 'from-fuchsia-400/10',
              'bg-gradient-to-br to-violet-700/10 rounded-xl w-full h-full max-w-7xl mx-auto drop-shadow-lg flex flex-col'
            )}
          >
            <div className='flex-none flex gap-4 h-14 w-full border-b dark:border-gray-900/50 items-stretch px-2'>
              <div
                className={cs(
                  mode === 'buy' ? 'border-green-500' : 'border-red-500',
                  'flex my-2 transition-colors duration-300 border-2 p-1 rounded-lg items-center'
                )}
              >
                <button
                  onClick={() => setMode('buy')}
                  className={cs(
                    'transition-colors duration-300',
                    mode === 'buy'
                      ? 'bg-green-500 text-gray-800 '
                      : 'bg-transparent dark:text-gray-100/50',
                    'px-2 h-full rounded '
                  )}
                >
                  Buy
                </button>
                <button
                  onClick={() => setMode('sell')}
                  className={cs(
                    'transition-colors duration-300',
                    mode === 'sell'
                      ? 'bg-red-500 text-gray-800 '
                      : 'bg-transparent dark:text-gray-100/50',
                    'px-2 h-full rounded'
                  )}
                >
                  Sell
                </button>
              </div>
              <div className='flex gap-4 items-center mr-auto'>
                {currencies.map((currency) => (
                  <button
                    onClick={() => selectCurrency(currency)}
                    key={currency}
                    className={cs(
                      'transition-colors duration-300',
                      selectedCurrency === currency
                        ? mode === 'buy'
                          ? 'text-green-500'
                          : 'text-red-500'
                        : 'dark:text-gray-100/50'
                    )}
                  >
                    {currency}
                  </button>
                ))}
              </div>
              <div className='relative flex'>
                <input
                  type='text'
                  placeholder='Amount'
                  inputMode='numeric'
                  className={cs(
                    mode === 'buy' ? 'border-green-500' : 'border-red-500',
                    'bg-transparent pl-2 pr-14 w-64',
                    'flex my-2 transition-colors duration-300 border-2 p-1 rounded-lg items-center'
                  )}
                />
                <div className='absolute right-3 top-4 pl-2'>PHP</div>
              </div>
            </div>
            <div className='grid grid-cols-12 bg-black/20 text-sm py-1 dark:text-gray-500 pr-2'>
              <div className='col-span-2 px-4'>
                {mode === 'buy' ? 'Seller' : 'Buyer'}
              </div>
              <div className='col-span-2 px-4'>Price</div>
              <div className='col-span-2 px-4'>Available</div>
              <div className='col-span-2 px-4'>Limit</div>
              <div className='col-span-4 px-4'>Performance</div>
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
            <div className='flex-none flex gap-4 h-14 w-full border-t dark:border-gray-900/50 items-stretch px-2'>
              <div className='text-sm dark:text-gray-100/50 flex items-center px-4 gap-1'>
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
                <span>
                  The developer is not liable for any losses incurred during p2p
                  transactions. Use at your own risk.
                </span>
                <button className='dark:text-gray-100/80'>Terms of Use</button>
                <span>and</span>
                <button className='dark:text-gray-100/80'>
                  Privacy Policy
                </button>
                <span>.</span>
              </div>
              <div className='group flex ml-auto my-2 rounded-lg overflow-hidden relative items-center justify-center'>
                <div
                  className={cs(
                    'absolute aspect-square w-36 h-36',
                    'transition-all duration-300',
                    '-rotate-45 group-hover:rotate-0',
                    'from-fuchsia-400 via-violet-700 to-teal-400 bg-gradient-to-r'
                  )}
                ></div>
                <button className={cs('relative px-4 h-full')}>
                  Post a Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </WalletAdapterWrapper>
  )
}
