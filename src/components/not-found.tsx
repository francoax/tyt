import Link from "next/link";
import { ReturnButton } from "./buttons";

export default function NotFoundComponent({ message , href} : { message: string, href: string }) {
  return (
    <section className="bg-white ">
      <div className="container flex items-center px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800md:text-3xl">404 Not Found</h1>
          <p className="mt-4 text-gray-500">{message}</p>
          <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <ReturnButton href={href}>
              Volver
            </ReturnButton>
          </div>
        </div>
      </div>
    </section>
  )
}