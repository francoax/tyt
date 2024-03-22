"use client";

import Form from "@/components/form";
import { Input, TextareaInput } from "@/components/inputs";
import { confirmWithdrawAction } from "@/lib/actions/stock";
import { WARNING_STATUS } from "@/lib/constants";
import { StockMovement } from "@/lib/definitions";
import useFormHandler from "@/lib/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function WithdrawConfirmForm({ movement }: { movement: StockMovement }) {

  const [state, formAction] = useFormHandler(
    'Confirmar retiro de stock',
    `/home/products/${movement.product?.id}/detail#movimientos`,
    confirmWithdrawAction
  )

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const [stockAfter, setStockAfter] = useState<number>(movement.product?.stock!)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    params.set('stock_before', movement.stock_before?.toString()!)
    params.set('amount_involved', movement.amount_involved?.toString()!)

    const amount = Number.parseInt(params.get('amount_involved') ?? '0')
    const realAmount = Number.parseInt(params.get('real_amount_used') ?? '0')

    params.set('stock_after', (movement.product?.stock! + amount - realAmount).toString())

    setStockAfter(movement.product?.stock! + amount - realAmount)

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handlePreviewDeposit = useDebouncedCallback(({input, value} : { input: string, value: string }) => {
    const params = new URLSearchParams(searchParams)

    if(value) {
      params.set(input, value)
    } else {
      params.delete(input)
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 500)

  if(state.status === WARNING_STATUS) {
    push('/home')
  }

  return (
    <Form action={formAction} returnTo={`/home/products/${movement.product?.id}/detail`}
      // textarea={
      //   <TextareaInput
      //     name="description"
      //     htmlFor="description"
      //     errorFor="description"
      //     state={state}
      //     label="Descripcion"
      //     placeholder="Agregue una descripcion por la confirmacion si lo ve necesario."
      //   />
      // }
    >
      <Input className="hidden" defaultValue={movement.product?.id} type="hidden" name="product_id" htmlFor="product_id" />
      <Input className="hidden" defaultValue={movement.id} type="hidden" name="movement_id" htmlFor="product_id" />
      <Input className="hidden" defaultValue={movement.product?.stock} type="hidden" name="stock_before" htmlFor="stock_before" />
      <Input className="hidden" defaultValue={stockAfter} type="hidden" name="stock_after" htmlFor="stock_after" />
      <Input className="hidden" defaultValue={movement.amount_involved!} type="hidden" name="amount_involved" htmlFor="amount_involved" />
      <Input
        disabled
        className="cursor-not-allowed"
        placeholder={`${movement.amount_involved} ${movement.product?.unit?.description} retiradas/os.`}
        label="Cantidad retirada"
      />
      <Input
        state={state}
        requiredInput
        name="real_amount_used"
        htmlFor="real_amount_used"
        errorFor="real_amount_used-error"
        label="Cantidad utilizada"
        placeholder="100"
        onChange={(e) => handlePreviewDeposit({input: 'real_amount_used', value: e.target.value})}
      />
    </Form>
  )
}