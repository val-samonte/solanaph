import Image from 'next/image'
import Link from 'next/link'
import Directory from '@/components/Directory'
import DirectoryHelp from '@/components/DirectoryHelp'
import FilterDirectory from '@/components/FilterDirectory'
import { directory } from '@/constants/directory'
import { filterDirectory } from '@/utils/filterDirectory'

export default function Home({ searchParams }: { searchParams: any }) {
  const initialFilters = searchParams.tags?.split(',') ?? []
  const initialSearch = searchParams.search ?? ''
  const initialDirectory = filterDirectory(
    directory,
    initialFilters,
    initialSearch
  )

  return (
    <>
      <main className='relative flex min-h-screen flex-col px-4 pb-4 xl:p-16 gap-4 xl:gap-12 items-center'>
        <nav className='sticky top-0 flex min-h-16 w-full bg-white/75 dark:bg-gray-900/75 backdrop-blur z-20'>
          <div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
            <Link
              href='https://www.facebook.com/groups/solanaphilippines'
              target='_blank'
              rel='noreferrer noopener'
              className='flex items-center gap-4'
            >
              <Image
                src={'logo.svg'}
                alt='Solana PH'
                width={200}
                height={200}
                className='h-14 w-14'
              />
              <h1 className='text-gray-600 dark:text-gray-400'>
                Solana Philippines
              </h1>
            </Link>
            <DirectoryHelp />
          </div>
        </nav>
        <Directory initialDirectory={initialDirectory} />
        <FilterDirectory
          initialFilters={initialFilters}
          initialSearch={initialSearch}
        />
      </main>
      <footer className='max-w-xl xl:max-w-4xl p-4 pb-20 xl:p-16 xl:pt-0 mx-auto text-center text-xs text-gray-400'>
        Disclaimer: This is a community project and is not affiliated with
        Solana Labs. The team behind this project is not responsible for any
        loss of funds or any other damages that may occur from using the
        information provided on this website.
      </footer>
    </>
  )
}
