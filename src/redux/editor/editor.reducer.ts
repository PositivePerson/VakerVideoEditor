/* eslint-disable max-len */
import { NodeList } from 'subtitle';
import {
    CURRENT_TRANSLATIONS, RESET_VIDEO_LOGO,
    SET_SETTINGS,
    SET_SUBTITLES,
    SET_VIDEO_LOGO, SET_VIDEO_LOGO_POSITION,
    SET_VIDEO_LOGO_SIZE,
} from '~/redux/editor/editor.types';
import { CSSProperties } from 'react';
import { cloneDeep } from 'lodash';

// Some types, extracted from the initial data, based on Azure speech service I guess
export interface ITranslationWord {
    id?: number;
    Word?: string | number;
    Duration?: number;
    Offset?: string | number;
    type?: string;
}

interface ITranslationMatch {
    Confidence: number,
    Lexical: string,
    ITN: string,
    MaskedITN: string,
    Display: string,
    Words: Array<ITranslationWord>;
}

export interface IVideoTranslation {
    id: string;
    displayText: string;
    recognitionStatus: string;
    offset: number;
    duration: number;
    NBest: Array<ITranslationMatch>;
}

export interface IEditorTextStyles {
    active: boolean;
    font: string;
    fontSize: number;
    fontColor: string;
    backgroundActive: boolean;
    backgroundColor: string;
    borderRounded: number;
    textDecoration?: CSSProperties["textDecoration"];
    fontStyle?: CSSProperties["fontStyle"];
    fontType?: CSSProperties["fontWeight"];
    textTransform?: CSSProperties["textTransform"];
    textAlign?: CSSProperties["textAlign"];
}

export interface IEditorHeadlineStyles extends IEditorTextStyles {
    headline: string;
}

export interface IEditorKaraokeStyles {
    active: boolean;
    fontColor: string;
}

export interface IEditorProgressBarStyles {
    active: boolean;
    backgroundColor: string;
    borderRounded: number;
    progressColor?: string;
}

export interface IEditorLogo {
    file: File | null;
    blobData: string | null;
    size: {
        width: number | 'auto';
        height: number | 'auto';
    };
    position: {
        x: number,
        y: number,
    }
}

export interface IEditorState {
    currentVideoTranslation: IVideoTranslation;
    subtitles: NodeList;
    styles: {
        subtitle: IEditorTextStyles,
        karaoke: IEditorKaraokeStyles,
        headline: IEditorHeadlineStyles,
        progress: IEditorProgressBarStyles
    };
    logo: IEditorLogo;
}

type EditorStyleName = keyof IEditorState["styles"];

const defaultSubtitleTextStyles: IEditorTextStyles = {
    active: false,
    font: "arial",
    fontSize: 14,
    fontColor: '#000000',
    backgroundActive: false,
    borderRounded: 0,
    backgroundColor: 'transparent',
};

const defaultKaraokeTextStyles: IEditorKaraokeStyles = {
    active: false,
    fontColor: '#cbbb00',
};

const defaultHeadlineTextStyles: IEditorHeadlineStyles = {
    active: false,
    headline: "Add Headline",
    font: "arial",
    fontSize: 14,
    fontColor: '#000000',
    backgroundActive: false,
    borderRounded: 0,
    backgroundColor: 'transparent',
};

const defaultProgressBarStyles: IEditorProgressBarStyles = {
    active: false,
    backgroundColor: '#dc6911',
    borderRounded: 0,
    progressColor: '#43597D',
};

const defaultVideoLogo: IEditorLogo = {
    file: null,
    blobData: null,
    size: {
        width: 100,
        height: 'auto',
    },
    position: {
        x: 0,
        y: 0,
    }
}

const initialState: IEditorState = {
    currentVideoTranslation: {
        id: 'ba580e56b4ec4ebf827cffeb87be995a',
        recognitionStatus: 'Success',
        offset: 800000,
        duration: 173800000,
        displayText: 'We haven\'t perfected the current lithium ion batteries in electric cars yet, but in spite of that, or maybe because of it were already in the hunt to replace those, and that\'s where the solid state battery comes in. Let\'s find out why people are so excited about it, what the hurdles are and who\'s chasing it.',
        NBest: [
            {
                Confidence: 0.88248944,
                Lexical: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                ITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                MaskedITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                Display: 'We haven\'t perfected the current lithium ion batteries in electric cars yet, but in spite of that, or maybe because of it were already in the hunt to replace those, and that\'s where the solid state battery comes in. Let\'s find out why people are so excited about it, what the hurdles are and who\'s chasing it.',
                Words: [
                    {
                        Word: 'we',
                        Offset: 800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'haven\'t',
                        Offset: 3600000,
                        Duration: 3000000,
                    },
                    {
                        Word: 'perfected',
                        Offset: 6700000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'the',
                        Offset: 12700000,
                        Duration: 1000000,
                    },
                    {
                        Word: 'current',
                        Offset: 13800000,
                        Duration: 3500000,
                    },
                    {
                        Word: 'lithium',
                        Offset: 17400000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'ion',
                        Offset: 21800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'batteries',
                        Offset: 24600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'in',
                        Offset: 29400000,
                        Duration: 700000,
                    },
                    {
                        Word: 'electric',
                        Offset: 30200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'cars',
                        Offset: 34000000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'yet',
                        Offset: 37800000,
                        Duration: 2300000,
                    },
                    {
                        Word: 'but',
                        Offset: 40200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'in',
                        Offset: 44200000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'spite',
                        Offset: 46200000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'of',
                        Offset: 49000000,
                        Duration: 700000,
                    },
                    {
                        Word: 'that',
                        Offset: 49800000,
                        Duration: 3300000,
                    },
                    {
                        Word: 'or',
                        Offset: 53400000,
                        Duration: 1700000,
                    },
                    {
                        Word: 'maybe',
                        Offset: 55200000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'because',
                        Offset: 57100000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'of',
                        Offset: 61400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'it',
                        Offset: 62400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'were',
                        Offset: 66600000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'already',
                        Offset: 70400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'in',
                        Offset: 74400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'the',
                        Offset: 75600000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hunt',
                        Offset: 76600000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'to',
                        Offset: 81100000,
                        Duration: 1400000,
                    },
                    {
                        Word: 'replace',
                        Offset: 82600000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'those',
                        Offset: 88600000,
                        Duration: 7800000,
                    },
                    {
                        Word: 'and',
                        Offset: 96700000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'that\'s',
                        Offset: 98600000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'where',
                        Offset: 101400000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'the',
                        Offset: 102700000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'solid',
                        Offset: 104000000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'state',
                        Offset: 108800000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'battery',
                        Offset: 113200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'comes',
                        Offset: 117800000,
                        Duration: 3400000,
                    },
                    {
                        Word: 'in',
                        Offset: 121300000,
                        Duration: 3800000,
                    },
                    {
                        Word: 'let\'s',
                        Offset: 125400000,
                        Duration: 3100000,
                    },
                    {
                        Word: 'find',
                        Offset: 128600000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'out',
                        Offset: 131600000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'why',
                        Offset: 133600000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'people',
                        Offset: 135200000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'are',
                        Offset: 137400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'so',
                        Offset: 138400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'excited',
                        Offset: 139600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'about',
                        Offset: 144400000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'it',
                        Offset: 147400000,
                        Duration: 2200000,
                    },
                    {
                        Word: 'what',
                        Offset: 149900000,
                        Duration: 3200000,
                    },
                    {
                        Word: 'the',
                        Offset: 153200000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hurdles',
                        Offset: 154200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'are',
                        Offset: 158200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'and',
                        Offset: 162400000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'who\'s',
                        Offset: 164000000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'chasing',
                        Offset: 166200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'it',
                        Offset: 170800000,
                        Duration: 3800000,
                    },
                ],
            },
            {
                Confidence: 0.88158166,
                Lexical: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                ITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                MaskedITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                Display: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who\'s chasing it',
                Words: [
                    {
                        Word: 'we',
                        Offset: 800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'haven\'t',
                        Offset: 3600000,
                        Duration: 3000000,
                    },
                    {
                        Word: 'perfected',
                        Offset: 6700000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'the',
                        Offset: 12700000,
                        Duration: 1000000,
                    },
                    {
                        Word: 'current',
                        Offset: 13800000,
                        Duration: 3500000,
                    },
                    {
                        Word: 'lithium',
                        Offset: 17400000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'ion',
                        Offset: 21800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'batteries',
                        Offset: 24600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'in',
                        Offset: 29400000,
                        Duration: 700000,
                    },
                    {
                        Word: 'electric',
                        Offset: 30200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'cars',
                        Offset: 34000000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'yet',
                        Offset: 37800000,
                        Duration: 2300000,
                    },
                    {
                        Word: 'but',
                        Offset: 40200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'in',
                        Offset: 44200000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'spite',
                        Offset: 46200000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'of',
                        Offset: 49000000,
                        Duration: 700000,
                    },
                    {
                        Word: 'that',
                        Offset: 49800000,
                        Duration: 3300000,
                    },
                    {
                        Word: 'or',
                        Offset: 53400000,
                        Duration: 1700000,
                    },
                    {
                        Word: 'maybe',
                        Offset: 55200000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'because',
                        Offset: 57100000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'of',
                        Offset: 61400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'it',
                        Offset: 62400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'we\'re',
                        Offset: 66600000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'already',
                        Offset: 70400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'in',
                        Offset: 74400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'the',
                        Offset: 75600000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hunt',
                        Offset: 76600000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'to',
                        Offset: 81100000,
                        Duration: 1400000,
                    },
                    {
                        Word: 'replace',
                        Offset: 82600000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'those',
                        Offset: 88600000,
                        Duration: 7800000,
                    },
                    {
                        Word: 'and',
                        Offset: 96700000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'that\'s',
                        Offset: 98600000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'where',
                        Offset: 101400000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'the',
                        Offset: 102700000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'solid',
                        Offset: 104000000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'state',
                        Offset: 108800000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'battery',
                        Offset: 113200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'comes',
                        Offset: 117800000,
                        Duration: 3400000,
                    },
                    {
                        Word: 'in',
                        Offset: 121300000,
                        Duration: 3800000,
                    },
                    {
                        Word: 'let\'s',
                        Offset: 125400000,
                        Duration: 3100000,
                    },
                    {
                        Word: 'find',
                        Offset: 128600000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'out',
                        Offset: 131600000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'why',
                        Offset: 133600000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'people',
                        Offset: 135200000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'are',
                        Offset: 137400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'so',
                        Offset: 138400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'excited',
                        Offset: 139600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'about',
                        Offset: 144400000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'it',
                        Offset: 147400000,
                        Duration: 2200000,
                    },
                    {
                        Word: 'what',
                        Offset: 149900000,
                        Duration: 3200000,
                    },
                    {
                        Word: 'the',
                        Offset: 153200000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hurdles',
                        Offset: 154200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'are',
                        Offset: 158200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'and',
                        Offset: 162400000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'who\'s',
                        Offset: 164000000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'chasing',
                        Offset: 166200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'it',
                        Offset: 170800000,
                        Duration: 3800000,
                    },
                ],
            },
            {
                Confidence: 0.88303846,
                Lexical: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                ITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                MaskedITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                Display: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                Words: [
                    {
                        Word: 'we',
                        Offset: 800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'haven\'t',
                        Offset: 3600000,
                        Duration: 3000000,
                    },
                    {
                        Word: 'perfected',
                        Offset: 6700000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'the',
                        Offset: 12700000,
                        Duration: 1000000,
                    },
                    {
                        Word: 'current',
                        Offset: 13800000,
                        Duration: 3500000,
                    },
                    {
                        Word: 'lithium',
                        Offset: 17400000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'ion',
                        Offset: 21800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'batteries',
                        Offset: 24600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'in',
                        Offset: 29400000,
                        Duration: 700000,
                    },
                    {
                        Word: 'electric',
                        Offset: 30200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'cars',
                        Offset: 34000000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'yet',
                        Offset: 37800000,
                        Duration: 2300000,
                    },
                    {
                        Word: 'but',
                        Offset: 40200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'in',
                        Offset: 44200000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'spite',
                        Offset: 46200000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'of',
                        Offset: 49000000,
                        Duration: 700000,
                    },
                    {
                        Word: 'that',
                        Offset: 49800000,
                        Duration: 3300000,
                    },
                    {
                        Word: 'or',
                        Offset: 53400000,
                        Duration: 1700000,
                    },
                    {
                        Word: 'maybe',
                        Offset: 55200000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'because',
                        Offset: 57100000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'of',
                        Offset: 61400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'it',
                        Offset: 62400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'were',
                        Offset: 66600000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'already',
                        Offset: 70400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'in',
                        Offset: 74400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'the',
                        Offset: 75600000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hunt',
                        Offset: 76600000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'to',
                        Offset: 81100000,
                        Duration: 1400000,
                    },
                    {
                        Word: 'replace',
                        Offset: 82600000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'those',
                        Offset: 88600000,
                        Duration: 7800000,
                    },
                    {
                        Word: 'and',
                        Offset: 96700000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'that\'s',
                        Offset: 98600000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'where',
                        Offset: 101400000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'the',
                        Offset: 102700000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'solid',
                        Offset: 104000000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'state',
                        Offset: 108800000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'battery',
                        Offset: 113200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'comes',
                        Offset: 117800000,
                        Duration: 3400000,
                    },
                    {
                        Word: 'in',
                        Offset: 121300000,
                        Duration: 3800000,
                    },
                    {
                        Word: 'let\'s',
                        Offset: 125400000,
                        Duration: 3100000,
                    },
                    {
                        Word: 'find',
                        Offset: 128600000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'out',
                        Offset: 131600000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'why',
                        Offset: 133600000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'people',
                        Offset: 135200000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'are',
                        Offset: 137400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'so',
                        Offset: 138400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'excited',
                        Offset: 139600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'about',
                        Offset: 144400000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'it',
                        Offset: 147400000,
                        Duration: 2200000,
                    },
                    {
                        Word: 'what',
                        Offset: 149900000,
                        Duration: 3200000,
                    },
                    {
                        Word: 'the',
                        Offset: 153200000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hurdles',
                        Offset: 154200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'are',
                        Offset: 158200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'and',
                        Offset: 162400000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'who',
                        Offset: 164000000,
                        Duration: 900000,
                    },
                    {
                        Word: 'is',
                        Offset: 165000000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'chasing',
                        Offset: 166200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'it',
                        Offset: 170800000,
                        Duration: 3800000,
                    },
                ],
            },
            {
                Confidence: 0.88213074,
                Lexical: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                ITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                MaskedITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                Display: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it we\'re already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and who is chasing it',
                Words: [
                    {
                        Word: 'we',
                        Offset: 800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'haven\'t',
                        Offset: 3600000,
                        Duration: 3000000,
                    },
                    {
                        Word: 'perfected',
                        Offset: 6700000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'the',
                        Offset: 12700000,
                        Duration: 1000000,
                    },
                    {
                        Word: 'current',
                        Offset: 13800000,
                        Duration: 3500000,
                    },
                    {
                        Word: 'lithium',
                        Offset: 17400000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'ion',
                        Offset: 21800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'batteries',
                        Offset: 24600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'in',
                        Offset: 29400000,
                        Duration: 700000,
                    },
                    {
                        Word: 'electric',
                        Offset: 30200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'cars',
                        Offset: 34000000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'yet',
                        Offset: 37800000,
                        Duration: 2300000,
                    },
                    {
                        Word: 'but',
                        Offset: 40200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'in',
                        Offset: 44200000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'spite',
                        Offset: 46200000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'that',
                        Offset: 49800000,
                        Duration: 3300000,
                    },
                    {
                        Word: 'or',
                        Offset: 53400000,
                        Duration: 1700000,
                    },
                    {
                        Word: 'maybe',
                        Offset: 55200000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'because',
                        Offset: 57100000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'of',
                        Offset: 61400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'it',
                        Offset: 62400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'we\'re',
                        Offset: 66600000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'already',
                        Offset: 70400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'in',
                        Offset: 74400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'the',
                        Offset: 75600000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hunt',
                        Offset: 76600000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'to',
                        Offset: 81100000,
                        Duration: 1400000,
                    },
                    {
                        Word: 'replace',
                        Offset: 82600000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'those',
                        Offset: 88600000,
                        Duration: 7800000,
                    },
                    {
                        Word: 'and',
                        Offset: 96700000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'that\'s',
                        Offset: 98600000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'where',
                        Offset: 101400000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'the',
                        Offset: 102700000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'solid',
                        Offset: 104000000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'state',
                        Offset: 108800000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'battery',
                        Offset: 113200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'comes',
                        Offset: 117800000,
                        Duration: 3400000,
                    },
                    {
                        Word: 'in',
                        Offset: 121300000,
                        Duration: 3800000,
                    },
                    {
                        Word: 'let\'s',
                        Offset: 125400000,
                        Duration: 3100000,
                    },
                    {
                        Word: 'find',
                        Offset: 128600000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'out',
                        Offset: 131600000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'why',
                        Offset: 133600000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'people',
                        Offset: 135200000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'are',
                        Offset: 137400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'so',
                        Offset: 138400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'excited',
                        Offset: 139600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'about',
                        Offset: 144400000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'it',
                        Offset: 147400000,
                        Duration: 2200000,
                    },
                    {
                        Word: 'what',
                        Offset: 149900000,
                        Duration: 3200000,
                    },
                    {
                        Word: 'the',
                        Offset: 153200000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hurdles',
                        Offset: 154200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'are',
                        Offset: 158200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'and',
                        Offset: 162400000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'who',
                        Offset: 164000000,
                        Duration: 900000,
                    },
                    {
                        Word: 'is',
                        Offset: 165000000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'chasing',
                        Offset: 166200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'it',
                        Offset: 170800000,
                        Duration: 3800000,
                    },
                ],
            },
            {
                Confidence: 0.87888104,
                Lexical: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and whose chasing it',
                ITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and whose chasing it',
                MaskedITN: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and whose chasing it',
                Display: 'we haven\'t perfected the current lithium ion batteries in electric cars yet but in spite of that or maybe because of it were already in the hunt to replace those and that\'s where the solid state battery comes in let\'s find out why people are so excited about it what the hurdles are and whose chasing it',
                Words: [
                    {
                        Word: 'we',
                        Offset: 800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'haven\'t',
                        Offset: 3600000,
                        Duration: 3000000,
                    },
                    {
                        Word: 'perfected',
                        Offset: 6700000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'the',
                        Offset: 12700000,
                        Duration: 1000000,
                    },
                    {
                        Word: 'current',
                        Offset: 13800000,
                        Duration: 3500000,
                    },
                    {
                        Word: 'lithium',
                        Offset: 17400000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'ion',
                        Offset: 21800000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'batteries',
                        Offset: 24600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'in',
                        Offset: 29400000,
                        Duration: 700000,
                    },
                    {
                        Word: 'electric',
                        Offset: 30200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'cars',
                        Offset: 34000000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'yet',
                        Offset: 37800000,
                        Duration: 2300000,
                    },
                    {
                        Word: 'but',
                        Offset: 40200000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'in',
                        Offset: 44200000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'spite',
                        Offset: 46200000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'of',
                        Offset: 49000000,
                        Duration: 700000,
                    },
                    {
                        Word: 'that',
                        Offset: 49800000,
                        Duration: 3300000,
                    },
                    {
                        Word: 'or',
                        Offset: 53400000,
                        Duration: 1700000,
                    },
                    {
                        Word: 'maybe',
                        Offset: 55200000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'because',
                        Offset: 57100000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'of',
                        Offset: 61400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'it',
                        Offset: 62400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'were',
                        Offset: 66600000,
                        Duration: 3700000,
                    },
                    {
                        Word: 'already',
                        Offset: 70400000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'in',
                        Offset: 74400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'the',
                        Offset: 75600000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hunt',
                        Offset: 76600000,
                        Duration: 4200000,
                    },
                    {
                        Word: 'to',
                        Offset: 81100000,
                        Duration: 1400000,
                    },
                    {
                        Word: 'replace',
                        Offset: 82600000,
                        Duration: 5900000,
                    },
                    {
                        Word: 'those',
                        Offset: 88600000,
                        Duration: 7800000,
                    },
                    {
                        Word: 'and',
                        Offset: 96700000,
                        Duration: 1800000,
                    },
                    {
                        Word: 'that\'s',
                        Offset: 98600000,
                        Duration: 2700000,
                    },
                    {
                        Word: 'where',
                        Offset: 101400000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'the',
                        Offset: 102700000,
                        Duration: 1200000,
                    },
                    {
                        Word: 'solid',
                        Offset: 104000000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'state',
                        Offset: 108800000,
                        Duration: 4300000,
                    },
                    {
                        Word: 'battery',
                        Offset: 113200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'comes',
                        Offset: 117800000,
                        Duration: 3400000,
                    },
                    {
                        Word: 'in',
                        Offset: 121300000,
                        Duration: 3800000,
                    },
                    {
                        Word: 'let\'s',
                        Offset: 125400000,
                        Duration: 3100000,
                    },
                    {
                        Word: 'find',
                        Offset: 128600000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'out',
                        Offset: 131600000,
                        Duration: 1900000,
                    },
                    {
                        Word: 'why',
                        Offset: 133600000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'people',
                        Offset: 135200000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'are',
                        Offset: 137400000,
                        Duration: 900000,
                    },
                    {
                        Word: 'so',
                        Offset: 138400000,
                        Duration: 1100000,
                    },
                    {
                        Word: 'excited',
                        Offset: 139600000,
                        Duration: 4700000,
                    },
                    {
                        Word: 'about',
                        Offset: 144400000,
                        Duration: 2900000,
                    },
                    {
                        Word: 'it',
                        Offset: 147400000,
                        Duration: 2300000,
                    },
                    {
                        Word: 'what',
                        Offset: 150000000,
                        Duration: 3100000,
                    },
                    {
                        Word: 'the',
                        Offset: 153200000,
                        Duration: 900000,
                    },
                    {
                        Word: 'hurdles',
                        Offset: 154200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'are',
                        Offset: 158200000,
                        Duration: 3900000,
                    },
                    {
                        Word: 'and',
                        Offset: 162400000,
                        Duration: 1500000,
                    },
                    {
                        Word: 'whose',
                        Offset: 164000000,
                        Duration: 2100000,
                    },
                    {
                        Word: 'chasing',
                        Offset: 166200000,
                        Duration: 4500000,
                    },
                    {
                        Word: 'it',
                        Offset: 170800000,
                        Duration: 3800000,
                    },
                ],
            },
        ],
    },
    subtitles: [],
    styles: {
        subtitle: cloneDeep(defaultSubtitleTextStyles),
        karaoke: cloneDeep(defaultKaraokeTextStyles),
        headline: cloneDeep(defaultHeadlineTextStyles),
        progress: cloneDeep(defaultProgressBarStyles),
    },
    logo: cloneDeep(defaultVideoLogo),
}

const ACTION_HANDLERS: any = {
    [CURRENT_TRANSLATIONS]: (state: IEditorState, { currentVideoTranslation }: any) => ({
        ...state,
        currentVideoTranslation,
    }),
    [SET_SETTINGS]: (state: IEditorState, { configKey, name, value }: any) => ({
        ...state,
        styles: {
            ...state?.styles,
            [configKey]: {
                ...(state?.styles || {})[configKey as EditorStyleName],
                [name]: value,
            },
        },
    }),
    [SET_SUBTITLES]: (state: IEditorState, { subtitles }: any) => ({
        ...state,
        subtitles,
    }),
    [SET_VIDEO_LOGO]: (state: IEditorState, { logo, blobData }: any) => ({
        ...state,
        logo: {
            ...state.logo,
            file: logo,
            blobData,
        },
    }),
    [SET_VIDEO_LOGO_SIZE]: (state: IEditorState, { size }: any) => ({
        ...state,
        logo: {
            ...state.logo,
            size,
        },
    }),
    [SET_VIDEO_LOGO_POSITION]: (state: IEditorState, { position }: any) => ({
        ...state,
        logo: {
            ...state.logo,
            position,
        },
    }),
    [RESET_VIDEO_LOGO]: (state: IEditorState) => ({
        ...state,
        logo: cloneDeep(defaultVideoLogo),
    }),
}

export default function editorReducer(state = initialState, action: any) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}

export {
    defaultSubtitleTextStyles,
    defaultKaraokeTextStyles,
    defaultHeadlineTextStyles,
    defaultVideoLogo,
}
