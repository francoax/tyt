import Form from "@/components/units/create-form";


export default function CreateUnitPage() {
  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Nuevo tipo de unidad</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <Form />
    </>
  )
}