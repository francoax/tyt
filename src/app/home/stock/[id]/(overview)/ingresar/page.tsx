import { ReturnButton } from "@/components/buttons"
import { DepositPreview } from "@/components/stock/action-preview"
import DepositForm from "@/components/stock/forms/deposit-form"
import { getProductById } from "@/lib/data/products"
import { getWorkplaces } from "@/lib/data/workplace"
import { Product } from "@/lib/definitions"
import { notFound } from "next/navigation"

type Params = {
  id: string,
  stock_before: string,
  stock_after: string,
  amount_involved: string,
  total_price: string,
  dollar_at_date: string
}

export default async function Page({ params }: { params: Params }) {
  const { id } = params
  const product = await getProductById(Number.parseInt(id)) as Product

  const workplaces = await getWorkplaces()
  if(!product) {
    notFound()
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-medium text-gray-800">
          Ingresar stock para <span className="text-blue-400">{product?.name.toUpperCase()}</span>
          <span className="ml-2 px-3 py-1 text-xs text-blue-500 bg-blue-200 rounded-full">
            (Stock actual {product?.stock} {product?.unit?.description})
          </span>
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>

      <DepositForm product={product} workplaces={workplaces} />

      <div className="my-5 border border-gray-300"></div>

      <div className="mt-5">
        <h2 className="text-lg font-medium  text-gray-800">Previsualizacion</h2>
        <p className="mt-1 text-sm text-gray-500">
          Asi se mostrara luego en los movimientos de stock del producto.
        </p>
      </div>

      <DepositPreview unit={product.unit?.description!} />
    </>
  )
}