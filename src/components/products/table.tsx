import { ProductTableFormatted } from "@/lib/definitions"
import { getProducts } from "@/lib/data/products"
import { DeleteButton, UpdateButton } from "../buttons"
import { deleteProductAction } from "@/lib/actions/products"
import { DetailProduct } from "./buttons"

export default async function ProductsTable({
  query
}: {
  query?: string
}) {

  const products = await getProducts(query)
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <Table products={products} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Table({
  products
}: {
  products: ProductTableFormatted[]
}) {

  if(products.length === 0) {
    return (
      <p className="text-center text-gray-700">Sin productos por el momento.</p>
    )
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Id
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Nombre
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Categoria
            </th>

            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Unidad
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Proveedores
            </th>

            <th scope="col" className="relative py-3.5 px-4">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(p => (
            <TableRow key={p.id} product={p} />
          ))}
        </tbody>
      </table>
    </>
  )
}

async function TableRow({
  product
}: {
  product: ProductTableFormatted
}) {
  let suppliers;
  if(product.suppliers?.length !== 0) {
    suppliers =
    <>
      {product.suppliers?.map((s, index) => (
        <p key={index} className="text-gray-700">{s}</p>
      ))}
    </>
  } else {
    suppliers = <p className="text-gray-500">Sin proveedores</p>
  }

  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {product.id}
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        {product.name}
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        {product.category}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {product.unit}
      </td>

      <td className="px-8 py-4 text-sm whitespace-nowrap">
        <div>
          {suppliers}
        </div>
      </td>

      <td className="px-8 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <UpdateButton href={`/home/products/${product.id}/edit`} />
          <DeleteButton
            id={product.id}
            title="Eliminar producto"
            description={`Estas seguro de querer eliminar el producto ${product.name.toLocaleUpperCase()}?`}
            deleteAction={deleteProductAction}
          />
          <DetailProduct id={product.id} />
        </div>
      </td>
    </tr>
  )
}