'use client';

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import Alert from "../alerts";
import Modal from "../modal";
import { Button } from "../buttons";
import { useState } from "react";
import { deleteUnitAction } from "@/lib/actions/units";

export function DeleteUnit({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false)
  const deleteInvoiceWithId = deleteUnitAction.bind(null, id);

  async function handleDelete() {
    setShowModal(false)

    const deleting = toast.loading('Eliminando tipo de unidad...')
    const res = await deleteInvoiceWithId()
    toast.dismiss(deleting)

    toast((t) => (
      <Alert title="Eliminar categoria" description={res.message} reason={res.status} />
    ))
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <TrashIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none" />
      </button>

      <Modal show={showModal} title="Eliminar tipo de unidad">
        <div>
          Estas seguro que queres eliminar el tipo de unidad?
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

export function UpdateUnit({ id }: { id: number }) {
  return (
    <Link
      href={`/home/units/${id}/edit`}
    >
      <PencilIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none" />
    </Link>
  );
}