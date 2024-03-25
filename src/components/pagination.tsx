'use client';

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages, additionalUrl = '' }: { totalPages: number, additionalUrl?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  const pagesNavigation = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between mt-6">
      <PaginationArrow
        direction="left"
        href={createPageUrl(currentPage - 1)}
        isDisabled={currentPage <= 1}
        additionalUrl={additionalUrl}
      />

      <div className="items-center hidden md:flex gap-x-3">
        {pagesNavigation.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined

          if(index === 0) position = 'first'
          if(index === pagesNavigation.length - 1) position = 'last'
          if(pagesNavigation.length === 1) position = 'single'
          if(page === '...') position = 'middle'

          return (
            <PaginationNumber
              key={page}
              href={createPageUrl(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          )
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageUrl(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        additionalUrl={additionalUrl}
      />
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  additionalUrl = ''
} : {
  page: number | string,
  href: string,
  isActive?: boolean,
  position?: 'first' | 'last' | 'middle' | 'single',
  additionalUrl?: string
}) {
  const className = clsx(
    "px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-blue-500",
    {
      "text-blue-500 bg-blue-300/60 hover:bg-blue-500" : isActive
    }
  )

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link shallow scroll={false} href={`${href}${additionalUrl}`} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  additionalUrl = ''
}: {
  href: string,
  direction: 'left' | 'right',
  isDisabled?: boolean,
  additionalUrl?: string
}) {
  const className = clsx(
    "flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-300",
    {
      'pointer-events-none cursor-not-allowed opacity-50': isDisabled,
    }
  )

  const icon = direction === 'left'
    ?
      ( <><ArrowLeftIcon className="w-4" /> <span>Anterior</span></>)
    :
      ( <><span>Siguiente</span> <ArrowRightIcon className="w-4" /></>)

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link shallow scroll={false} className={className} href={`${href}${additionalUrl}`}>{icon}</Link>
  )
}

function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}