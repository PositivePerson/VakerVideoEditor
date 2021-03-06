import React, { createRef, FC, useEffect, useRef, useState } from 'react';

import { ReactSortable } from 'react-sortablejs';

// const useElementOnScreen = (options: object, containerRef: any) => {
//     // const containerRef = useRef(null)
//     const [isInView, setIsInView] = useState(false)

//     const callbackFunction = (entries: any) => {
//         const [entry] = entries;
//         setIsInView(entry.isIntersecting);
//     }

//     useEffect(() => {

//         const observer = new IntersectionObserver(callbackFunction, options)
//         if (containerRef.current) observer.observe(containerRef.current)

//         return () => {
//             if (containerRef.current) observer.unobserve(containerRef.current)
//         }
//     }, [containerRef, options])

//     return [isInView]
// }

interface Props {
    list: any;
    hideLines: boolean;
    setList: Function;
    onChangeWords: (words: Array<string>) => void;
    setVideoPlaying: (x: boolean) => void;
    currentLineStart: number;
    lineProgress: number;
    textFieldRef: any;
}

const HtmlEditor: FC<Props> = ({ list, setList, hideLines, onChangeWords, currentLineStart, lineProgress, setVideoPlaying, textFieldRef }) => {

    const [currentWordId, setCurrentWordId] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [helperBackgroundAlert, setHelperBackgroundAlert] = useState(false);

    const rootRef = createRef<HTMLDivElement>();
    const currentWordRef = useRef<any>({
        current: {
            offsetLeft: 0,
            offsetTop: 0,
            offsetWidth: 0
        }
    });
    const helperRef = useRef<HTMLSpanElement>(null);

    // ----------------------------------
    // const containerRef = useRef(null)
    const [isInView, setIsInView] = useState(false)

    const callbackFunction = (entries: any) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting);
        console.log("entries: ", entries);
    }
    const options = {
        root: textFieldRef.current,
        rootMargin: "30px",
        threshold: 1.0
    }

    useEffect(() => {

        const observer = new IntersectionObserver(callbackFunction, options)
        if (helperRef.current) observer.observe(helperRef.current)

        console.log("typeof(helperRef): ", typeof (helperRef), helperRef)

        return () => {
            if (helperRef.current) observer.unobserve(helperRef.current)
        }
    }, [helperRef, options])

    useEffect(() => {
        console.log(isInView);
        if (!isInView) {
            setHelperBackgroundAlert(true);
        } else if (isInView) {
            setTimeout(() => {
                setHelperBackgroundAlert(false);
            }, 1000)
        }
    }, [isInView])
    //   ----------------------------------

    // // --------------------
    // const [isInView] = useElementOnScreen({
    //     root: textFieldRef.current,
    //     rootMargin: "0px",
    //     threshold: 1.0
    // }, currentWordRef)

    // useEffect(() => {
    //     console.log(isInView);
    //     console.log("currentWordRef: ", currentWordRef);
    //     console.log("textFieldRef: ", textFieldRef);
    //     if (!isInView) {
    //         setHelperBackgroundAlert(true);
    //     } else if (isInView) {
    //         setTimeout(() => {
    //             setHelperBackgroundAlert(false);
    //         }, 500)
    //     }
    // }, [isInView])

    // // --------------------

    const handleSortableChange = () => onChangeWords(rootRef.current?.innerText.split(/[\n\r]/g) ?? []);

    useEffect(() => {
        console.log("HTMLEditor ref width: ", rootRef.current?.getBoundingClientRect().width);
        // console.log("Current moment in ms: ", currentLineStart + lineProgress);
        console.log("Subtitles full duration in ms: ", (list[list.length - 1].Duration + list[list.length - 1].Offset) / 1000);
    }, [])

    // useEffect(() => {
    //     console.log((currentLineStart + lineProgress) * 10 / ((list[list.length - 1].Duration + list[list.length - 1].Offset) / 1000));
    //     console.log("currentWordRef: ", currentWordRef);
    // }, [(currentLineStart + lineProgress) * 10 / ((list[list.length - 1].Duration + list[list.length - 1].Offset) / 1000)])

    // Match (/filter) current word by comparing time and set its id in state 
    useEffect(() => {
        const filteredList = list.filter((item: any) =>
            (item?.Offset / 10000 < currentLineStart + lineProgress) && (item?.Offset / 10000 + item?.Duration / 10000 > currentLineStart + lineProgress)
        );
        console.log("filteredList[0]: ", filteredList[0]);
        console.log("currentLineStart + lineProgress: ", currentLineStart + lineProgress);
        if (filteredList.length === 1 && currentWordId !== filteredList[0].id) {
            setCurrentWordId(
                filteredList[0].id
            )
        }

        console.log(currentWordRef)
    }, [lineProgress])

    useEffect(() => {
        if (currentWordId === list.length - 2) {
            setCurrentWordId(
                currentWordId + 1
            )
        }
    }, [currentWordId])

    return (
        <div
            ref={rootRef}
            contentEditable
            suppressContentEditableWarning
            className={`relative focus:outline-none ${hideLines && 'hide-lines'}`}
            onFocus={() => setVideoPlaying(false)}
        >
            <span
                style={{
                    background: `${helperBackgroundAlert ? '#f87171' : '#E8F1F6'}`,
                    // background: '#F5FAFE',
                    width: `${currentWordRef.current.offsetWidth}px`,
                    left: `${currentWordRef.current.offsetLeft}px`,
                    top: `${currentWordRef.current.offsetTop}px`,
                    // height: '2rem',
                    // position: 'absolute',
                    // transition: 'all 100ms'
                }}
                className={`transition-all duration-300 h-6 absolute rounded z-0 ${isVisible ? '' : 'opacity-0'}`}
                ref={helperRef}
            />
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
                        className={`focus:outline-none whitespace-nowrap z-10 ${item?.type === 'spacer' ? 'spacer bg-[#000000] cursor-pointer' : 'mx-1'}`}
                        // ref={   (index === 0 ||
                        //         (item?.Offset/10000 < currentLineStart + lineProgress) && (item?.Offset/10000 + item?.Duration/10000 > currentLineStart + lineProgress))
                        //         && item?.type !== 'spacer' ? currentWordRef : null}
                        ref={item.id === currentWordId ? currentWordRef : null}
                        // ref={item.id === currentWordId ? helperRef : null}
                        // style={item?.type === 'spacer' ? {
                        //     width: '3px',
                        // } : undefined
                        // }
                        style={{
                            // color: `${(item?.Offset / 10000 < currentLineStart + lineProgress) && (item?.Offset / 10000 + item?.Duration / 10000 > currentLineStart + lineProgress) ? 'green' : 'inherit'}`,
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
