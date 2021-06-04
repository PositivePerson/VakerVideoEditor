import React from 'react';

interface IVideoProgressBarProps {
    percent: number;
    backgroundColor?: string;
    progressColor?: string;
    borderRadius?: number;
}

const VideoProgressBar: React.FC<IVideoProgressBarProps> = ({
    percent,
    backgroundColor = '#D5D5D5',
    progressColor = '#43597D',
    borderRadius = 0,
}) => (
    <div
        className="h-4"
        style={{
            borderRadius: `${borderRadius}px`,
            backgroundColor: backgroundColor,
        }}
        role="progressbar"
    >
        <div
            className="h-4 text-center"
            style={{
                width: `${percent}%`,
                borderRadius: `${borderRadius}px`,
                backgroundColor: progressColor,
            }}
        >
        </div>
    </div>
);

export default VideoProgressBar;
