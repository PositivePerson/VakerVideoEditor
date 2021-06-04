import React, { useCallback, useState } from 'react';
import { IEditorLogo } from '~/redux/editor/editor.reducer';
import { useDispatch } from 'react-redux';
import { setVideoLogoPosition, setVideoLogoSize } from '~/redux/editor/editor.actions';
import DraggableResizableComponent from '~/components/ui/DraggableResizableComponent';

interface IVideoLogoProps {
    file: NonNullable<IEditorLogo['file']>;
    blobData: NonNullable<IEditorLogo['blobData']>;
    size: NonNullable<IEditorLogo['size']>;
    position: NonNullable<IEditorLogo['position']>;
}

const VideoLogo: React.FC<IVideoLogoProps> = ({ blobData, size, position }) => {

    const dispatch = useDispatch();

    const [currentLogoPosition, setLogoPosition] = useState<{ x: number, y: number }>(position);
    const [currentLogoSize, setLogoSize] = useState(size);

    const onDragged = useCallback(position => {
        setLogoPosition(position);

        dispatch(setVideoLogoPosition(position));
    }, []);

    const onResize = useCallback(size => {
        setLogoSize(size);
        setLogoPosition(position);

        dispatch(setVideoLogoSize(size))
        dispatch(setVideoLogoPosition(position));
    }, []);

    return (
        <DraggableResizableComponent
            initialSize={currentLogoSize}
            initialPosition={currentLogoPosition}
            onDragged={onDragged}
            onResize={onResize}
        >
            <img
                src={blobData}
                draggable={false}
            />
        </DraggableResizableComponent>
    );
};

export default VideoLogo;
