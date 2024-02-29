import { CreateButton } from "@/components/buttons";
import Search from "@/components/search";
import { Spinner, TableLoading } from "@/components/loaders";
import { Metadata } from "next";
import { Suspense } from "react";
import UnitsTable from "@/components/units/table";
import { getAmountOfUnits } from "@/lib/data/units";

export const metadata: Metadata = {
  title: 'Unidades'
}

export default async function UnitsPage({
  searchParams
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ''

  return (
    <section className="container">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">Lista de tipos de unidades</h2>
            <Suspense fallback={<Spinner />}>
              <TotalCategories />
            </Suspense>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada tipo de unidad vigente.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <CreateButton href={'/home/units/create'}>
            Nuevo tipo de unidad
          </CreateButton>
        </div>
      </div>
      <Search placeholder="Buscar por tipo de unidad" />
      <Suspense key={query} fallback={<TableLoading />}>
        <UnitsTable query={query} />
      </Suspense>
    </section>
  )
}

async function TotalCategories() {
  const amountUnits = await getAmountOfUnits()
  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {amountUnits} unidades
    </span>
  )
}