import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, ReactElement } from 'react'
import { Button } from './Button'

interface Props {
	state: boolean;
	setState: (state: boolean) => void;
  children: ReactElement;
	full?: boolean;
}

function Modal({ state, setState, children, full } : Props) {


  return (
    <Transition show={state}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center"
				static
				open={state}
				onClose={() =>
					setState(false)
				}
			>
				<div className="min-h-screen w-full px-4 relative">
					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
					</Transition.Child>

					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>

            <div className={`absolute ${ full ? "inset-1 sm:inset-6 md:inset-12" : "top-36 left-1/2 transform -translate-x-1/2" } overflow-y-scroll rounded-xl shadow-md bg-white z-50`}>
              {children}
            </div>
							
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
  )
}

export default Modal
