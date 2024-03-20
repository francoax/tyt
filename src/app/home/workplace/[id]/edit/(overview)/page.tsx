import UpdateWorkplaceForm from "@/components/workplace/edit-form"
import { getWorkplaceById } from "@/lib/data/workplace"
import { notFound } from "next/navigation"

export default async function Page({ params } : { params: { id: string }}) {
  const { id } = params

  const workplace = await getWorkplaceById(Number(id))

  if(!workplace) return notFound()

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Editar empresa</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <UpdateWorkplaceForm workplace={workplace} />
    </>
  )
}