'use client'

import cn from 'classnames'
import { atom } from 'jotai'
import { ReactNode } from 'react'
import AppNav from './AppNav'
import Authentication from './Authentication'
import ContactsPanel from './ContactsPanel'
import WalletAdapterWrapper from './WalletAdapterWrapper'

export const currencies = ['USDC', 'SOL']
export const selectedCurrencyAtom = atom(currencies[0])
export const modeAtom = atom<'buy' | 'sell'>('buy')

export default function AppWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <WalletAdapterWrapper>
      <main className='fixed inset-0'>
        <Authentication>
          <div
            className={cn(
              'h-full p-2 gap-2 lg:p-4 lg:gap-4 flex portrait:flex-col-reverse'
            )}
          >
            <AppNav />
            <div className='flex-auto relative'>
              <div className='absolute inset-0 lg:gap-4 flex'>
                <ContactsPanel />
                {children}
              </div>
            </div>
          </div>
        </Authentication>
      </main>
    </WalletAdapterWrapper>
  )
}
