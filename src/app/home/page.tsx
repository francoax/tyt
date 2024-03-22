import OverallCostBar from "@/components/cost-bar";
import { ProductsCounter, WithdrawsPendingCounter } from "@/components/counters";
import { Spinner, TableLoading } from "@/components/loaders";
import Search from "@/components/search";
import { ActionButton } from "@/components/stock/buttons";
import StockTable from "@/components/stock/table";
import { SM_DEPOSIT, SM_WITHDRAW } from "@/lib/constants";
import { Suspense } from "react";

export default function StockPage() {
  return (
    <>
      <OverallCostBar />
      <section className="container">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800">Lista de stock</h2>
              <Suspense fallback={<Spinner />}>
                <ProductsCounter />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <WithdrawsPendingCounter />
              </Suspense>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Detalle de cada producto con su stock actual.
            </p>
          </div>
          <div className="flex items-center mt-4 gap-x-3">
            <ActionButton action={SM_WITHDRAW} />
            <ActionButton action={SM_DEPOSIT}/>
          </div>
        </div>
        {/* <Search placeholder="Buscar por producto" /> */}
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <Suspense fallback={<TableLoading />}>
                  <StockTable />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}