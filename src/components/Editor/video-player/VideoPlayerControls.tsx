import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { MdReplay, MdVolumeUp, MdVolumeOff, MdPause } from 'react-icons/md'

interface IVideoPlayerControlsProps {
    isPlaying: boolean;
    isMuted: boolean;
    onPlayToggle: () => void;
    onVolumeToggle: () => void;
    onSeekBackward: () => void;
    onSeekForward: () => void;
    onPlaybackRateChange: (rate: number) => void;
}

const VideoPlayerControls: React.FC<IVideoPlayerControlsProps> =
    ({
        isPlaying,
        isMuted,
        onPlayToggle,
        onVolumeToggle,
        onSeekBackward,
        onSeekForward,
        onPlaybackRateChange,
    }) => {

        const playbackRateValues = [0.5, 1, 1.25, 1.5, 2];
        const [playbackIndex, setplaybackIndex] = useState(1);

        const handlePlaybackIndexChange = () => {
            setplaybackIndex(prev => prev < playbackRateValues.length - 1 ? prev + 1 : 0)
        }

        const keydownListener = (e: KeyboardEvent) => {
            if (e.target === document.querySelector('body') && !e.repeat) {
                switch (e.key) {
                    case "ArrowRight":
                        e.preventDefault()
                        onSeekForward()
                        break;
                    case "ArrowLeft":
                        e.preventDefault()
                        onSeekBackward()
                        break;
                    case " ":
                        e.preventDefault()
                        onPlayToggle()
                        break;
                    default:
                        break;
                }
            }
            
        }

        useEffect(() => {  
            document.addEventListener("keydown", keydownListener, true);
  
            return () => {
                document.removeEventListener("keydown", keydownListener, true)
            };
        }, [keydownListener]);
   
          
          

        useEffect(() => {
            onPlaybackRateChange(playbackRateValues[playbackIndex])
        }, [playbackIndex])
        
        return (
        <>
            <button
                className="videoplayer-action-btn text-font-icon hover:text-font-2 focus:outline-none"
                onClick={onVolumeToggle}
            >
                {isMuted ? <MdVolumeOff size={25} /> : <MdVolumeUp size={25} />}
            </button>
            <button
                className="videoplayer-action-btn text-font-icon hover:text-font-2 focus:outline-none focus:ring-1 px-1 focus:ring-gray-300 focus:rounded relative"
                onClick={onSeekBackward}
            >
                <MdReplay size={25} />
                <span className="absolute top-[10px] right-[15px] text-[6px] font-extrabold">5</span>
            </button>
            <button
                className="videoplayer-action-btn rounded-full hover:opacity-80 focus:outline-none"
                onClick={onPlayToggle}
            >
                { isPlaying 
                    ? <div className="bg-main p-2 text-white rounded-full"><MdPause size={34} /></div>
                    : <img src="/assets/editor/play-button.svg" height="50px" width="50px" className="" />
                }
            </button>
            <button
                className="videoplayer-action-btn text-font-icon hover:text-font-2 focus:outline-none relative"
                onClick={onSeekForward}
            >
                <MdReplay size={25} className="transform scale-x-[-1]" /> 
                <span className="absolute top-[10px] left-[10px] text-[6px] font-extrabold">5</span>
            </button>

            <button 
                className="videoplayer-action-btn w-5 text-font-icon hover:text-font-2 font-extrabold text-lg focus:outline-none"
                onClick={handlePlaybackIndexChange}
            >
                x{ playbackRateValues[playbackIndex] }
            </button>
        </>
    )};

export default VideoPlayerControls;
