'use client'

import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { projectTagsArray } from '@/constants/directory'
import { Dialog as UiDialog } from '@headlessui/react'
import Dialog from './Dialog'

export const tagsFilterAtom = atom<string[] | null>(null)

export default function FilterDirectory({
  initialFilters,
}: {
  initialFilters: string[]
}) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [tags, setTags] = useAtom(tagsFilterAtom)

  useEffect(() => {
    setTags(initialFilters)
  }, [setTags, initialFilters])

  useEffect(() => {
    if (tags === null) return
    const params = new URLSearchParams(window.location.search)
    if (tags.length === 0) {
      params.delete('tags')
    } else {
      params.set('tags', tags.join(','))
    }
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${params.size > 0 ? `?${params}` : ''}`
    )
  }, [tags])

  return (
    <>
      <div className='fixed bottom-4 right-4 xl:bottom-16 xl:right-16 z-10'>
        <button
          onClick={() => setFilterOpen(true)}
          className='h-12 w-12 bg-gradient-to-bl from-emerald-400 to-purple-500 active:from-purple-500 active:to-emerald-400 active:translate-y-px text-white rounded-full z-10 shadow-xl flex items-center justify-center'
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
              d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
            />
          </svg>
        </button>
        {tags && tags.length > 0 && (
          <div className='bg-red-600 w-3 h-3 absolute top-0 right-0 rounded-full' />
        )}
      </div>
      <Dialog show={filterOpen} onClose={() => setFilterOpen(false)}>
        <UiDialog.Panel className='flex flex-col relative bg-white rounded-2xl max-w-sm w-full '>
          <UiDialog.Title>
            <div className='flex p-4 border-b border-gray-100 justify-between text-gray-800'>
              <span>Filter</span>
              <button
                className='hover:text-gray-600'
                onClick={() => {
                  setFilterOpen(false)
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
          <div className='flex p-4 flex-col gap-4'>
            <div className='flex flex-wrap gap-2'>
              {projectTagsArray.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setTags((prev) => {
                      if (!prev) return null
                      if (prev.includes(tag)) {
                        return prev.filter((t) => t !== tag)
                      }
                      return [...prev, tag]
                    })
                  }}
                  className={`${
                    tags?.includes(tag)
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-500 hover:bg-gray-600'
                  } text-gray-100 text-xs rounded-lg hover:text-white px-3 py-1 transition-colors duration-300 pointer-events-auto`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={() => setTags([])}
                className='w-full text-gray-100 rounded-full bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm'
              >
                Clear Filter
              </button>
            </div>
          </div>
        </UiDialog.Panel>
      </Dialog>
    </>
  )
}
