import { XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React, { useState } from 'react'
import { Button } from '../ui/Button';
import Checkbox from '../ui/Form/Checkbox';
import EditorSwitch from '../ui/Form/EditorSwitch'
import RadioButton from '../ui/Form/Radiobutton';
import Modal from '../ui/Modal'
import VideoPlayer from './video-player/VideoPlayer';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: (state: boolean) => void;
  onStartExportVideo: (quality: string, notifyWhenFinishes: boolean) => void;
}

function ExportVideoModal({isModalOpen, setIsModalOpen, onStartExportVideo}: Props) {
  const [quality, setQuality] = useState('720p')
  const [notifyWhenFinishes, setNotifyWhenFinishes] = useState(false);

  const handleStartExport = () => {
    onStartExportVideo(quality, notifyWhenFinishes)
    setIsModalOpen(false)
  }

  return (
    <Modal state={isModalOpen} setState={setIsModalOpen} full>
      <div>
        <div className="flex justify-end p-2 text-font-icon hover:text-font-1">
          <button onClick={() => setIsModalOpen(false)}><XIcon className="w-4 h-4 float-right" /></button>
        </div>
        <div className="pb-10 pt-4 min-h-full w-full inline-flex justify-center items-center">
          
          <div className="font-extrabold">
            <div className="text-center">
              <div>Quality</div>
              <div>
                <RadioButton id="quality-480" label="480p" setValue={setQuality} actualRadioGroupValue={quality} value="480p" /> 
              </div>
              <div>
                <RadioButton id="quality-720" label="720p (HD)" setValue={setQuality} actualRadioGroupValue={quality} value="720p" /> 
              </div>
              <div>
                <RadioButton id="quality-1080" label="1080p (HD)" setValue={setQuality} actualRadioGroupValue={quality} value="1080p" /> 
              </div>
              <div>
                <RadioButton id="quality-4k" label="4K" setValue={setQuality} actualRadioGroupValue={quality} value="4k" /> 
              </div>
            </div>
            <div className="text-center mt-6">
              <Checkbox value={notifyWhenFinishes} handleClick={() => setNotifyWhenFinishes(prev => !prev)} id="notify-checkbox" label="Notify when finished via email"  />
            </div>

            {/* Video Preview */}
            <div className="w-[580px] my-8">
              <div className="h-80 rounded bg-black flex justify-center items-center">
                <div
                    className="videoplayer-action-btn rounded-full hover:opacity-80 focus:outline-none"
                >
                  <img src="/assets/editor/play-button.svg" height="50px" width="50px" className="" />
                    
                </div>
              </div>
            </div>

            <div className="w-52 mx-auto self-end">
              <Button className="uppercase" onClick={handleStartExport}>
                start export video
              </Button>
            </div>
            

          </div>
        </div>
      </div>

      
    </Modal>
  )
}

export default ExportVideoModal



