import UpdateSupplierForm from "@/components/suppliers/edit-form";
import { getSupplierById } from "@/lib/data/suppliers";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string }}) {
  const id = params.id
  const supplier = await getSupplierById(Number.parseInt(id))

  if(!supplier) {
    notFound()
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Editar proveedor: {supplier.name.toLocaleUpperCase()}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <UpdateSupplierForm supplier={supplier} />
    </>
  )
}