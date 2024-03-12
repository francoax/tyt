'use client';

import { useState } from "react";
import { Button } from "../buttons";
import Modal from "../modal";
import InitForm from "./forms/init-action-form";
import { SM_DEPOSIT } from "@/lib/constants";

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