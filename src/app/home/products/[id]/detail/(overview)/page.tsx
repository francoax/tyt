import { Button, ReturnButton } from "@/components/buttons"
import { UpdateProduct } from "@/components/products/buttons"
import ProductDetail, { StockMovements } from "@/components/products/detail"
import { getProductById, hasPendingWithdraws } from "@/lib/data/products"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string }}) {
  const { id } = params
  const product = await getProductById(Number.parseInt(id), true)

  if(!product) {
    notFound()
  }

  const hasPending = await hasPendingWithdraws(product.id)

  return (
    <>
      <div>
        <ReturnButton href='/home/products'>
          Volver
        </ReturnButton>
        <p className="m-5 mb-2 px-3 py-1 text-sm text-center text-blue-600 bg-blue-100 rounded-full">
          Stock actual {product?.stock} {product?.unit.description}
        </p>
        { hasPending === 1 &&
          <p className="mx-5 mb-2 px-3 py-1 text-sm text-center text-red-600 bg-red-200 rounded-full">
            Retiro pendiente de confirmacion
          </p>
        }
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-medium  text-gray-800">
              Detalle del producto: <span className="text-blue-400">{product?.name.toUpperCase()}</span>
              <div className="inline-block ml-5">
                <UpdateProduct id={product?.id!} />
              </div>
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Informacion acerca del producto y sus movimientos de stock.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 flex items-center justify-center gap-5">
            <Button type="button">
              Retirar
            </Button>
            <Button primary type="button">
              Ingresar
            </Button>
          </div>
        </div>
      </div>
      <ProductDetail product={product as any} />
      <StockMovements product={product as any} />
    </>
  )
}