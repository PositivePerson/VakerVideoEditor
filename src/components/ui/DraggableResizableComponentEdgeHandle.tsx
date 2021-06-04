import styles from './DraggableResizableComponentEdgeHandle.module.css';

import React from 'react';
import clsx from 'clsx';

interface IDraggableResizableComponentEdgeHandleProps {
    edge: "topRight" | "bottomRight" | "bottomLeft" | "topLeft";
}

const DraggableResizableComponentEdgeHandle: React.FC<IDraggableResizableComponentEdgeHandleProps> = ({ edge }) => (
    <div className={clsx(styles.draggableResizableComponent, styles[edge])} />
);

export default DraggableResizableComponentEdgeHandle;
