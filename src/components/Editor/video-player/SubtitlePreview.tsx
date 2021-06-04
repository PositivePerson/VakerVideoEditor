import React, { ReactElement } from 'react';
import { NodeCue, NodeList } from 'subtitle';
import { connect } from 'react-redux';
import { RootState } from '~/redux/rootStore';
import { IEditorKaraokeStyles, IEditorTextStyles } from '~/redux/editor/editor.reducer';
import getCssPropertiesFromStyleConfiguration from '~/components/Editor/style-editor/getCssPropertiesFromStyleConfiguration';
import styles from './SubtitlePreview.module.css';

interface ISubtitlePreviewProps {
    start: number;

    // Injected props
    subtitles: NodeList;
    subtitleStyle?: IEditorTextStyles;
    karaokeStyle?: IEditorKaraokeStyles;
}

class SubtitlePreview extends React.PureComponent<ISubtitlePreviewProps> {

    public static defaultProps: Partial<ISubtitlePreviewProps> = {
        subtitles: [],
    }

    public render(): React.ReactNode {

        const {
            subtitles,
            start,
            subtitleStyle,
            karaokeStyle,
        } = this.props;

        // Playing time is in seconds, cue time in milliseconds
        const startTimeMilliseconds = start * 1000;

        const subtitleNode = this.getCurrentSubtitleLine(subtitles, startTimeMilliseconds);
        if (subtitleNode === null) {
            return null;
        }

        const subtitleLineText = karaokeStyle?.active
            ? this.getKaraokeStyledText(subtitleNode, startTimeMilliseconds, karaokeStyle.fontColor)
            : subtitleNode.data.text;

        return (
            <div
                className={`p-2 opacity-90`}
                style={getCssPropertiesFromStyleConfiguration(subtitleStyle!)}
            >
                {subtitleLineText}
            </div>
        );
    }

    private getCurrentSubtitleLine(subtitles: NodeList, startTime: number): NodeCue | null {

        for (const node of subtitles) {
            if (node.type !== 'cue') {
                continue;
            }

            if (startTime < node.data.start || startTime > node.data.end) {
                continue;
            }

            return node;
        }

        return null;
    }

    private getKaraokeStyledText(subtitleNode: NodeCue, startTime: number, fontColor: string): Array<string | ReactElement> {

        const words: Array<string | ReactElement> = subtitleNode.data.text
            .split(' ');
        const amountWords = words.length;

        // How long is the current line already shown
        const currentSubtitleLinePlayTime = Math.max(startTime - subtitleNode.data.start, 0);

        // Calculate how long each word will be highlighted
        const subtitleDuration = subtitleNode.data.end - subtitleNode.data.start;
        const highlightDuration = subtitleDuration / amountWords;

        // Calculate the current highlighted index based on the playtime
        const highlightedIndex = Math.max(Math.floor(currentSubtitleLinePlayTime / highlightDuration) - 1, 0);

        // Highlight current word
        words[highlightedIndex] = (
            <>
                <span
                    className={styles.smoothHighlightParent}
                >
                    {words[highlightedIndex]}
                        <span
                            style={{
                                color: fontColor,
                                animationDuration: `${highlightDuration}ms`
                            }}
                            className={styles.smoothHighlightChild}
                        >
                            {words[highlightedIndex]}
                        </span>
                </span>
            </>
        );

        // Keep said words highlighted
        for (let index = 0; index < highlightedIndex; index++) {
            words[index] = (
                <>
                    <span 
                        style={{
                            color: fontColor,
                        }}
                    >
                        {words[index]}
                    </span>
                </>
            );
        }

        // Add back whitespace
        return words.map(word => <>{word} </>);
    }
}

export default connect(
    (state: RootState) => ({
        subtitles: state.editor.subtitles,
        subtitleStyle: state.editor.styles.subtitle,
        karaokeStyle: state.editor.styles.karaoke,
    })
)(SubtitlePreview);
