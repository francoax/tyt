import { CreateButton } from "@/components/buttons";
import Search from "@/components/search";
import { Spinner, TableLoading } from "@/components/loaders";
import { Metadata } from "next";
import { Suspense } from "react";
import { WORKPLACES_ROUTE } from "@/lib/constants";
import WorkplaceTable from "@/components/workplace/table";
import { getAmountOfWorkplace } from "@/lib/data/workplace";

export const metadata: Metadata = {
  title: 'Empresas'
}

export default async function Page({
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
            <h2 className="text-lg font-medium text-gray-800">Lista de empresas</h2>
            <Suspense fallback={<Spinner />}>
              <AmountWorkplaces />
            </Suspense>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada empresa vigente.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <CreateButton href={`${WORKPLACES_ROUTE}/create`}>
            Nueva empresa
          </CreateButton>
        </div>
      </div>
      <Search placeholder="Buscar por empresa" />
      <Suspense key={query} fallback={<TableLoading />}>
        <WorkplaceTable query={query} />
      </Suspense>
    </section>
  )
}

async function AmountWorkplaces() {
  const amountUnits = await getAmountOfWorkplace()
  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {amountUnits} empresas
    </span>
  )
}