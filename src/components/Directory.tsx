'use client'

import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect, useState } from 'react'
import { directory, Project } from '@/constants/directory'
import { filterDirectory } from '@/utils/filterDirectory'
import Card from './Card'
import { searchAtom, tagsFilterAtom } from './FilterDirectory'

export const bookmarkedProjectsAtom = atomWithStorage<string[]>(
  'bookmarkedProjects',
  []
)

export default function Directory({
  initialDirectory,
}: {
  initialDirectory: Project[]
}) {
  const bookmarked = useAtomValue(bookmarkedProjectsAtom)
  const [tags, setTags] = useAtom(tagsFilterAtom)
  const [search, setSearch] = useAtom(searchAtom)
  const [filteredDirectory, setFilteredDirectory] = useState(initialDirectory)

  useEffect(() => {
    if (!tags) return

    const filtered = filterDirectory(directory, tags, search)
    const bookmarkedProjects = filtered.filter((project) =>
      bookmarked.includes(project.url)
    )
    const notBookmarkedProjects = filtered.filter(
      (project) => !bookmarked.includes(project.url)
    )

    setFilteredDirectory([...bookmarkedProjects, ...notBookmarkedProjects])
  }, [tags, bookmarked, search, setFilteredDirectory])

  return (
    <>
      <div className='show-next-when-empty grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 w-full 2xl:gap-8 max-w-7xl'>
        {filteredDirectory.map((project) => (
          <Card {...project} key={project.name} />
        ))}
      </div>
      <div className='mx-auto h-60  flex-col items-center justify-center gap-4'>
        <p>Nothing Found</p>
        <button
          onClick={() => {
            setTags([])
            setSearch('')
          }}
          className='min-w-40 text-gray-100 rounded-full bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-2 transition-colors duration-300 text-sm'
        >
          Clear Filter
        </button>
      </div>
    </>
  )
}
