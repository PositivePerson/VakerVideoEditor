import { NodeList } from 'subtitle';
import { ISubtitleTrack } from '~/components/Editor/subtitle-track-editor/SubtitleTrackEditor';

const generateSubtitleTracks = (nodes: NodeList): Array<ISubtitleTrack> => {

    const tracks = new Array<ISubtitleTrack>();

    for (const node of nodes) {
        if (node.type !== 'cue') {
            continue;
        }

        tracks.push({
            start: node.data.start / 1000,
            duration: (node.data.end - node.data.start) / 1000,
            text: node.data.text,
        })
    }

    return tracks;
}

export default generateSubtitleTracks;
