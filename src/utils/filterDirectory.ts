import { Project } from '@/constants/directory'

export const filterDirectory = (
  directory: Project[],
  filters: string[],
  search: string
) => {
  if (!filters.length && !search) return directory

  const filtered = directory.filter((project) => {
    const hasTag = filters.every((filter) =>
      (project.tags as string[]).includes(filter)
    )
    const isSearched = project.name.toLowerCase().includes(search.toLowerCase())

    if (filters.length !== 0 && !search) {
      return hasTag
    }

    if (filters.length === 0 && search) {
      return isSearched
    }

    return hasTag && isSearched
  })

  return filtered
}
