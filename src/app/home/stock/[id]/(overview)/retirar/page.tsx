import { ReturnButton } from "@/components/buttons"
import { ConfirmButton } from "@/components/products/buttons"
import { WithdrawPreview } from "@/components/stock/action-preview"
import WithdrawForm from "@/components/stock/forms/withdraw-form"
import { getProductById } from "@/lib/data/products"
import { Product } from "@/lib/definitions"
import { notFound } from "next/navigation"

export default async function Page({ params } : { params: { id: string }}) {
  const { id } = params
  const product = await getProductById(Number.parseInt(id)) as Product

  if(!product) notFound()

  return (
    <>
      <ReturnButton>
        Volver
      </ReturnButton>
      <div>
        <h2 className="text-lg font-medium text-gray-800 mt-5">
          Retirar stock para <span className="text-blue-400">{product?.name.toUpperCase()}</span>
          <span className="ml-2 px-3 py-1 text-xs text-blue-500 bg-blue-200 rounded-full">
            (Stock actual {product?.stock} {product?.unit?.description})
          </span>
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <WithdrawForm product={product} />

      <div className="my-5 border border-gray-300"></div>

      <div className="mt-5">
        <h2 className="text-lg font-medium  text-gray-800">Previsualizacion</h2>
        <p className="mt-1 text-sm text-gray-500">
          Asi se mostrara luego en los movimientos de stock del producto. Recordar que al ser un <strong>Retiro</strong>,
          debe de confirmarse la cantidad real usada para volver a retirar tocando el boton <span className="ml-2 inline-flex"><ConfirmButton /></span>.
        </p>
      </div>

      <WithdrawPreview unit={product.unit?.description!} />
    </>
  )
}