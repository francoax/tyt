"use client";

import { CSSTransition } from 'react-transition-group';
import { useSearchParams } from "next/navigation";

export default function Modal(
  {
    title,
    children,
  } :
  {
    title: string,
    children: React.ReactNode
  }
) {
  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')

  return (
    <>
      <CSSTransition
      in={modal === 'true'}
      timeout={300}
      classNames="my-transition"
      unmountOnExit
    >
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title" role="dialog" aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 backdrop-blur-sm">
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle min-w-96 sm:max-w-6xl sm:p-6">
            <div>
              <div className="mt-2">
                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">{title}</h3>
                <div className="mt-2 text-gray-500 dark:text-gray-400">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </CSSTransition>

    <style jsx>{`
      .my-transition-enter {
        opacity: 0;
        transform: translateY(-4px);
      }
      .my-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 300ms, transform 300ms;
      }
      .my-transition-exit {
        opacity: 1;
        transform: translateY(0);
      }
      .my-transition-exit-active {
        opacity: 0;
        transform: translateY(-4px);
        transition: opacity 150ms, transform 150ms;
      }
    `}
    </style>
    </>
  )
}