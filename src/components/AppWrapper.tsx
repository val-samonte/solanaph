'use client'

import cs from 'classnames'
import { ReactNode, useState } from 'react'
import WalletAdapterWrapper from './WalletAdapterWrapper'

const currencies = ['USDC', 'SOL']

export default function AppWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [mode, setMode] = useState('buy')
  const [selectedCurrency, selectCurrency] = useState('USDC')

  return (
    <WalletAdapterWrapper>
      <main className='fixed inset-0 p-4 gap-4 flex'>
        <nav className='h-full w-12'></nav>
        {/* stage */}
        <div className='h-full flex-auto'>
          <div className='dark:bg-gray-800 rounded-xl w-full h-full max-w-7xl mx-auto drop-shadow-lg flex flex-col'>
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
                  placeholder='Amount'
                  inputMode='numeric'
                  className={cs(
                    mode === 'buy' ? 'border-green-500' : 'border-red-500',
                    'bg-transparent pl-2 pr-14 w-64',
                    'flex my-2 transition-colors duration-300 border-2 p-1 rounded-lg items-center'
                  )}
                />
                <div className='absolute right-3 top-4 pl-2 border-l dark:border-gray-100/50 dark:text-gray-100/50'>
                  PHP
                </div>
              </div>
            </div>
            <div className='flex-auto'></div>
            <div className='flex-none flex gap-4 h-14 w-full border-t dark:border-gray-900/50 items-stretch px-2'>
              <div className='text-sm dark:text-gray-100/25 flex items-center px-4 gap-1'>
                <button className='dark:text-gray-100/50'>Terms of Use</button>
                <span>and</span>
                <button className='dark:text-gray-100/50'>
                  Privacy Policy
                </button>
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
                  Post an Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </WalletAdapterWrapper>
  )
}
