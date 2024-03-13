'use client';

import { useState } from "react";
import { Button } from "../buttons";
import Modal from "../modal";
import InitForm from "./forms/init-action-form";
import { SM_DEPOSIT } from "@/lib/constants";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

export function ActionButton({
  action
}: {
  action: string
}) {

  const [show, setShowModal] = useState(false)

  const actionBody : { [key: string] : { title: string, button: string } } = {
    WITHDRAW: {
      title: 'Retirar stock',
      button: 'Retirar'
    },
    DEPOSIT: {
      title: 'Ingresar stock',
      button: 'Ingresar'
    }
  }

  return (
    <>
      <Button primary={action === SM_DEPOSIT} onClick={() => setShowModal(true)}>
        {actionBody[action].button}
      </Button>

      <Modal
        title={actionBody[action].title}
        show={show}
      >
        <InitForm action={action} modalHandler={setShowModal} />
      </Modal>
    </>
  )
}

export function ConfirmWithdrawButton({ movementId, productId }: { movementId: number, productId: number }) {
  return (
    <Link href={`/home/stock/${productId}/retirar/${movementId}/confirmar`}>
      <CheckIcon className="w-5 h-5 transition-colors duration-200 hover:text-emerald-500 text-gray-800 focus:outline-none" />
    </Link>
  )
}