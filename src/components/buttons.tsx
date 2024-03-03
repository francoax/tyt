'use client';

import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { Spinner } from './loaders';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean,
}

export function Button({ children, className, primary = false, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'px-4 py-2 font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40',
        className,
        {
          'hover:bg-gray-200' : primary === false
        },
        {
          'text-white bg-blue-600 hover:bg-blue-500 focus:ring-blue-300 focus:ring-opacity-40' : primary === true
        },
        {
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' : rest.disabled === true
        }
      )}
    >
      {children}
    </button>
  );
}

export function CreateButton({ href, children } : { href: string, children: React.ReactNode}) {
  return (
    <Link href={href}>
      <Button primary={true} className="flex items-center gap-5">
        {children}
        <PlusIcon className="w-5" />
      </Button>
    </Link>
  )
}

export function ReturnButton({ href, children} : { href: string, children: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button type='button' className='flex items-center gap-5 m-0'>
        <ArrowLeftIcon className='w-5 h-5' />
        <span className=''>
          {children}
        </span>
      </Button>
    </Link>
  )
}

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      <Button className='inline-flex items-center' primary type='submit' disabled={pending} aria-disabled={pending}>
        {pending && <Spinner />}
        Aceptar
      </Button>
    </>
  )
}