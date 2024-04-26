import Directory from '@/components/Directory'
import FilterDirectory from '@/components/FilterDirectory'
import { directory } from '@/constants/directory'
import { filterDirectory } from '@/utils/filterDirectory'

export default function Home({ searchParams }: { searchParams: any }) {
  const initialFilters = searchParams.tags?.split(',') ?? []
  const initialDirectory = filterDirectory(directory, initialFilters)

  return (
    <>
      <Directory initialDirectory={initialDirectory} />
      <FilterDirectory initialFilters={initialFilters} />
    </>
  )
}
