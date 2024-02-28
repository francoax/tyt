'use client';

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import Alert from "../alerts";
import Modal from "../modal";
import { Button } from "../buttons";
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { deleteProduct } from "@/lib/services/products.service";

export function DeleteProduct({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false)
  const deleteProductWithId = deleteProduct.bind(null, id);

  async function handleDelete() {
    setShowModal(false)

    const deleting = toast.loading('Eliminando producto...')
    const res = await deleteProductWithId()
    toast.dismiss(deleting)

    toast((t) => (
      <Alert title="Eliminar producto" description={res.message} reason={res.status} />
    ))
  }
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none" />
      </button>

      <Modal show={showModal} title="Eliminar producto">
        <div>
          Estas seguro que queres eliminar el producto?
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

export function UpdateProduct({ id }: { id: number }) {
  return (
    <Link
      href={`/home/products/${id}/edit`}
    >
      <PencilIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none" />
    </Link>
  );
}

export function DetailProduct({ id }: { id: number }) {
  return (
    <Link
      href={`/home/products/${id}/detail`}
    >
      <InformationCircleIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-blue-500 focus:outline-none" />
    </Link>
  )
}