'use client'

import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { projectTagsArray } from '@/constants/directory'
import { Dialog as UiDialog } from '@headlessui/react'
import Dialog from './Dialog'

export const tagsFilterAtom = atom<string[] | null>(null)
export const searchAtom = atom<string>('')

export default function FilterDirectory({
  initialFilters,
  initialSearch,
}: {
  initialFilters: string[]
  initialSearch: string
}) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [tags, setTags] = useAtom(tagsFilterAtom)
  const [search, setSearch] = useAtom(searchAtom)

  useEffect(() => {
    setTags(initialFilters)
  }, [setTags, initialFilters])

  useEffect(() => {
    setSearch(initialSearch)
  }, [setSearch, initialSearch])

  useEffect(() => {
    if (tags === null) return
    const params = new URLSearchParams(window.location.search)
    if (tags.length === 0) {
      params.delete('tags')
    } else {
      params.set('tags', tags.join(','))
    }

    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${params.size > 0 ? `?${params}` : ''}`
    )
  }, [tags, search])

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
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </button>
        {((tags && tags.length > 0) || !!search) && (
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
            <div>
              <input
                autoFocus
                type='search'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full px-3 py-2 border-gray-100 border'
              />
            </div>
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
                onClick={() => {
                  setTags([])
                  setSearch('')
                }}
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
