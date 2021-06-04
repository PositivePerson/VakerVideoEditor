import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react';
import HtmlEditor from './HtmlEditor';
import { RootState } from '~/redux/rootStore';
import { ITranslationWord } from '~/redux/editor/editor.reducer';
import { setSubtitles } from '~/redux/editor/editor.actions';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Input } from '~/components/ui/Form/Input';
import EditorSwitch from '~/components/ui/Form/EditorSwitch';
import { FaCheck, FaPlus } from 'react-icons/fa';

interface Props {
    setVideoPlaying: ( x: boolean ) => void;
}

const SubtitleEditor: FC<Props> = (props) => {
    const [list, setList] = useState<ITranslationWord[]>([]);

    const [helperTools, setHelperTools] = useState(false);
    const [hideLines, setHideLines] = useState(false);
    const [replaceWord, setReplaceWord] = useState('');
    const [replace, setReplace] = useState('');

    const dispatch = useDispatch();

    const { NBest } = useSelector(
        ({ editor }: RootState) => editor.currentVideoTranslation,
    );

    const {
        setVideoPlaying
    } = props;

    useEffect(() => {
        const finishedList = [];

        for (let index = 0; index < NBest[0]?.Words.length; index++) {
            const element = NBest[0]?.Words[index];

            finishedList.push({ id: finishedList.length, ...element });

            if (index > 0 && index % 20 === 0) {
                finishedList.push({
                    id: finishedList.length,
                    type: 'spacer',
                });
            }
        }

        setList(finishedList);

        dispatch(setSubtitles(finishedList));
    }, [list.length < 1]);

    const handleReplaceWord = (event: MouseEvent) => {
        event.preventDefault();

        const regex = RegExp(`(\\b${replaceWord}\\b)`, 'gi');

        const replacedWordList = list.map((el) => ({
            ...el,
            Word: (el.Word ?? '').toString().replace(regex, replace),
        }));

        setList(replacedWordList);
    };

    // Add spacer, to the current element
    const addNewSpacer = () => {
        const data = [...list];

        data.push({
            id: data.length,
            type: 'spacer',
        });

        setList(data);
    };

    // Save changes in state
    const onChangeWords = (words: Array<string>) => {
        console.log('onChangeWords');

        const elements: ITranslationWord[] = [];

        let spacerOffset = 0;

        words.forEach((value: string, index: number) => {
            if (list[index + spacerOffset]?.type === 'spacer') {
                elements.push({
                    id: elements.length,
                    type: 'spacer',
                });

                spacerOffset++;
            }

            elements.push({
                ...list[index + spacerOffset],
                id: elements.length,
                Word: value,
            });
        });

        setList(elements);

        dispatch(setSubtitles(elements));
    };

    return (
        <div className="p-2 mt-5 min-h-96 2xl:grid 2xl:grid-cols-2 gap-6">
            <div
                className={`
                    w-full h-full shadow-md rounded-xl bg-bg-3 py-6 px-6
                    ${hideLines && 'hideLines'}
                `}
            >
                {list && list.length > 0 && (
                    <HtmlEditor
                        list={list}
                        setList={setList}
                        hideLines={hideLines}
                        onChangeWords={onChangeWords}
                        setVideoPlaying={setVideoPlaying}
                    />
                )}
            </div>
            <div className="mt-6 2xl:mt-0">
                <div className="flex items-center">
                    <EditorSwitch isActive={helperTools} onChange={() => setHelperTools(prev => !prev)} name="toogleHelperTools" />
                    <label className="text-font-2 font-extrabold pl-4" htmlFor="toogleHelperTools">Helper Tools</label>
                </div>

                {helperTools && (
                    <div className="space-y-6 mt-6">
                        <div className="grid grid-cols-4 items-center">
                            <div className="col-span-1">
                                <label htmlFor="replace-this-word" className="text-font-2 mb-4 font-extrabold block">Replace word:</label>
                                <label htmlFor="with-word" className="text-font-2 font-extrabold block">with word:</label>
                            </div>
                            <div className="col-span-2 space-y-2 px-4">
                                <input
                                    placeholder="Example"
                                    id="replace-this-word"
                                    className="px-3 py-1 w-full bg-white rounded-full shadow-sm focus:outline-none border border-gray-100"
                                    onChange={(event: any) => setReplaceWord(event?.target.value)}
                                    value={replaceWord}
                                />
                                <input
                                    placeholder="Example"
                                    id="with-word"
                                    className="px-3 py-1 w-full bg-white rounded-full shadow-sm focus:outline-none border border-gray-100"
                                    onChange={(event: any) => setReplace(event?.target.value)}
                                    value={replace}
                                />
                            </div>
                            <div  className="col-span-1 justify-self-center">
                                <button
                                    className="block self-end p-2 text-font-icon bg-white rounded hover:bg-gray-100 hover:text-gray-400 shadow-sm focus:outline-none"
                                    onClick={handleReplaceWord}
                                >
                                    <FaCheck size={20} />
                                </button>
                            </div>
                            
                        </div>


                        <div className="grid grid-cols-4 items-center">
                            <label className="text-font-2 font-extrabold block col">Add a new field</label>
                            <div  className="justify-self-center">
                                <div className="border-r-4 bg-white border-font-1 p-2 border-l-4 text-sm text-font-2">Example</div>
                            </div>
                            <div className="justify-self-center">
                                <button
                                    className="block self-end p-2 text-font-icon bg-white rounded hover:bg-gray-100 hover:text-gray-400 shadow-sm focus:outline-none"
                                    onClick={addNewSpacer}
                                >
                                    <FaPlus size={20} />
                                </button>
                            </div>
                            
                        </div>
                       

                        <div className="grid grid-cols-4 items-center">
                            <label htmlFor="turnOffLines" className="pr-4 text-font-2 font-extrabold block">Turn off the lines</label>
                            <div className="justify-self-center">
                                <div className="border-font-1 mr-1 p-2 border-l-4 text-sm text-font-2"><span className="invisible" aria-hidden>Example</span></div>
                            </div>
                            <div className="justify-self-center">
                                <EditorSwitch isActive={hideLines} onChange={() => setHideLines(prev => !prev)} name="turnOffLines" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubtitleEditor;
