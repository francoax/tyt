"use client";

import { Button } from "@/components/buttons";
import { SelectInput } from "@/components/inputs";
import { initStockDepositAction, initStockWithdrawAction } from "@/lib/actions/stock";
import { SM_DEPOSIT } from "@/lib/constants";
import { getProductsForStockAction } from "@/lib/data/products";
import { ProductForAction, SelectOption } from "@/lib/definitions";
import useFormHandler from "@/lib/hooks";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type initFormActions = {
  [key: string] : { title: string, serverAction: any }
}

const actions : initFormActions = {
  DEPOSIT: {
    title: 'Ingresar stock',
    serverAction: initStockDepositAction,
  },
  WITHDRAW: {
    title: 'Retirar stock',
    serverAction: initStockWithdrawAction
  }
}

export default function InitForm({ action, modalHandler }: { action: string, modalHandler: Dispatch<SetStateAction<boolean>> }) {
  const [state, formAction] = useFormHandler(
    actions[action].title,
    '',
    actions[action].serverAction
  )

  const [products, setProducts] = useState<ProductForAction[]>([])

  useEffect(() => {
    getProductsForStockAction().then((values) => setProducts(values))
  }, [])

  const options : SelectOption[] = products?.map(p => ({ label: `${p.name} ${p.stock} ${p.unit.description}`, value: p.id.toString() }))

  return (
    <form action={formAction}>
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