import { Project } from '@/constants/directory'

export const filterDirectory = (directory: Project[], filters: string[]) => {
  const filtered =
    filters.length === 0
      ? directory
      : directory.filter((project) => {
          return project.tags.some((tag) => filters.includes(tag))
        })

  return filtered
}
