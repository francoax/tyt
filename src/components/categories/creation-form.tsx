'use client'

import Link from "next/link";
import { Button, ButtonPrimary } from "../buttons";
import { InputForm } from "../inputs";
import Modal from "../modal";
import { usePathname } from "next/navigation";

export default function CategoryCreationForm() {
  const pathname = usePathname()
  return (
    <Modal title="Nueva categoria">
      <form>
        <div className="flex justify-start gap-5 flex-wrap">
          <InputForm label="Descripcion" type="text" placeholder="Nombre categoria" />
        </div>
      </form>
      <div className="mt-8 sm:flex sm:items-center sm:justify-center">
        <div className="sm:flex sm:items-center ">
          <Link href={pathname}>
            <Button content="Cancelar" type="button" />
          </Link>
          <ButtonPrimary content="Aceptar" type="button" />
        </div>
      </div>
    </Modal>
  )
}