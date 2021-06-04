import React, { ReactElement, useCallback } from 'react';
import { Position, ResizableDelta, Rnd } from 'react-rnd';
import { DraggableData, DraggableEvent } from 'react-draggable';
import { ResizeDirection } from 're-resizable';
import DraggableResizableComponentEdgeHandle from '~/components/ui/DraggableResizableComponentEdgeHandle';

interface Size {
    width: number | 'auto';
    height: number | 'auto';
}

interface IDraggableResizableComponentProps {
    initialSize: Size;
    initialPosition: Position;
    children: ReactElement | Array<ReactElement>;
    onResize: (size: Size) => void;
    onDragged: (position: Position) => void;
}

const DraggableResizableComponent: React.FC<IDraggableResizableComponentProps> = ({
    initialSize,
    initialPosition,
    children,
    onDragged,
    onResize
}) => {

    const getNumberFromStyleValue = (value: string): number => {
        return parseInt(value.replace(/(px|%)$/, ''), 10);
    }

    const onDragStop = useCallback((event: DraggableEvent, draggableData: DraggableData) => {
        onDragged(draggableData);
    }, []);

    const onResizeStop = useCallback(
        (event: MouseEvent | TouchEvent, resizeDirection: ResizeDirection, elementRef: HTMLElement, delta: ResizableDelta, position: Position) => {
            onResize({ width: getNumberFromStyleValue(elementRef.style.width), height: getNumberFromStyleValue(elementRef.style.height) });
            onDragged(position);
        },
        []
    );

    return (
        <Rnd
            size={initialSize}
            position={initialPosition}
            bounds="parent"
            lockAspectRatio={true}
            resizeHandleComponent={{
                topLeft: <DraggableResizableComponentEdgeHandle edge="topLeft" />,
                topRight: <DraggableResizableComponentEdgeHandle edge="topRight" />,
                bottomLeft: <DraggableResizableComponentEdgeHandle edge="bottomLeft" />,
                bottomRight: <DraggableResizableComponentEdgeHandle edge="bottomRight" />,
            }}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
        >
            {children}
        </Rnd>
    );
};

export default DraggableResizableComponent;
