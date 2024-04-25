import { Fragment } from 'react'
import { Dialog as UiDialog, Transition } from '@headlessui/react'

export interface DialogProps {
  show: boolean
  children: React.ReactNode
  onClose: () => void
}

export default function Dialog({ show, children, onClose }: DialogProps) {
  return (
    <Transition show={show} as={Fragment}>
      <UiDialog onClose={onClose} className='relative z-50'>
        <Transition.Child
          as={Fragment}
          enter='ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={'fixed h-screen inset-0 overflow-hidden'}
            aria-hidden='true'
          >
            <div className={'bg-black/75 w-full h-full'} />
          </div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300 delay-100'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0'>
            <div className='h-full flex flex-col flex-auto items-center justify-center overflow-hidden'>
              <div className='w-full mx-auto overflow-hidden'>
                <div
                  className={
                    'p-3 w-full h-full flex flex-col items-center justify-center'
                  }
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </UiDialog>
    </Transition>
  )
}
