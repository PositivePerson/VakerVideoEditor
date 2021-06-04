import {
    CURRENT_TRANSLATIONS,
    RESET_VIDEO_LOGO,
    SET_SETTINGS,
    SET_SUBTITLES,
    SET_VIDEO_LOGO,
    SET_VIDEO_LOGO_POSITION,
    SET_VIDEO_LOGO_SIZE
} from '~/redux/editor/editor.types'
import { ITranslationWord, IVideoTranslation } from '~/redux/editor/editor.reducer';
import { generateVttNodeList } from '~/utils/generateVttFile';

export const setCurrentTranslation = (currentVideoTranslation: IVideoTranslation) => {
    return {
        type: CURRENT_TRANSLATIONS,
        currentVideoTranslation,
    }
}

export const setSettings = (configKey: string, name: string, value: string | number | boolean) => {
    return {
        type: SET_SETTINGS,
        configKey,
        name,
        value,
    }
}

export const setSubtitles = (subtitles: Array<ITranslationWord>) => {
    return {
        type: SET_SUBTITLES,
        subtitles: generateVttNodeList(subtitles),
    }
}

export const setVideoLogo = (logo: File, blobData: string) => {
    return {
        type: SET_VIDEO_LOGO,
        logo,
        blobData,
    }
}

export const setVideoLogoSize = (size: { width: number | 'auto', height: number | 'auto' }) => {
    return {
        type: SET_VIDEO_LOGO_SIZE,
        size,
    }
}

export const setVideoLogoPosition = (position: { x: number, y: number }) => {
    return {
        type: SET_VIDEO_LOGO_POSITION,
        position,
    }
}

export const resetVideoLogo = () => {
    return {
        type: RESET_VIDEO_LOGO,
    }
}
