import { SelectOption, StateForm } from "@/lib/definitions"
import Select, { StylesConfig } from 'react-select'

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
      <input id={htmlFor} name={name} aria-describedby={errorFor} className="block mt-2 min-w-[320px] w-full placeholder-gray-400/90 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" {...props} />
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

interface SelectProps {
  isMulti?: boolean
  label?: string
  htmlFor?: string,
  name?: string
  state?: StateForm
  errorFor?: string,
  options: SelectOption[],
  placeholder: string,
  requiredInput?: boolean
}


const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    minWidth: '320px',
    width: '100%',
    borderRadius: '0.5rem',
    borderColor: 'rgb(229 231 235)',
    borderWidth: '1px',
    padding: '0.225rem .9rem'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgb(156 163 175 / 0.9);'
  })
};

export function SelectInput({ name, options, placeholder, htmlFor, label, errorFor, state, requiredInput, ...props }: SelectProps) {
  const labelText = requiredInput ? <>{label} <span className="text-red-500">*</span></> : label
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm mb-2.5 text-gray-500">
        {labelText}
      </label>
      <Select
        instanceId={htmlFor}
        inputId={htmlFor}
        placeholder={placeholder}
        options={options}
        styles={customStyles}
        {...props}
      />
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