import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";

export function DetailProduct({ id }: { id: number }) {
  return (
    <Link
      href={`/home/products/${id}/detail`}
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