'use client'

import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useMemo } from 'react'
import { directory } from '@/constants/directory'
import Card from './Card'
import { tagFilterAtom } from './FilterDirectory'

export const bookmarkedProjectsAtom = atomWithStorage<string[]>(
  'bookmarkedProjects',
  []
)

export default function Directory() {
  const bookmarked = useAtomValue(bookmarkedProjectsAtom)
  const [filteredTags, setFilterTags] = useAtom(tagFilterAtom)

  const filteredDirectory = useMemo(() => {
    const filtered =
      filteredTags.length === 0
        ? directory
        : directory.filter((project) => {
            return project.tags.some((tag) => filteredTags.includes(tag))
          })

    const bookmarkedProjects = filtered.filter((project) =>
      bookmarked.includes(project.url)
    )

    const notBookmarkedProjects = filtered.filter(
      (project) => !bookmarked.includes(project.url)
    )
    return [...bookmarkedProjects, ...notBookmarkedProjects]
  }, [filteredTags, bookmarked])

  return (
    <>
      <div className='show-next-when-empty grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full xl:gap-8 max-w-7xl'>
        {filteredDirectory.map((project) => (
          <Card {...project} key={project.name} />
        ))}
      </div>
      <div className='mx-auto h-60  flex-col items-center justify-center gap-4'>
        <p>Nothing Found</p>
        <button
          onClick={() => setFilterTags([])}
          className='min-w-40 text-gray-100 rounded-full bg-gray-400 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm'
        >
          Clear Filter
        </button>
      </div>
    </>
  )
}
