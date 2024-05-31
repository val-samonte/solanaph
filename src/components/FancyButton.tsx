import cs from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

export const FancyButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <div className='group flex rounded-lg overflow-hidden relative items-center justify-center h-10 min-w-28'>
      <div
        className={cs(
          'absolute aspect-square w-full scale-110',
          'transition-all duration-300',
          '-rotate-45 group-hover:rotate-0',
          'from-fuchsia-400 via-violet-700 to-teal-400 bg-gradient-to-r'
        )}
      ></div>
      <button
        {...props}
        className={cs(
          'relative px-4 h-full whitespace-nowrap text-white cursor-pointer w-full'
        )}
      />
    </div>
  )
}
