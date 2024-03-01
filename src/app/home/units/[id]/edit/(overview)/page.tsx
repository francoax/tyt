import Form from "@/components/units/edit-form";
import { getUnitById } from "@/lib/data/units";
import { notFound } from "next/navigation";

export default async function UpdateUnitPage(
  { params }: { params: { id: string }}
) {
  const id = params.id;
  const unit = await getUnitById(Number.parseInt(id))

  if(!unit) {
    notFound()
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Editar tipo de unidad: {unit.description.toLocaleUpperCase()}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <Form unit={unit} />
    </>
  )
}