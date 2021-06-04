import React, { FC, useState } from 'react'

import { Switch } from '@headlessui/react'
import { Slider } from 'antd';
import { IEditorTextStyles } from '~/redux/editor/editor.reducer';
import getCssPropertiesFromStyleConfiguration from '~/components/Editor/style-editor/getCssPropertiesFromStyleConfiguration';
import EditorSwitch from '~/components/ui/Form/EditorSwitch';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight} from "react-icons/ai";

import ColorPicker from '~/components/ui/Form/ColorPicker';

interface Props {
    configuration: IEditorTextStyles;
    onChange: (fieldName: string, value: string | number | boolean) => void;
    headline: string;
    previewText: string;
    contentEditable: boolean;
    onContentChange?: (value: string) => void;
}

const SelectAdvancedSettings: FC<Props> = ({
    configuration, headline, previewText, onChange: handleChange, contentEditable, onContentChange
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleInput = (event: any) => {
        const { name, value } = event.target;

        handleChange(name, value)
    }

    const createSliderHandler = (name: string) => {

        return (value: number) => {

            handleChange(name, value);
        }
    }

    const styles = getCssPropertiesFromStyleConfiguration(configuration);

    return (
        <div className="mt-5">
            <div className="mx-auto w-[440px]">
                <div className="text-center grid grid-cols-12">
                    <div className="col-span-2 justify-self-end">
                        <EditorSwitch
                            isActive={configuration?.active}
                            onChange={() => handleChange('active', !configuration?.active)}
                        />
                    </div>
                    <div className="col-span-8">
                        
                        <div className="text-font-2 font-extrabold text-base text-center select-none flex-1">
                            {headline}
                        </div>

                    </div>
                    <div className="col-span-2" />
                
                </div>
            </div>
            <div className="pt-5">
                <div className="mx-auto w-[440px]">
                    <div className="grid grid-cols-12">
                

                        <ChevronLeftIcon className="h-5 w-5 justify-self-center place-self-center" />
                    

                        <div className="col-span-10">
                            <div 
                                style={{ background: "repeating-linear-gradient(-45deg, rgba(255, 255, 255), rgba(255, 255, 255) 13px, rgba(0, 0, 0, 0.005) 10px, rgba(0, 0, 0, 0.005) 20px)" }} 
                                className="rounded-xl mx-auto px-8 py-4 shadow truncate flex justify-center"
                            >
                                <div
                                    style={styles}
                                    className="bg-gray-700 text-white px-8 text-center focus:outline-none relative"
                                    contentEditable={contentEditable}
                                    onBlur={event => onContentChange?.(event.currentTarget.textContent!)}
                                >
                                {previewText}
                                </div>
                            </div>
                            
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
                </div>

                {menuOpen && (
                    <>
                        <div className="mx-auto w-[440px] space-y-3">
                            <div className="mx-auto grid grid-flow-row grid-cols-3 gap-x-3 px-3 gap-y-3">
                                <select
                                    value={configuration?.font}
                                    className="bg-white border border-[#323438] px-1 h-8 py-0 rounded-lg"
                                    name="font"
                                    onChange={handleInput}
                                >
                                    <option value="arial">Arial</option>
                                    <option value="roboto">Roboto</option>
                                </select>

                                <div className="bg-white border border-[#323438] h-8 p-1 rounded-lg flex items-center">
                                    <div className="pr-2 place-self-center text-base">
                                        Size:
                                    </div>
                                    <Slider
                                        onChange={createSliderHandler("fontSize")}
                                        value={configuration?.fontSize}
                                        step={2}
                                        min={8}
                                        max={36}
                                        className="w-full h-full relative top-1.5"
                                    />
                                </div>
                                <ColorPicker onChange={handleInput} value={configuration?.fontColor || '#ffffff'} name="fontColor" />
                            </div>
                            <div className="mx-auto grid grid-flow-row grid-cols-3 gap-x-3 px-3 gap-y-3 h-8">
                                <div className="grid grid-cols-3 border border-[#323438] rounded-lg text-lg">
                                    <button className="flex justify-center items-center border-r rounded-l-lg hover:bg-gray-100 border-[#323438] focus:outline-none">
                                        <BsTypeBold />
                                    </button>
                                    <button className="flex justify-center items-center border-r hover:bg-gray-100 border-[#323438] focus:outline-none">
                                        <BsTypeItalic />
                                    </button>
                                    <button className="flex justify-center items-center rounded-r-lg hover:bg-gray-100 focus:outline-none">
                                        <BsTypeUnderline />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 border border-[#323438] rounded-lg text-lg">
                                    <button className="flex justify-center items-center border-r rounded-l-lg hover:bg-gray-100 border-[#323438] focus:outline-none">
                                        <AiOutlineAlignLeft />
                                    </button>
                                    <button className="flex justify-center items-center border-r hover:bg-gray-100 border-[#323438] focus:outline-none">
                                        <AiOutlineAlignCenter />
                                    </button>
                                    <button className="flex justify-center items-center rounded-r-lg hover:bg-gray-100 focus:outline-none">
                                        <AiOutlineAlignRight />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 border border-[#323438] rounded-lg text-lg">
                                    <button className="flex justify-center items-center border-r rounded-l-lg hover:bg-gray-100 border-[#323438] focus:outline-none">
                                        -
                                    </button>
                                    <button className="flex justify-center items-center border-r hover:bg-gray-100 border-[#323438] focus:outline-none">
                                        AB
                                    </button>
                                    <button className="flex justify-center items-center rounded-r-lg hover:bg-gray-100 focus:outline-none">
                                        ab
                                    </button>
                                </div>
                            </div>

                        

                        </div>

                        <div className="mt-10 max-w-lg mx-auto flex space-x-2 px-1 h-8">
                            <div className="place-self-center">
                                <EditorSwitch
                                    isActive={configuration?.backgroundActive}
                                    onChange={() => handleChange('backgroundActive', !configuration.backgroundActive)}
                                    name="backgroundActive"
                                   
                                />
                            </div>

                            
                            <div className="pr-2 font-bold text-gray-500 place-self-center">
                                Background:
                            </div>

                            <div className="flex-1">
                                <ColorPicker onChange={handleInput} value={configuration?.backgroundColor || '#43597D'} name="backgroundColor" />
                            </div>
                            

                            <div className="bg-white border flex-1 border-[#323438] p-1 rounded-lg flex">
                                <Slider
                                    onChange={createSliderHandler("borderRounded")}
                                    value={configuration?.borderRounded}
                                    min={0}
                                    max={25}
                                    className="w-full h-full relative bottom-1"
                                />
                            </div>
                        </div>
                        <div className="mx-auto w-[440px] grid grid-cols-3 gap-8 mt-8 items-center justify-center">
                            <div className="bg-white text-outline pt-4 text-lg font-extrabold h-full shadow-md text-center text-white rounded-md hover:bg-gray-100 cursor-pointer">
                                Outline
                            </div>
                            <div className="bg-white text-lg shadow-md py-1 text-center text-white rounded-md hover:bg-gray-100 cursor-pointer">
                                <span className="bg-black">Split<br/> box</span>
                            </div>
                            <div className="bg-white text-shadow pt-4 text-lg font-extrabold shadow-md h-full text-center text-white rounded-md hover:bg-gray-100 cursor-pointer">
                                Shadow
                            </div>
                        </div>
                        <style jsx>{`
                        
                            .text-outline {
                                text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
                            }
                            .text-shadow {
                                text-shadow: 2px 2px 5px black;
                            }
                        
                        `}</style>
                    </>
                )}
            </div>
        </div>
    )
}

export default SelectAdvancedSettings
