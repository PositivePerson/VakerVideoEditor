import React, { useState } from 'react'

import { setSettings } from '~/redux/editor/editor.actions'
import { useDispatch, useSelector } from 'react-redux'
import SelectAdvancedSettings from '~/components/Editor/style-editor/SelectAdvancedSettings';
import KaraokeSettings from '~/components/Editor/style-editor/KaraokeSettings';
import { RootState } from '~/redux/rootStore';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Form/Input';

export default function StyleEditor() {
    const [saveDialogIsOpen, setOpenSaveDialog] = useState(false)
    const subtitleConfiguration = useSelector(({ editor }: RootState) => editor?.styles?.subtitle)
    const karaokeConfiguration = useSelector(({ editor }: RootState) => editor?.styles?.karaoke)
    const dispatch = useDispatch()
    const [templateName, setTemplateName] = useState("")

    const handleSaveDialog = () => {
        setOpenSaveDialog(!saveDialogIsOpen)
    }

    const saveTemplate = () => {
        // TODO: Request do save request

        handleSaveDialog()
    }

    // Saving current setting with key and uuid.
    // Function handle data from SelectAdvancedSettings
    const handleSubtitleChange = (name: string, value: string | number | boolean) => {
        dispatch(setSettings('subtitle', name, value))
    }

    const handleKaraokeChange = (name: string, value: string | number | boolean) => {
        dispatch(setSettings('karaoke', name, value))
    }

    return (
        <>
            {saveDialogIsOpen && (
                <div className="fixed bg-fixed inset-0 bg-white bg-opacity-70 z-50">
                    <div
                        // eslint-disable-next-line max-len
                        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4 px-6 rounded-xl w-1/3 shadow-md"
                    >
                        <h2 className="text-xl mb-4">
                            Save template
                        </h2>

                        <input
                            value={templateName}
                            type="text"
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Template Name"
                            className="p-2 border border-main focus:outline-none focus:border-main focus:ring focus:ring-blue-200 rounded w-full"
                            name="templateName"
                        />

                        <div className="mt-4 grid grid-cols-2 gap-1">
                            <Button
                                onClick={saveTemplate}
                            >
                                Save
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handleSaveDialog}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-h-full">
                <div>
                    <div className="mt-5">
                        <SelectAdvancedSettings
                            onChange={handleSubtitleChange}
                            configuration={subtitleConfiguration}
                            headline="Subtitle"
                            previewText="This is a subtitle"
                            contentEditable={false}
                        />
                    </div>
                    <div className="pt-5">
                        <KaraokeSettings
                            onChange={handleKaraokeChange}
                            karaokeConfiguration={karaokeConfiguration}
                            subtitleConfiguration={subtitleConfiguration}
                        />
                    </div>

                    <div className="mt-24 text-center">
                        <div
                            onClick={handleSaveDialog}
                            className="inline-block uppercase py-2 px-4 shadow-md font-extrabold rounded hover:bg-gray-100 cursor-pointer"
                        >
                            Save styles as template
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
