import Form from "@/components/products/create-form";
import { initCreationEdition } from "@/lib/data/products";
import { ProductDataForCreationEdition } from "@/lib/definitions";

export default async function Page() {
  const dataForCreation = await initCreationEdition()

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Nueva producto</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <Form data={dataForCreation as ProductDataForCreationEdition} />
    </>
  )
}