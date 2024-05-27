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

  return (
    <div
      className={cs(
        selected && 'sticky top-0',
        'flex flex-col border-b dark:border-gray-900/50'
      )}
    >
      <button
        onClick={onSelect}
        className={cs(
          selected ? 'bg-gray-800' : ' bg-transparent hover:bg-gray-100/10',
          'grid grid-cols-12 text-left py-2 transition-all duration-300'
        )}
      >
        <div className='col-span-2 px-4 font-bold'>57.50 PHP</div>
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
          'overflow-hidden transition-all duration-300 bg-gray-800 px-2'
        )}
      >
        <div
          className={cs(
            'grid grid-cols-12',
            'transition-all duration-300',
            readMore ? 'h-80' : 'h-40'
          )}
        >
          <div className='col-span-6 flex flex-col p-4 gap-2 h-full '>
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
                    'absolute bottom-0 bg-gradient-to-b from-transparent to-gray-800 inset-x-0 h-4'
                  )}
                />
              )}
            </div>

            <button
              onClick={() => setReadMore((r) => !r)}
              className={cs(
                'w-full flex flex-col justify-end text-xs uppercase py-1',
                'text-gray-400 hover:text-gray-100 transition-colors duration-500'
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
          <div className='mb-auto col-span-6 flex flex-col p-2 gap-2 rounded-lg bg-white/10'>
            <div className='flex items-center gap-4'>
              <div className='w-20 text-gray-200 pl-2'>
                {mode === 'buy' ? 'Pay' : 'Sell'}
              </div>
              <div className='relative flex-auto'>
                <input
                  type='text'
                  inputMode='numeric'
                  placeholder={'1000'}
                  className={cs(
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
              <div className='w-20 text-gray-200 pl-2'>Receive</div>
              <div className='relative flex-auto'>
                <input
                  type='text'
                  inputMode='numeric'
                  placeholder='17.39'
                  className={cs(
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
                <BellSimpleRinging size={16} /> Contacting{' '}
                {mode === 'buy' ? 'Seller' : 'Buyer'}
              </div>
              <button
                className={cs(
                  mode === 'buy' ? 'bg-green-500' : 'bg-red-500',
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
