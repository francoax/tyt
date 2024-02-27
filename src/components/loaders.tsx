import './styles.css'

export function Spinner() {
  return (
      <span className="loader"></span>
  )
}

export function TableLoading() {
  return (
    <div className="min-h-96 p-12 flex justify-center items-center gap-5">
      <Spinner />
      Cargando tabla...
    </div>
  )
}