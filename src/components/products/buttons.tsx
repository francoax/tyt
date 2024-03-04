import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PRODUCTS_ROUTE } from "@/lib/constants";

export function DetailProduct({ id }: { id: number }) {
  return (
    <Link
      href={`${PRODUCTS_ROUTE}/${id}/detail`}
    >
      <InformationCircleIcon className="w-5 text-gray-500 transition-colors duration-200 hover:text-blue-500 focus:outline-none" />
    </Link>
  )
}

export function ConfirmButton() {
  return (
    <Link href={''}>
      <CheckIcon className="w-5 h-5 transition-colors duration-200 hover:text-emerald-500 text-gray-800 focus:outline-none" />
    </Link>
  )
}