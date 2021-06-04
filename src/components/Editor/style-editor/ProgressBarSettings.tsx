import React, { FC, useState } from 'react'

import { Switch } from '@headlessui/react'
import { IEditorProgressBarStyles } from '~/redux/editor/editor.reducer';
import VideoProgressBar from '~/components/Editor/video-player/VideoProgressBar';
import ColorPicker from '~/components/ui/Form/ColorPicker';
import EditorSwitch from '~/components/ui/Form/EditorSwitch';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Slider } from 'antd';

interface Props {
    style: IEditorProgressBarStyles,
    onChange: Function,
    headline?: String,
}

const ProgressBarSettings: FC<Props> = ({ style, headline, onChange: handleChange }) => {
    const [ menuOpen, setMenuOpen ] = useState(false)

    const handleInput = (event: any) => {
        const { name, value } = event.target

        handleChange(name, value)
    }

    return (
        <div>
            <div className="mt-5 w-[440px] mx-auto">
                <div className="text-center grid grid-cols-12">
                    <div className="col-span-2 justify-self-end">
                        <EditorSwitch
                            isActive={style?.active}
                            onChange={() => handleChange('active', !style?.active)}
                            name="active"
                            
                        />

                    </div>
                    <div className="text-font-2 font-extrabold text-base select-none flex-1 col-span-8">
                        {headline}
                    </div>
                    <div className="col-span-2"/>
                </div>
                
                <div className="pt-5">
                    <div className="grid grid-cols-12">
                        <ChevronLeftIcon className="h-5 w-5 justify-self-center place-self-center" />

                        <div className="col-span-10 w-full bg-white rounded-xl mx-auto px-6 py-4 shadow">
                            <VideoProgressBar
                                percent={45}
                                backgroundColor={style.backgroundColor}
                                progressColor={style.progressColor}
                                borderRadius={style.borderRounded}
                            />
                        </div>

                        <ChevronRightIcon className="h-5 w-5 justify-self-center place-self-center" />
                    </div>

                    
                    <div
                        className="text-xs text-font-2 hover:text-font-1 justify-center mt-2 cursor-pointer select-none flex items-center mb-5"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        <div>Advanced Settings</div> 
                        { menuOpen ? <ChevronDownIcon className="inline h-4 w-4" /> : <ChevronRightIcon className="inline h-4 w-4"  /> }
                    </div>

                    {menuOpen && (
                        <div className="mt-2">
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <ColorPicker onChange={handleInput} value={style.backgroundColor} name="progressColor" />
                                </div>
                                <div className="flex-1">
                                    <ColorPicker onChange={handleInput} value={style.progressColor} name="backgroundColor" />
                                </div>

                                <div className="rounded-lg border border-main px-2 flex-1">
                                    <Slider
                                        className="w-full h-full"
                                        min={0}
                                        value={style.borderRounded}
                                        max={50}
                                        onChange={(value: number) => handleInput({target: { name: "borderRounded", value }})}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProgressBarSettings
