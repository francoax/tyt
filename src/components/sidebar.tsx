import NavLinks from "./nav-links"

const SideBar = () => {
  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      {/* <a href="#">
          <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="">
      </a> */}

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
          <NavLinks />
          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Cuenta</label>
            <form action={async () => {
              'use server';
              console.log('hi')
            }}>
              <button className='flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'>
                <span className="mx-2 text-sm font-medium">Cerrar sesion</span>
              </button>
            </form>
          </div>
        </nav>
      </div>
  </aside>
  )
}

export default SideBar