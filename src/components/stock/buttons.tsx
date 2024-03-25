'use client';

import { useState } from "react";
import { Button } from "../buttons";
import Modal from "../modal";
import InitForm from "./forms/init-action-form";
import { SM_DEPOSIT } from "@/lib/constants";
import Link from "next/link";
import { ArrowDownOnSquareIcon, ArrowUpOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline";

export function ActionButton({
  action
}: {
  action: string
}) {

  const [show, setShowModal] = useState(false)

  const actionBody : { [key: string] : { title: string, button: string, icon: React.ReactNode } } = {
    WITHDRAW: {
      title: 'Retirar stock',
      button: 'Retirar stock',
      icon: <ArrowUpOnSquareIcon className="w-5 text-gray-700" />
    },
    DEPOSIT: {
      title: 'Ingresar stock',
      button: 'Ingresar stock',
      icon: <ArrowDownOnSquareIcon className="w-5 text-white" />
    }
  }

  return (
    <>
      <Button primary={action === SM_DEPOSIT} onClick={() => setShowModal(true)}>
        <p className="flex items-center gap-1">
          {actionBody[action].button}
          {actionBody[action].icon}
        </p>
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