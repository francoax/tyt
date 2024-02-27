import { Button } from "@/components/buttons";
import CategoriesTable from "@/components/categories/table";
import { Spinner, TableLoading } from "@/components/loaders";
import { getAmountOfCategories } from "@/lib/services/categories.service";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Categorias'
}

export default async function CategoriesPage() {
  return (
    <section className="container">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">Lista de categorias</h2>
            <Suspense fallback={<Spinner />}>
              <TotalCategories />
            </Suspense>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada categoria vigente.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <Link href={'/home/categories/create'}>
            <Button primary={true} className="flex">
              Nueva categoria
              <PlusIcon className="w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<TableLoading />}>
        <CategoriesTable />
      </Suspense>
    </section>
  )
}

async function TotalCategories() {
  const amountCategories = await getAmountOfCategories()
  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {amountCategories} categorias
    </span>
  )
}