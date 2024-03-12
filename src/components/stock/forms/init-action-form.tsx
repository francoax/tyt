"use client";

import { Button } from "@/components/buttons";
import { SelectInput } from "@/components/inputs";
import { stockDepositAction } from "@/lib/actions/stock";
import { SM_DEPOSIT } from "@/lib/constants";
import { getProductsNames } from "@/lib/data/products";
import { ProductForAction, SelectOption } from "@/lib/definitions";
import useFormHandler from "@/lib/hooks";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function InitForm({ action, modalHandler }: { action: string, modalHandler: Dispatch<SetStateAction<boolean>> }) {
  const title = action === SM_DEPOSIT ? 'Ingresar stock' : 'Retirar stock'
  const serverAction = stockDepositAction

  const [state, formAction] = useFormHandler(
    title,
    '/home/',
    serverAction
  )
  const [products, setProducts] = useState<ProductForAction[]>([])

  useEffect(() => {
    getProductsNames().then((values) => setProducts(values))
  }, [])

  const options : SelectOption[] = products?.map(p => ({ label: p.name, value: p.id.toString() }))
  const space = `mb-[${options.length}rem]`
  return (
    <form action={formAction} className="">
      <SelectInput
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base: any) => ({...base, zIndex: 9999}) }}
        name="product_id"
        htmlFor="product_id"
        label="Seleccione el producto"
        requiredInput
        errorFor="product_id-error"
        state={state}
        placeholder="Seleccionar producto"
        options={options}
      />
      <div className="flex justify-center items-center gap-5 p-4">
        <Button type="button" onClick={() => modalHandler(false)}>
          Cancelar
        </Button>
        <Button primary type="submit" className="inline-flex gap-2 items-center">
          Continuar <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </form>
  )
}