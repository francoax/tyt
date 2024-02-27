import { StateForm } from "@/lib/definitions"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  htmlFor?: string,
  name?: string
  state?: StateForm
  errorFor?: string,
  requiredInput?: boolean
}

export function Input({ label, htmlFor, name, state, errorFor, requiredInput, ...props}: InputProps) {
  const labelText = requiredInput ? <>{label} <span className="text-red-500">*</span></> : label
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-gray-500">
        {labelText}
      </label>
      <input id={htmlFor} name={name} aria-describedby={errorFor} className="block mt-2 min-w-[320px] w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" {...props} />
      <div id={errorFor} aria-live="polite" aria-atomic="true">
        {state?.errors && state?.errors[name!] &&
          state.errors[name!]?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  )
}
