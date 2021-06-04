import { NodeCue, NodeList, parseSync, stringifySync } from 'subtitle';
import { ITranslationWord } from '~/redux/editor/editor.reducer';

const generateVttNodeList = (rawData: Array<ITranslationWord>): NodeList => {

    // TODO: Find the correct format of these durations
    const TIME_MULTIPLIER = 10000;

    const generateCueNode = (words: Array<ITranslationWord>, startOffset: number): NodeCue => {
        const textLine = words.map(word => word.Word).join(' ');
        const duration = words.reduce((sum, word) => sum + (word?.Duration ?? 0), 0);

        return {
            type: 'cue',
            data: {
                text: textLine,
                start: startOffset,
                end: startOffset + (duration / TIME_MULTIPLIER),
            }
        }
    };

    const nodeList: NodeList = [
        {
            type: 'header',
            data: 'WebVTT',
        }
    ];

    const sectionParts = new Array<ITranslationWord>();
    let currentOffset = 0;
    for (const entry of rawData) {
        if (entry.type === 'spacer') {
            if (sectionParts.length === 0) {
                continue;
            }

            const cueNode = generateCueNode(sectionParts, currentOffset);

            nodeList.push(cueNode);

            currentOffset = cueNode.data.end;
            sectionParts.splice(0);

            continue;
        }

        sectionParts.push(entry);
    }

    if (sectionParts.length > 0) {
        const cueNode = generateCueNode(sectionParts, currentOffset);

        nodeList.push(cueNode);
    }

    return nodeList;
};

const generateSrtUsingSubtitles = (rawData: Array<ITranslationWord>) => {

    const nodeList = generateVttNodeList(rawData);

    const vttData = stringifySync(nodeList, { format: 'WebVTT' });

    return vttData.replace(/^WebVTT/, 'WEBVTT');
};

export default generateSrtUsingSubtitles;

export {
    generateVttNodeList,
};
