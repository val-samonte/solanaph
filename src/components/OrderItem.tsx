import cs from 'classnames'
import { useAtomValue } from 'jotai'
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
        <div className='col-span-2 px-4'>
          {trimAddress('53vUyd7iFntjgcwtmAZAhtyrWmssiRvs3AvWiUJfoXw5')}
        </div>
        <div className='col-span-2 px-4 font-bold'>57.50 PHP</div>
        <div className='col-span-2 px-4'>900 {selectedCurrency}</div>
        <div className='col-span-2 px-4'>500-1000 PHP</div>
        <div className='col-span-4 px-4 flex gap-4 flex-wrap'>
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
          selected ? 'h-52' : 'h-0',
          'overflow-hidden transition-all duration-300 bg-gray-800 px-2'
        )}
      >
        <div className='grid grid-cols-12 h-52'>
          <div className='col-span-6 flex flex-col p-4 gap-2 h-full '>
            <div className='text-xs text-gray-500'>
              {mode === 'buy' ? "Seller's" : "Buyer's"} terms (Please read
              carefully)
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nihil fugiat repudiandae provident libero, blanditiis vitae ipsam
              praesentium officiis perspiciatis explicabo iusto suscipit id
              molestiae tenetur ab debitis facere similique?
            </div>
            <div className='mt-auto flex gap-4 h-10 items-center'>
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
          <div className='col-span-6 flex flex-col p-4 gap-4 h-full'>
            <div className='flex items-center gap-4'>
              <div className='w-28 text-gray-200'>
                I will {mode === 'buy' ? 'pay' : 'sell'}
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
              <div className='w-28 text-gray-200'>I will receive</div>
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
              <div className='flex items-center text-xs text-gray-500 gap-2'>
                <BellSimpleRinging size={16} /> Contacting Seller
              </div>
              <button
                className={cs(
                  'ml-auto',
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
