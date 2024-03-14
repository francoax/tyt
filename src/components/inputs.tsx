import { SelectOption, ServerActionResponse } from "@/lib/definitions"
import clsx from "clsx"
import Select, { StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  htmlFor?: string,
  name?: string
  state?: ServerActionResponse
  errorFor?: string,
  requiredInput?: boolean
  type?: string,
  className?: string,
}

export function Input({ label, htmlFor, name, state, errorFor, requiredInput, type, className, ...props}: InputProps) {
  const labelText = requiredInput ? <>{label} <span className="text-red-500">*</span></> : label
  const hasError = state?.errors && state?.errors[name!]
  let errorMessage = ''

  if(hasError) {
    errorMessage = state.errors![name!]![0]
  }
  return (
    <div className={className}>
      {type !== 'hidden' &&
        <label htmlFor={htmlFor} className="block text-sm text-gray-600">
          {labelText}
        </label>
      }
      <input
        id={htmlFor}
        name={name}
        aria-describedby={errorFor}
        className={clsx(
          "block mt-2 min-w-[320px] w-full placeholder-gray-400/90 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40",
          {
            "border-red-400 focus:border-red-400 focus:ring-red-300" : hasError
          }
        )}
        type={type}
        {...props}
      />
      {type !== 'hidden' &&
        <div id={errorFor} aria-live="polite" aria-atomic="true">
        {hasError &&
          <p className="mt-3 text-sm text-red-400">
            {errorMessage}
          </p>
        }
      </div>
      }
    </div>
  )
}

type Props = {
  isMulti?: boolean
  label?: string
  htmlFor?: string,
  name?: string
  state?: ServerActionResponse
  errorFor?: string,
  options?: SelectOption[],
  placeholder: string,
  requiredInput?: boolean,
  defaultValue?: SelectOption | SelectOption[],
  helpMessage?: string
}

type AdditionalProps = {
  [key: string]: any
}

type SelectProps = Props & AdditionalProps


const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    minWidth: '320px',
    width: '100%',
    borderRadius: '0.5rem',
    borderColor: state.selectProps["aria-invalid"] ? 'rgb(248 113 113)' : 'rgb(229 231 235)',
    borderWidth: '1px',
    padding: '0.225rem .9rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgb(156 163 175 / 0.9);'
  })
};

export function SelectInput({ name, options, placeholder, htmlFor, label, errorFor, state, requiredInput, defaultValue, ...props }: SelectProps) {
  const labelText = requiredInput ? <>{label} <span className="text-red-500">*</span></> : label
  const hasError = state?.errors && state?.errors[name!]
  let errorMessage = ''

  if(hasError) {
    errorMessage = state.errors![name!]![0]
  }

  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm mb-2.5 text-gray-600">
        {labelText}
      </label>
      <Select
        maxMenuHeight={300}
        defaultValue={defaultValue}
        instanceId={htmlFor}
        inputId={htmlFor}
        name={name}
        placeholder={placeholder}
        options={options}
        styles={customStyles}
        aria-invalid={errorMessage ? true : false}
        {...props}
      />
      <div id={errorFor} aria-live="polite" aria-atomic="true">
        {hasError &&
          <p className="mt-3 text-sm text-red-400">
            {errorMessage}
          </p>
        }
      </div>
    </div>
  )
}

export function CreatableSelectInput({ name, options, placeholder, htmlFor, label, errorFor, state, requiredInput, defaultValue, helpMessage, ...props }: SelectProps) {
  const labelText = requiredInput ? <>{label} <span className="text-red-500">*</span></> : label
  const hasError = state?.errors && state?.errors[name!]
  let errorMessage = ''

  if(hasError) {
    errorMessage = state.errors![name!]![0]
  }
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm mb-2.5 text-gray-600">
        {labelText}
      </label>
      <CreatableSelect
        maxMenuHeight={180}
        defaultValue={defaultValue}
        instanceId={htmlFor}
        inputId={htmlFor}
        name={name}
        placeholder={placeholder}
        options={options}
        styles={customStyles}
        aria-invalid={errorMessage ? true : false}
        {...props}
      />
      <p className="mt-1 text-sm text-gray-500">
        {helpMessage}
      </p>
      <div id={errorFor} aria-live="polite" aria-atomic="true">
        {hasError &&
          <p className="mt-3 text-sm text-red-400">
            {errorMessage}
          </p>
        }
      </div>
    </div>
  )
}