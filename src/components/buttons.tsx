'use client';

import { ArrowLeftIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { Spinner } from './loaders';
import { useState } from 'react';
import Modal from './modal';
import Alert from './alerts';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
          'text-white bg-zinc-400 hover:bg-zinc-300' : primary === false
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

export function ReturnButton({ href, children} : { href?: string, children: React.ReactNode }) {
  const router = useRouter()

  const handleReturn = () => {
    if(href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button onClick={handleReturn} type='button' className='flex items-center gap-5 m-0'>
      <ArrowLeftIcon className='w-5 h-5' />
      <span className=''>
        {children}
      </span>
    </Button>
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

export function UpdateButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
    >
      <p className='flex items-center gap-1 text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none'>
        <span className='text-sm'>Editar</span>
        <PencilIcon className="w-5" />
      </p>
    </Link>
  );
}

export function DeleteButton({ title, description, id, deleteAction }: { title:string, description: string, id: number, deleteAction: Function }) {
  const [showModal, setShowModal] = useState(false)
  const deleteProductWithId = deleteAction.bind(null, id);

  async function handleDelete() {
    setShowModal(false)

    const deleting = toast.loading('Procesando eliminacion...')
    const res = await deleteProductWithId()
    toast.dismiss(deleting)

    toast((t) => (
      <Alert title={title} description={res.message} reason={res.status} />
    ))
  }
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <p className='flex items-center gap-1 text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none'>
          <span className='text-sm'>Eliminar</span>
          <TrashIcon className="w-5" />
        </p>
      </button>

      <Modal show={showModal} title={title}>
        <div>
          {description}
        </div>
        <form action={handleDelete}>
          <div className="flex justify-center items-center gap-5 p-4">
            <Button type="button" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button primary type="submit">
              Aceptar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}