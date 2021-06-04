import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Button } from './Button'

interface Props {
	state: boolean;
  title: string;
  description?: string;
  actionButtonName: string;
	setState: (state: boolean) => void;
  onAccept: () => void;
}

function DestructiveActionModal({ state, title, description, actionButtonName, setState, onAccept } : Props) {

  const handleAccept = () => {
    onAccept()
    setState(false)
  }

  return (
    <Transition show={state}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				static
				open={state}
				onClose={() =>
					setState(false)
				}
			>
				<div className="min-h-screen px-4 relative">
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

            <div className="relative max-w-md mx-auto top-36 overflow-hidden rounded-xl shadow-md bg-white z-50">
          
              <Dialog.Title
                as="h3"
                className="text-lg sm:text-xl text-font-1 pt-4 pl-6"
              >
                { title }
              </Dialog.Title>

              { description && <Dialog.Description
                as="div"
                className="font-sm text-font-2 pl-6 pr-12 pb-4 pt-4"
              >
                { description }
              </Dialog.Description> }

              <div className="bg-bg-3 p-4 flex justify-end px-4 gap-4">
                <button className="text-font-2 hover:text-font-1 focus:outline-none focus:ring-1 focus:ring-font-2 rounded px-2" onClick={() => setState(false)}> Cancel </button>
                <Button variant="danger" className="w-auto" onClick={handleAccept}>{ actionButtonName }</Button>

              </div>
            </div>
							
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
  )
}

export default DestructiveActionModal
