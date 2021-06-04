import React, { useState } from 'react'
import EditorSwitch from '../ui/Form/EditorSwitch'
import Modal from '../ui/Modal'

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: (state: boolean) => void;
  onDownloadSRTFile: (state: boolean) => void;
}

function ExportSRTModal({isModalOpen, setIsModalOpen, onDownloadSRTFile}: Props) {
  const [withTimestaps, setWithTimestamps] = useState(false)

  const handleContinue = () => {
    onDownloadSRTFile(withTimestaps)
    setIsModalOpen(false)
  }

  return (
    <Modal state={isModalOpen} setState={setIsModalOpen}>
      <div className="text-center py-6 pr-10 pl-8 space-y-6">
        <div className="font-extrabold ml-2 space-x-3">
          
          <EditorSwitch isActive={withTimestaps} onChange={() => setWithTimestamps(prev => !prev)} />
    
          <span className="ml-2">Download .SRT with timestamps</span>
   
        </div>

        <button onClick={handleContinue} className="uppercase text-font-1 rounded bg-white shadow-md hover:bg-gray-100 py-2 px-6">
          continue
        </button>
      </div>
    </Modal>
  )
}

export default ExportSRTModal
