'use client'

import { atom, useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { projectTagsArray } from '@/constants/directory'
import { Dialog as UiDialog } from '@headlessui/react'
import { Broom, ClipboardText } from '@phosphor-icons/react'
import Dialog from './Dialog'
import SearchIcon from './SearchIcon'

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
  const [showCopied, setShowCopied] = useState(false)
  const timeoutId = useRef(0)

  useEffect(() => {
    if (!showCopied) return

    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(() => {
      setShowCopied(false)
    }, 1000)

    const id = timeoutId.current

    return () => {
      window.clearTimeout(id)
    }
  }, [showCopied, setShowCopied])

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
          autoFocus
          onClick={() => setFilterOpen(true)}
          className='h-16 w-16 from-fuchsia-400 via-violet-700 to-teal-400 bg-gradient-to-tr active:bg-gradient-to-r transition-all duration-300 active:translate-y-px text-white rounded-full z-10 shadow-xl flex items-center justify-center'
        >
          <SearchIcon />
        </button>
        {((tags && tags.length > 0) || !!search) && (
          <div className='bg-red-600 w-3 h-3 absolute top-0 right-0 rounded-full' />
        )}
      </div>
      <Dialog show={filterOpen} onClose={() => setFilterOpen(false)}>
        <UiDialog.Panel className='flex flex-col relative bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-full h-auto max-h-full'>
          {/* h-screen md:h-auto */}
          <UiDialog.Title>
            <div className='flex p-4 border-b border-gray-100 dark:border-gray-800 justify-between text-gray-800 dark:text-gray-200'>
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
          <div
            className={
              'flex-auto w-full h-full relative overflow-x-hidden overflow-y-auto'
            }
          >
            <div className='flex p-4 flex-col gap-4'>
              <div>
                <input
                  tabIndex={1}
                  autoFocus
                  type='search'
                  placeholder='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full px-3 py-2 border-gray-100 dark:border-gray-800 border bg-transparent'
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
                    } ${
                      tag.includes('🎖️') ? 'pl-2 pr-3' : 'px-3'
                    } text-gray-100 text-xs rounded-lg hover:text-white py-1 transition-colors duration-300 pointer-events-auto`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className='flex-none p-4 flex gap-4 items-center'>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShowCopied(true)
              }}
              className='flex items-center justify-center gap-2 w-full text-gray-100 rounded-full bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm'
            >
              <ClipboardText size={18} />
              {showCopied ? (
                <span>Copied!</span>
              ) : (
                <span>
                  Copy <span className='hidden sm:inline'>Filtered </span>Link
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setTags([])
                setSearch('')
              }}
              className='flex items-center justify-center gap-2 w-full text-gray-100 rounded-full bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm'
            >
              <Broom size={18} />
              <span>
                Clear <span className='hidden sm:inline'>Filter</span>
              </span>
            </button>
          </div>
        </UiDialog.Panel>
      </Dialog>
    </>
  )
}
