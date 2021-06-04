import React, { useState } from 'react'
import EditorHeader from '~/components/Editor/EditorHeader'
import Checkbox from '~/components/ui/Form/Checkbox'
import ProgressBar from '~/components/ui/ProgressBar';

function RenderingPage() {

  const [emailNotification, setEmailNotification] = useState<boolean>(false);

  const handleEmailNotification = () => {
    // Handle email notification communication logic with backend
    setEmailNotification(prev => !prev)
  }

  return (
    <>
      <EditorHeader exportPage projectName="projectName" />
      <main className="max-w-2xl mx-auto px-4">
        <div className="pt-36 pb-24 space-y-8">

          <div className="sm:px-12 lg:px-16 py-2 flex justify-center items-center shadow-md">
            <div className="flex-shrink-0" >
              <img src="/assets/editor/ai-icon.svg" height="75px" width="75px" />
            </div>
            <div>
              <h2 className="text-font-1 font-extrabold">Great! Your rendering has started!</h2>
              <p className="text-font-2">
                You can close this tab if you like, I will do the work. Once ready you can fint id under your "My Projects".
              </p>
            </div>
          </div>

          <div className="text-center">
            <Checkbox labelClassName="font-extrabold" handleClick={handleEmailNotification} label="Notify me when finished via email" value={emailNotification} id="email-notification-checkbox"  />
          </div>

          <div>
            <div className="h-96 bg-black w-full flex items-center px-12">
              <ProgressBar exportPage progress={100} />
              
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default RenderingPage
