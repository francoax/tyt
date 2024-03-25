export default function Footer() {
  return (
    <footer className="bg-white justify-self-end">
      <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row text-gray-600">
        <h4>
          T&T Administracion {new Date().getFullYear()}
        </h4>

        <div className="flex flex-col sm:flex-row mt-6 lg:mt-0 lg:gap-6">
          <p className="text-center text-">Registro de gastos</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 lg:gap-6 lg:mt-0">
            <p className="text-sm transition-colors duration-300 hover:text-blue-500">
              Marzo: <span className="text-red-400">USD$-</span>
            </p>
            <p className="text-sm transition-colors duration-300 hover:text-blue-500">
              Anual: <span className="text-red-400">USD$-</span>
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-400 lg:mt-0">v1.1.25324</p>
      </div>
    </footer>
  )
}