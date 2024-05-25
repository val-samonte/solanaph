'use client'

import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ProjectLinkType } from '@/constants/directory'
import { bookmarkedProjectsAtom } from './Directory'
import Icon from './Icon'

interface CardProps {
  name: string
  image?: string
  url: string
  links: {
    type: ProjectLinkType
    url: string
  }[]
  tags: string[]
}

export default function Card({ name, image, url, links, tags }: CardProps) {
  const [bookmarked, setBookmarked] = useAtom(bookmarkedProjectsAtom)
  const [showCopied, setShowCopied] = useState(false)
  const timeoutId = useRef(0)

  const isBookmarked = useMemo(
    () => bookmarked.includes(url),
    [bookmarked, url]
  )

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

  return (
    <div className='rounded-2xl relative p-4 flex flex-col overflow-hidden'>
      <Link href={url} target='_blank' rel='noreferrer noopener'>
        <div className='bg-gradient-to-br from-pink-400 to-blue-400 absolute inset-0 opacity-10 hover:opacity-25 transition-opacity duration-300'></div>
      </Link>
      <div className='flex items-center gap-4 relative pointer-events-none mb-4'>
        <div className='flex items-center gap-4 flex-auto'>
          <div className='h-16 w-16 rounded-lg flex-none bg-gray-900 flex items-center justify-center text-white text-2xl uppercase overflow-hidden'>
            {image ? (
              image.includes('http') ? (
                <Image
                  src={image}
                  alt={name}
                  height={1000}
                  width={1000}
                  className='h-12 w-12 object-contain'
                />
              ) : (
                <Image
                  src={`/project_icons/${image}`}
                  alt={name}
                  width={400}
                  height={400}
                  className={'h-full w-full'}
                />
              )
            ) : (
              <div>{name.charAt(0)}</div>
            )}
          </div>
          <div className='flex flex-col flex-auto'>
            <h2 className='text-xl text-gray-800 dark:text-gray-200 flex items-center gap-2'>
              {tags.includes('🎖️ member-project') && <span>🎖️</span>}
              <span>{name}</span>
            </h2>
            <div className='text-gray-500 text-sm'>{url}</div>
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url)
              setShowCopied(true)
            } catch (e) {}
          }}
          className='relative flex-none p-4 text-gray-500 bg-transparent hover:bg-black/5 hover:text-gray-800 dark:hover:bg-white/5 dark:hover:text-gray-200 transition-colors duration-300 rounded-lg pointer-events-auto'
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
              d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
            />
          </svg>
          {showCopied && (
            <div className='pointer-events-none absolute -top-3 -left-1 bg-blue-500 text-white text-xs uppercase font-bold text-center py-1 rounded-full w-16'>
              Copied
            </div>
          )}
        </button>
      </div>
      <div className='mt-auto flex flex-wrap items-center justify-end gap-2 text-gray-100 text-xs relative pointer-events-none'>
        {links.map((link) => (
          <Link
            key={link.type}
            href={link.url}
            target='_blank'
            rel='noreferrer noopener'
            className='rounded-lg bg-gray-500 hover:bg-gray-600 hover:text-white px-3 py-1 transition-colors duration-300 pointer-events-auto'
          >
            <Icon icon={link.type} />
          </Link>
        ))}
        <button
          onClick={() => {
            setBookmarked((prev) =>
              isBookmarked ? prev.filter((p) => p !== url) : [...prev, url]
            )
          }}
          className={`${
            isBookmarked
              ? 'text-amber-300 hover:text-amber-400'
              : 'text-gray-100 hover:text-white'
          } rounded-lg bg-gray-500 hover:bg-gray-600 px-3 py-1 transition-colors duration-300 pointer-events-auto`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill={isBookmarked ? 'currentColor' : 'none'}
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-[1.5em] h-[1.5em]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
