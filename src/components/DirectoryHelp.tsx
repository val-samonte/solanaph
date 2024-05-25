'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { ProjectLinkType } from '@/constants/directory'
import { Dialog as UiDialog } from '@headlessui/react'
import Dialog from './Dialog'
import Icon from './Icon'
import SearchIcon from './SearchIcon'

const linkNames = [
  'telegram',
  'discord',
  'twitter',
  'facebook',
  'xnft',
  'github',
  'linktree',
  'docs',
  'community',
  'blog',
  'website',
]

export default function DirectoryHelp() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ul className='flex items-center gap-6 xl:gap-12 flex-auto justify-end'>
        <li>
          <button
            onClick={() => setOpen(true)}
            className='flex items-center gap-2 cursor-pointer'
          >
            <span>Directory</span>
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
                d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
              />
            </svg>
          </button>
        </li>
      </ul>
      <Dialog show={open} onClose={() => setOpen(false)}>
        <UiDialog.Panel className='flex flex-col relative bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full h-screen max-h-[85vh]'>
          <UiDialog.Title>
            <div className='flex p-4 border-b border-gray-100 dark:border-gray-800 justify-between text-gray-800 dark:text-gray-200'>
              <span>Help</span>
              <button
                className='hover:text-gray-600 dark:hover:text-gray-400'
                onClick={() => {
                  setOpen(false)
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
          </UiDialog.Title>
          <div
            className={
              'flex-auto w-full h-full relative overflow-x-hidden overflow-y-auto flex flex-col py-4 px-5 gap-8'
            }
          >
            <section className='flex flex-col gap-4'>
              <h2 className='text-xl'>About</h2>
              <p className='text-gray-800 dark:text-gray-200 px-1 indent text-sm'>
                The Solana PH Directory serves as a centralized hub for Solana
                ecosystem projects. It provides a curated list of dApps and
                projects, complete with easy-to-access links for each. Users can
                copy project URLs, filter by tags like games or DeFi, and share
                filtered directories, empowering them to navigate the Solana
                landscape securely. By combating phishing scams and promoting
                community projects, our initiative fosters a safer and more
                inclusive environment for newcomers and veterans alike.
              </p>
            </section>
            <section className='flex flex-col gap-4'>
              <h2 className='text-xl'>Guide</h2>
              <div className='mb-4'>
                <Image
                  alt={'Card Structure'}
                  src='/cardstructure.png'
                  width={852}
                  height={466}
                  className='object-contain h-64 w-full'
                />
              </div>
              <h3>Reference for Related Links</h3>
              <div className='grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-4 px-2'>
                {linkNames.map((name) => (
                  <Fragment key={name}>
                    <div className='flex col-span-1 justify-end'>
                      <div className='flex-none rounded-lg bg-gray-500 text-white px-3 py-1 transition-colors duration-300 pointer-events-auto'>
                        <Icon icon={name as ProjectLinkType} />
                      </div>
                    </div>
                    <span className='col-span-2 capitalize text-gray-800 dark:text-gray-200 text-sm py-1'>
                      {name}
                    </span>
                  </Fragment>
                ))}
              </div>
            </section>
            <section className='flex flex-col gap-4'>
              <h2 className='text-xl'>Filters</h2>
              <div className='flex'>
                <div className='flex-none px-5'>
                  <div className='h-16 w-16 from-fuchsia-400 via-violet-700 to-teal-400 bg-gradient-to-tr text-white rounded-full z-10 shadow-xl flex items-center justify-center'>
                    <SearchIcon />
                  </div>
                </div>
                <p className='text-gray-800 dark:text-gray-200 px-1 text-sm'>
                  Found at the bottom right corner of the page is the Search /
                  Filter button. Click this button to open up the filter dialog
                  panel which can help you to narrow down your directory search.
                  This is also helpful if you want to share a filtered directory
                  with others.
                </p>
              </div>
            </section>
            <section className='flex flex-col gap-4'>
              <h2 className='text-xl'>Contributing / Corrections</h2>
              <p className='text-gray-800 dark:text-gray-200 px-1 text-sm indent'>
                If you would like to contribute or make corrections to the
                directory, please join us and reach out to the Solana PH
                community on Facebook. You can also submit a pull request on the
                Solana PH Github and we will review your changes. We would love
                to hear from you!
              </p>
            </section>
          </div>
          <div className='flex-none p-4 flex gap-4 items-center'>
            <Link
              href='https://www.facebook.com/groups/solanaphilippines'
              target='_blank'
              rel='noreferrer noopener'
              className='w-full text-gray-100 rounded-full bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm flex items-center gap-2 justify-center'
            >
              <Icon icon='facebook' />
              <span>
                <span className='hidden sm:inline'>Solana PH </span>
                Community
              </span>
            </Link>
            <Link
              href='https://github.com/val-samonte/solanaph'
              target='_blank'
              rel='noreferrer noopener'
              className='w-full text-gray-100 rounded-full bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm flex items-center gap-2 justify-center'
            >
              <Icon icon='github' />
              <span>
                <span className='hidden sm:inline'>Solana PH </span>
                Github
              </span>
            </Link>
          </div>
        </UiDialog.Panel>
      </Dialog>
    </>
  )
}
