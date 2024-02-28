import Form from "@/components/products/create-form";
import { initCreation } from "@/lib/services/products.service";

export default async function Page() {
  const dataForCreation = await initCreation()

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Nueva producto</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <Form data={dataForCreation!} />
    </>
  )
}