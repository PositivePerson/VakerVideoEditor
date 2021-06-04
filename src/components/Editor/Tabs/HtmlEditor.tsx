import React, { createRef, FC } from 'react';

import { ReactSortable } from 'react-sortablejs';

interface Props {
    list: any;
    hideLines: boolean;
    setList: Function;
    onChangeWords: (words: Array<string>) => void;
    setVideoPlaying: ( x: boolean ) => void;
}

const HtmlEditor: FC<Props> = ({ list, setList, hideLines, onChangeWords, setVideoPlaying }) => {

    const rootRef = createRef<HTMLDivElement>();

    const handleSortableChange = () => onChangeWords(rootRef.current?.innerText.split(/[\n\r]/g) ?? []);

    return (
        <div
            ref={rootRef}
            contentEditable
            suppressContentEditableWarning
            className={`focus:outline-none ${hideLines && 'hide-lines'}`}
            onFocus={() => setVideoPlaying( false )}
        >
            <ReactSortable
                list={list}
                className="flex flex-wrap"
                setList={(newState) => setList(newState)}
                onEnd={handleSortableChange}
            >
                {list.map((item: any, index: number) => (
                    <span
                        contentEditable={item?.type !== 'spacer'}
                        suppressContentEditableWarning
                        className={`focus:outline-none whitespace-nowrap ${
                            item?.type === 'spacer' ? 'spacer bg-[#000000] cursor-pointer' : 'mx-1'
                        }`}
                        style={item?.type === 'spacer' ? {
                            width: '3px',
                        } : undefined}
                        key={index}
                    >
						{item?.Word}
					</span>
                ))}
            </ReactSortable>
        </div>
    );
};

export default HtmlEditor;
