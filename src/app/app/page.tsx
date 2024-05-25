import Directory from '@/components/Directory'
import FilterDirectory from '@/components/FilterDirectory'
import { directory } from '@/constants/directory'
import { filterDirectory } from '@/utils/filterDirectory'

export default function App({ searchParams }: { searchParams: any }) {
  const initialFilters = searchParams.tags?.split(',') ?? []
  const initialSearch = searchParams.search ?? ''
  const initialDirectory = filterDirectory(
    directory,
    initialFilters,
    initialSearch
  )
  return (
    <>
      <Directory initialDirectory={initialDirectory} />
      <FilterDirectory
        initialFilters={initialFilters}
        initialSearch={initialSearch}
      />
    </>
  )
}
