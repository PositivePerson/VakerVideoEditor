import React, { createRef, FC, useEffect } from 'react';

import { ReactSortable } from 'react-sortablejs';

interface Props {
    list: any;
    hideLines: boolean;
    setList: Function;
    onChangeWords: (words: Array<string>) => void;
    setVideoPlaying: ( x: boolean ) => void;
    currentLineStart: number;
    lineProgress: number;
}

const HtmlEditor: FC<Props> = ({ list, setList, hideLines, onChangeWords, currentLineStart, lineProgress, setVideoPlaying }) => {

    const rootRef = createRef<HTMLDivElement>();

    const handleSortableChange = () => onChangeWords(rootRef.current?.innerText.split(/[\n\r]/g) ?? []);

    // useEffect(() => {
    //     console.log(currentLineStart);
    //     console.log(lineProgress);
    // }, [lineProgress])

    return (
        <div
            ref={rootRef}
            contentEditable
            suppressContentEditableWarning
            className={`focus:outline-none ${hideLines && 'hide-lines'}`}
            onFocus={() => setVideoPlaying( false )}
        >
        {/* <span
            style={{ 
                background: 'green',
                width: '2em',
                height: '2em',
                position: 'absolute'
            }}
        /> */}
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
                        // style={item?.type === 'spacer' ? {
                        //     width: '3px',
                        // } : undefined
                        // }
                        style={{ 
                            color: `${(item?.Offset/10000 < currentLineStart + lineProgress) && (item?.Offset/10000 + item?.Duration/10000 > currentLineStart + lineProgress)? 'green' : 'inherit'}`,
                            width: `${item?.type === 'spacer' ? '3px' : ''}`, 
                        }}
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
