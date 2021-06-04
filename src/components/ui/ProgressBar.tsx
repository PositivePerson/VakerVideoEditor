import { XIcon } from '@heroicons/react/solid'
import React, { MutableRefObject, useEffect, useRef } from 'react'

interface Props {
  progress: number;
  exportPage?: boolean;
}



function ProgressBar({ progress, exportPage } : Props) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (progressRef && progressRef.current) {
      progressRef.current.style.transform = `scaleX(${1 - 0.01 * progress})`

    }
  }, [progress])

  if (exportPage) {
    return (
      <>
        <div className="group relative w-full h-7 rounded-full overflow-hidden text-center border border-white">
           
          <div className={`absolute z-50 group-hover:hidden text-center inset-0 top-[2px] transition-all ${progress < 50 ? "text-font-1" : "text-white"} `}>
            
            <div className="relative right-1">{progress} %</div>

            <div className="float-right w-4 h-4 mr-1 mt-[3px]"><XIcon /></div>
            
          </div>
          <div className="w-full absolute inset-0 bg-gradient-to-r from-[#F5FAFE] to-main">
            <div className="cursor-pointer w-full font-medium text-font-1 absolute inset-0 bg-[#F5FAFE] uppercase opacity-0 transition-opacity group-hover:opacity-100">
              <div className="relative top-0.5">cancel export</div>
            </div>
          </div>
          

          <div ref={progressRef} className="h-full w-full absolute inset-0 bg-bg-2 origin-right transform"></div>
        </div>
      </>
    )
  }

  
  return (
    <>
      <div className="relative w-full h-5 rounded-tl-xl rounded-tr-xl overflow-hidden text-center">
        <div className={`absolute z-50 text-center left-0 right-0 transition-all ${progress < 50 ? "text-font-1" : "text-white"} `}>{progress - 1} %</div>
        <div className={`h-full w-full absolute inset-0 bg-main`} />
        <div ref={progressRef} className="h-full w-full absolute inset-0 bg-bg-2 origin-right transform"></div>
      </div>
    </>

  )
} 

export default ProgressBar
