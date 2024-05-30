import cs from 'classnames'
import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { trimAddress } from '@/utils/trimAddress'
import {
  BellSimpleRinging,
  Copy,
  FacebookLogo,
  Star,
  Timer,
} from '@phosphor-icons/react'
import { modeAtom, selectedCurrencyAtom } from './AppWrapper'

export default function OrderItem({
  selected,
  onSelect,
}: {
  selected: boolean
  onSelect: () => void
}) {
  const selectedCurrency = useAtomValue(selectedCurrencyAtom)
  const mode = useAtomValue(modeAtom)
  const [readMore, setReadMore] = useState(false)
  const makerTerms = useRef<HTMLDivElement>(null)
  const payField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!readMore && makerTerms.current) {
      makerTerms.current.scrollTop = 0
    }
  }, [readMore])

  useEffect(() => {
    if (!selected) {
      setReadMore(false)
    }
  }, [selected, setReadMore])

  useEffect(() => {
    if (selected && payField.current) {
      setTimeout(() => {
        payField.current?.focus()
      })
    }
  }, [selected])

  return (
    <div
      className={cs(
        selected && 'sticky top-0',
        'flex flex-col border-b border-gray-900/10 dark:border-gray-900/50'
      )}
    >
      <button
        onClick={onSelect}
        className={cs(
          selected
            ? 'bg-gray-200 dark:bg-gray-800'
            : ' bg-transparent dark:hover:bg-white/10 hover:bg-black/5',
          'grid grid-cols-12 text-left py-2 transition-all duration-300'
        )}
      >
        <div
          className={cs(
            'transition-all duration-300',
            selected &&
              (mode === 'buy'
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-fuchsia-600 dark:text-fuchsia-400'),
            'col-span-2 px-4 font-bold'
          )}
        >
          57.50 PHP
        </div>
        <div className='col-span-2 px-4'>
          {trimAddress('53vUyd7iFntjgcwtmAZAhtyrWmssiRvs3AvWiUJfoXw5')}
        </div>

        <div className='col-span-3 px-4'>
          900 {selectedCurrency} <span className='dark:text-gray-600'>/</span>{' '}
          500-1000 PHP
        </div>
        <div className='col-span-5 px-4 flex gap-4 flex-wrap'>
          <span>
            896 <span className='text-xs dark:text-gray-600'>orders</span>
          </span>
          <span>
            98% <span className='text-xs dark:text-gray-600'>completion</span>
          </span>
          <span className='flex items-center'>
            <Timer size={16} />
            &nbsp;
            <span>
              15 <span className='text-xs dark:text-gray-600'>min</span>
            </span>
          </span>
          <span className='ml-auto flex items-center'>
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
          </span>
        </div>
      </button>
      <div
        className={cs(
          selected ? (readMore ? 'h-80' : 'h-40') : 'h-0',
          'shadow-lg',
          'overflow-hidden transition-all duration-300 bg-gray-200 dark:bg-gray-800 px-2'
        )}
      >
        <div
          className={cs(
            'grid grid-cols-12',
            'transition-all duration-300',
            readMore ? 'h-80' : 'h-40'
          )}
        >
          <div className='col-span-7 flex flex-col p-4 gap-2 h-full '>
            <div className='text-xs text-gray-500'>
              {mode === 'buy' ? "Seller's" : "Buyer's"} terms (Please read
              carefully)
            </div>
            <div className='relative'>
              <div
                ref={makerTerms}
                className={cs(
                  'flex-auto flex flex-col',
                  'transition-all duration-300',
                  readMore ? 'h-52 overflow-auto' : 'h-12 overflow-hidden'
                )}
              >
                Wallet should be the same used in this app
                {/* Maker's terms here */}
              </div>
              {!readMore && (
                <div
                  className={cs(
                    'pointer-events-none',
                    'absolute bottom-0 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-800 inset-x-0 h-4'
                  )}
                />
              )}
            </div>

            <button
              onClick={() => setReadMore((r) => !r)}
              className={cs(
                'w-full flex flex-col justify-end text-xs uppercase py-1',
                'transition-colors duration-300',
                'text-gray-500 hover:text-gray-800',
                'dark:hover:text-gray-100'
              )}
            >
              {readMore ? 'Read Less' : 'Read More'}
            </button>

            <div className='mt-auto flex gap-4 items-center'>
              <div className='flex items-center gap-4'>
                <span className='flex items-center gap-2 text-xs text-gray-500'>
                  <FacebookLogo size={16} />
                  Member
                </span>
                <span className='flex items-center gap-2 text-xs text-gray-500'>
                  <Copy size={16} />
                  53vUyd7iFntjgcwtmAZAhtyrWmssiRvs3AvWiUJfoXw5
                </span>
              </div>
            </div>
          </div>
          <div className='mb-auto col-span-5 flex flex-col p-2 gap-2 rounded-lg bg-black/5 dark:bg-white/10'>
            <div className='flex items-center gap-4'>
              <div className='w-20 text-gray-800 dark:text-gray-200 pl-2'>
                {mode === 'buy' ? 'Pay' : 'Sell'}
              </div>
              <div className='relative flex-auto'>
                <input
                  ref={payField}
                  type='text'
                  inputMode='numeric'
                  placeholder={'1000'}
                  className={cs(
                    'focus:outline-none border-2',
                    mode === 'buy'
                      ? 'focus:border-teal-600 dark:focus:border-teal-400'
                      : 'focus:border-fuchsia-600 dark:focus:border-fuchsia-400',
                    'border-gray-500 h-10 w-full',
                    'bg-transparent pl-2 pr-16 w-64',
                    'flex transition-colors duration-300 border-2 p-1 rounded-lg items-center'
                  )}
                />
                <div className='absolute right-3 top-2 pl-2'>
                  {mode === 'buy' ? 'PHP' : selectedCurrency}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-20 text-gray-800 dark:text-gray-200 pl-2'>
                Receive
              </div>
              <div className='relative flex-auto'>
                <input
                  type='text'
                  inputMode='numeric'
                  placeholder='17.39'
                  className={cs(
                    'focus:outline-none border-2',
                    mode === 'buy'
                      ? 'focus:border-teal-600 dark:focus:border-teal-400'
                      : 'focus:border-fuchsia-600 dark:focus:border-fuchsia-400',
                    'border-gray-500 h-10 w-full',
                    'bg-transparent pl-2 pr-16 w-64',
                    'flex transition-colors duration-300 border-2 p-1 rounded-lg items-center'
                  )}
                />
                <div className='absolute right-3 top-2 pl-2'>
                  {mode === 'buy' ? selectedCurrency : 'PHP'}
                </div>
              </div>
            </div>
            <div className='mt-auto flex gap-4'>
              <div className='ml-auto flex items-center text-xs text-gray-500 gap-2'>
                <BellSimpleRinging size={16} /> Contacting the{' '}
                {mode === 'buy' ? 'Seller' : 'Buyer'}
              </div>
              <button
                className={cs(
                  'text-white',
                  mode === 'buy'
                    ? 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-400 dark:hover:bg-teal-300'
                    : 'bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-400 dark:hover:bg-fuchsia-300',
                  'relative px-4 h-10 rounded-lg dark:text-gray-800 transition-colors duration-300'
                )}
              >
                {mode === 'buy' ? 'Buy ' : 'Sell '} {selectedCurrency}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
