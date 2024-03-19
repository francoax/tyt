import Link from "next/link";
import { Button, SubmitButton } from "./buttons";

export default function Form( { children, action, returnTo, textarea }: { children: React.ReactNode, action: any, returnTo: string, textarea?: React.ReactNode }) {
  return (
    <form action={action} className="mt-5 p-12 rounded-md divide-gray-200 bg-gray-200">
      <div className="flex justify-center gap-y-5 sm:gap-5 sm:justify-start flex-wrap">
        {children}
      </div>
      <>
        { textarea &&
          <div className="mt-8 w-full">
            {textarea}
          </div>
        }
      </>
      <div className="mt-8 sm:flex sm:items-center sm:justify-end">
        <div className="flex gap-5 justify-center sm:items-center ">
          <Link href={returnTo}>
            <Button type="button">
              Cancelar
            </Button>
          </Link>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}