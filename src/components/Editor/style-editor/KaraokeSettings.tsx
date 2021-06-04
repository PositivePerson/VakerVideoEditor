import React, { CSSProperties, FC, useState } from 'react'

import { Switch } from '@headlessui/react'
import { IEditorKaraokeStyles, IEditorTextStyles } from '~/redux/editor/editor.reducer';
import getCssPropertiesFromStyleConfiguration from '~/components/Editor/style-editor/getCssPropertiesFromStyleConfiguration';
import EditorSwitch from '~/components/ui/Form/EditorSwitch';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import ColorPicker from '~/components/ui/Form/ColorPicker';

interface Props {
    karaokeConfiguration: IEditorKaraokeStyles,
    subtitleConfiguration: IEditorTextStyles,
    onChange: Function,
}

const KaraokeSettings: FC<Props> = ({ karaokeConfiguration, subtitleConfiguration, onChange: handleChange }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleInput = (event: any) => {
        const { name, value } = event.target;

        handleChange(name, value)
    }

    const baseStyles = getCssPropertiesFromStyleConfiguration(subtitleConfiguration);
    const karaokeStyles: CSSProperties = {
        color: karaokeConfiguration.fontColor,
    };

    return (
        <div className="mt-5 w-[440px] mx-auto">
            <div className="text-center grid grid-cols-12">
                <div className="col-span-2 justify-self-end">
                    <EditorSwitch
                        isActive={karaokeConfiguration?.active}
                        onChange={() => handleChange('active', !karaokeConfiguration?.active)}
                        name="active"
                        
                    />

                </div>
                <div className="text-font-2 font-extrabold text-base select-none flex-1 col-span-8">
                    Karaoke
                </div>
                <div className="col-span-2"/>
            </div>
            <div className="pt-5">
                
                <div className="grid grid-cols-12">
                    <ChevronLeftIcon className="h-5 w-5 justify-self-center place-self-center" />

                    <div  
                        style={{ background: "repeating-linear-gradient(-45deg, rgba(255, 255, 255), rgba(255, 255, 255) 13px, rgba(0, 0, 0, 0.005) 10px, rgba(0, 0, 0, 0.005) 20px)" }} 
                        className="col-span-10 w-full bg-white rounded-xl mx-auto px-8 py-4 shadow truncate flex justify-center"
                    >
                        <span
                            style={baseStyles}
                            className="bg-gray-700 text-white text-center block"
                        >
                        <span style={karaokeStyles}>This</span> is a Subtitle
                        </span>
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
                    <>
                        <div className="mx-auto max-w-[160px]">
                            <ColorPicker onChange={handleInput} value={karaokeConfiguration?.fontColor || '#ffffff'} name="fontColor" />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default KaraokeSettings;
