import interact from 'interactjs';
import React, { createRef } from 'react';
import { autobind } from 'core-decorators';
import { isEqual } from 'lodash';

export interface ISubtitleTrack {
    start: number;
    duration: number;
    text: string;
}

interface ISubtitleTrackShape {
    x: number;
    width: number;
    text: string;
}

interface ISubtitleTrackEditorProps {
    videoLength: number;
    tracks: Array<ISubtitleTrack>;
}

interface ISubtitleTrackEditorState {
    shapes: Array<ISubtitleTrackShape>;
}

export default class SubtitleTrackEditor extends React.PureComponent<ISubtitleTrackEditorProps, ISubtitleTrackEditorState> {

    public readonly state: ISubtitleTrackEditorState = {
        shapes: [],
    };

    private readonly rootRef = createRef<HTMLDivElement>();

    public componentDidUpdate(
        prevProps: Readonly<ISubtitleTrackEditorProps>,
        prevState: Readonly<ISubtitleTrackEditorState>,
        snapshot?: any
    ): void {
        if (isEqual(this.props.tracks, prevProps.tracks) && this.props.videoLength === prevProps.videoLength) {
            return;
        }

        this.updateTrackShapes();
    }

    public componentDidMount() {

        this.initializeInteractJs();

        this.updateTrackShapes();
    }

    public render(): React.ReactNode {

        return (
            <div
                ref={this.rootRef}
                className="w-full relative h-[80px]"
            >
                {this.state.shapes.map(shape => (
                    <div
                        key={Math.random()}
                        className="track h-[100%] flex content-center justify-center text-center rounded-[12px] bg-[#E8F1F6] p-1 text-xs absolute"
                        data-x={shape.x}
                        style={{
                            transform: `translate(${shape.x}px, 0)`,
                            width: shape.width,
                        }}
                    >
                        {shape.text}
                    </div>
                ))}
            </div>
        );
    }

    @autobind
    private handleResizeMove(event: any) {
        const target = event.target;

        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    @autobind
    private handleDragMove(event: any) {
        const target = event.target;

        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    private initializeInteractJs() {

        interact('.track')
            .resizable({
                edges: { left: true, right: true, bottom: false, top: false },
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                    }),
                    interact.modifiers.restrictSize({
                        min: { width: 30, height: 50 },
                    })
                ],
                listeners: {
                    move: this.handleResizeMove
                }
            })
            .draggable({
                inertia: true,
                startAxis: 'x',
                lockAxis: 'x',
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: false
                    })
                ],
                listeners: {
                    move: this.handleDragMove
                }
            })
    }

    private createTrackShapes(): Array<ISubtitleTrackShape> {

        const {
            tracks,
            videoLength,
        } = this.props;

        const containerWidth = this.rootRef.current?.getBoundingClientRect().width;

        const shapes = new Array<ISubtitleTrackShape>();
        const sortedTracks = tracks.sort((track1, track2) => track1.start - track2.start);

        let shapeOffset = 0;
        for (const track of sortedTracks) {
            const trackWidth = this.calculateTrackWidth(track, videoLength, containerWidth);

            const shape: ISubtitleTrackShape = {
                width: trackWidth,
                x: shapeOffset,
                text: track.text,
            };

            shapeOffset += shape.width;

            shapes.push(shape);
        }

        return shapes;
    }

    private calculateTrackWidth(track: ISubtitleTrack, videoLength: number, containerWidth: number | undefined): number {

        if (!containerWidth) {
            return 100;
        }

        const percentageWidth = track.duration / videoLength;

        console.log(percentageWidth, percentageWidth * containerWidth);

        return percentageWidth * containerWidth;
    }

    private updateTrackShapes() {

        this.setState({
            shapes: this.createTrackShapes(),
        });
    }
}
