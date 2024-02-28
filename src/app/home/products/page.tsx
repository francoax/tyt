import { Button } from "@/components/buttons";
import Search from "@/components/search";
import CategoriesTable from "@/components/categories/table";
import { Spinner, TableLoading } from "@/components/loaders";
import { getAmountOfCategories } from "@/lib/services/categories.service";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProductsTable from "@/components/products/table";
import { getAmountOfProducts } from "@/lib/services/products.service";

export const metadata: Metadata = {
  title: 'Productos'
}

export default function Page({
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
            <h2 className="text-lg font-medium text-gray-800">Lista de productos</h2>
            <Suspense fallback={<Spinner />}>
              <TotalProducts />
            </Suspense>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada producto vigente.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <Link href={'/home/products/create'}>
            <Button primary={true} className="flex items-center gap-5">
              Nueva producto
              <PlusIcon className="w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <Search placeholder="Buscar por producto" />
      <Suspense key={query} fallback={<TableLoading />}>
        <ProductsTable query={query} />
      </Suspense>
    </section>
  )
}

async function TotalProducts() {
  const amountProducts = await getAmountOfProducts()
  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {amountProducts} productos
    </span>
  )
}