"use client";

import useFormHandler from "@/lib/hooks/useFormHandler";
import { Input } from "./inputs";
import { signInAction } from "@/lib/actions/auth";
import { Button } from './buttons';
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";
import { Spinner } from "./loaders";

export default function LoginForm() {
  const [state, formAction] = useFormHandler(
    'Ingreso',
    '',
    signInAction
  )

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="px-6 py-4">
        <h3 className="mt-3 text-xl font-medium text-center text-gray-600">T&T</h3>
        <p className="mt-1 text-center text-gray-500">Ingreso</p>
        <form action={formAction}>
          <div className="flex flex-col gap-5 max-w-[320px] m-auto">
            <Input
              state={state}
              name="username"
              htmlFor="username"
              errorFor="username-error"
              requiredInput
              label="Username"
              placeholder="Username"
            />
            <Input
              state={state}
              name="password"
              htmlFor="password"
              errorFor="password-error"
              requiredInput
              label="Contraseña"
              placeholder="********"
              type="password"
            />
          </div>
          <div className="mt-5 flex justify-center">
            <SubmitButton />
          </div>
        </form>
    </div>
</div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="flex items-center gap-2" primary type="submit" disabled={pending}>
      Ingresar
      {pending ? <Spinner /> : <ArrowRightEndOnRectangleIcon className="w-5 h-5" /> }
    </Button>
  )
}