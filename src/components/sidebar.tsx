"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links"
import { useState } from "react";
import clsx from "clsx";
import { signOutAction } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(false)
  const user = useSession()
  return (
    <>
      <button onClick={() => setShowSideBar(prevState => !prevState)} className="sm:hidden">
        <Bars3Icon className="w-10 h-10 m-2" />
      </button>
      <aside onClick={() => setShowSideBar(prevState => !prevState)} className={`sm:flex flex-col w-full h-screen sm:w-64 px-5 py-4 overflow-y-auto bg-white border-r md:block ${showSideBar ? 'sm:slide-in absolute z-[1]' : 'sm:slide-out absolute z-[1]'}`}>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6">
            <NavLinks />
            <div className="space-y-3">
              <div className="space-y-3">
                <label className="px-3 text-xs text-gray-500 uppercase">Cuenta ({user.status})</label>
                <form action={signOutAction}>
                  <button className='flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700'>
                    <span className="mx-2 text-sm font-medium">Cerrar sesion</span>
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      <style jsx>{
        `
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes slideOut {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100%);
            }
          }

          @media screen and (max-width: 767px) {
            .sm\:slide-in {
              animation: slideIn 0.3s ease forwards;
            }
            .sm\:slide-out {
              animation: slideOut 0.3s ease forwards;
            }
          }
        `
      }
      </style>
    </>
    // <>
      // <button onClick={() => setShowSideBar(prevState => !prevState)}>
      //   <Bars3Icon className="w-10 h-10 m-5 transition-colors duration-300 focus:bg-slate-200 float-right text-gray-500 sm:hidden" />
      // </button>
    //   <aside
    //     onClick={() => setShowSideBar(prevState => !prevState)}
    //     className={clsx(
    //       "sm:flex flex-col h-[95vh] w-full sm:w-64 px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l",
    //       {
    //         "hidden" : !showSideBar
    //       },
    //       {
    //         "transition ease-in-out delay-150 fixed z-[10000]" : showSideBar
    //       }
    //     )}
    //   >
    //     <div className="flex flex-col justify-between flex-1 mt-6">
    //       <nav className="-mx-3 space-y-6 ">
    //         <NavLinks />
    //         <div className="space-y-3">
    //           <label className="px-3 text-xs text-gray-500 uppercase">Cuenta ({user.status})</label>
    //           <form action={signOutAction}>
    //             <button className='flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700'>
    //               <span className="mx-2 text-sm font-medium">Cerrar sesion</span>
    //             </button>
    //           </form>
    //         </div>
    //       </nav>
    //     </div>
    //   </aside>
    // </>
  )
}

export default SideBar