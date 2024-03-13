import { ReturnButton } from "@/components/buttons"
import { WithdrawConfirmPreview } from "@/components/stock/action-preview"
import WithdrawConfirmForm from "@/components/stock/forms/withdraw-confirm-form"
import { getStockMovementById } from "@/lib/data/stock"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { movementId: string }}) {
  const { movementId } = params

  const movement = await getStockMovementById(Number(movementId))

  if(!movement) notFound()

  return (
    <>
      <ReturnButton>
        Volver
      </ReturnButton>
      <div>
        <h2 className="text-lg font-medium text-gray-800 mt-5">
          Confirmar el retiro de stock para <span className="text-blue-400">{movement.product?.name.toUpperCase()}</span>
          <span className="ml-2 px-3 py-1 text-xs text-blue-500 bg-blue-200 rounded-full">
            (Stock actual {movement.product?.stock} {movement.product?.unit?.description})
          </span>
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>

      <WithdrawConfirmForm movement={movement}/>

      <div className="mt-5">
        <h2 className="text-lg font-medium  text-gray-800">Previsualizacion</h2>
        <p className="mt-1 text-sm text-gray-500">
          Asi se motrara luego el movimiento de stock confirmado.
        </p>
      </div>

      <WithdrawConfirmPreview unit={movement.product.unit?.description!} />
    </>
  )
}