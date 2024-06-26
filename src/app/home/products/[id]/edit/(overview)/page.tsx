import Form from "@/components/products/edit-form"
import { getProductById, initCreationEdition } from "@/lib/data/products"
import { ProductDataForCreationEdition } from "@/lib/definitions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string }}) {
  const id = params.id;
  const [product, dataForEdition] = await Promise.all([
    getProductById(Number.parseInt(id)),
    initCreationEdition()
  ])

  if(!product) {
    notFound()
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Editar producto: {product.name.toLocaleUpperCase()}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <Form product={product as any}  data={dataForEdition as ProductDataForCreationEdition} />
    </>
  )
}