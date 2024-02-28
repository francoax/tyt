'use client';

import { deleteCategory } from "@/lib/services/categories.service";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import Alert from "../alerts";
import Modal from "../modal";
import { Button } from "../buttons";
import { useState } from "react";

export function DeleteCategory({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false)
  const deleteInvoiceWithId = deleteCategory.bind(null, id);

  async function handleDelete() {
    setShowModal(false)

    const deleting = toast.loading('Eliminando categoria...')
    const res = await deleteInvoiceWithId()
    toast.dismiss(deleting)

    if(res.error) {
      toast((t) => (
        <Alert title="Eliminar categoria" description={res.message} reason='error' />
      ))
    } else {
      toast((t) => (
        <Alert title="Eliminar categoria" description={res.message} reason='success' />
      ))
    }
  }
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <TrashIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none" />
      </button>

      <Modal show={showModal} title="Eliminar categoria">
        <div>
          Estas seguro que queres eliminar la categoria?
        </div>
        <form action={handleDelete}>
          <div className="flex justify-center items-center gap-5 p-4">
            <Button type="button" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button primary={true} type="submit">
              Aceptar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function UpdateCategory({ id }: { id: number }) {
  return (
    <Link
      href={`/home/categories/${id}/edit`}
    >
      <PencilIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none" />
    </Link>
  );
}