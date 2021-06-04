
/**
 * BBGGRR
 * Prefix and suffix & with a leading H
 *
 * Example:
 *   &H0000FF&
 *   &H<blue>00<green>00<red>FF&
 */
export type SubtitleStyleColorBbGgRr = string;

/**
 * AABBGGRR
 * Prefix and suffix & with a leading H
 *
 * Example:
 *   &H000000FF&
 *   &H<alpha>00<blue>00<green>00<red>FF&
 */
export type SubtitleStyleColorAaBbGgRr = string;

export enum SubtitleBorderStyle {
    /**
     * Outline + drop shadow
     */
    SubtitleBorderStyleOutlineWithShadow = 1,
    /**
     * Opaque box
     */
    SubtitleBorderStyleOpaqueBox = 3,
    test = 4,
}

export enum SubtitleAlignmentStyle {
    BottomLeft = 1,
    BottomCenter = 2,
    BottomRight = 3,
    TopLeft = 5,
    TopCenter = 6,
    TopRight = 7,
    MiddleLeft = 9,
    MiddleCenter = 10,
    MiddleRight = 11,
}

export enum SubtitleStyleBooleanOption {
    True = -1,
    False = 0,
}

/**
 * @link http://www.tcax.org/docs/ass-specs.htm
 * Section 5, Style Lines, [v4+ Styles] section
 */
export interface SubtitleStyleParameters {
    /**
     * The fontname as used by Windows. Case-sensitive
     */
    FontName?: string;
    Fontsize?: number;
    /**
     * This is the colour that a subtitle will normally appear in.
     */
    PrimaryColour?: SubtitleStyleColorAaBbGgRr;
    /**
     * This colour may be used instead of the Primary colour
     * when a subtitle is automatically shifted to prevent an onscreen collsion,
     * to distinguish the different subtitles.
     */
    SecondaryColour?: SubtitleStyleColorAaBbGgRr;
    /**
     * This colour may be used instead of the Primary or Secondary colour
     * when a subtitle is automatically shifted to prevent an onscreen collsion,
     * to distinguish the different subtitles.
     */
    OutlineColor?: SubtitleStyleColorAaBbGgRr;
    /**
     * This is the colour of the subtitle outline or shadow, if these are used.
     */
    BackColour?: SubtitleStyleColorAaBbGgRr;
    /**
     * This defines whether text is bold (true) or not (false). -1 is True, 0 is False.
     * This is independant of the Italic attribute - you can have have text which is both bold and italic.
     */
    Bold?: SubtitleStyleBooleanOption;
    /**
     * This defines whether text is italic (true) or not (false). -1 is True, 0 is False.
     * This is independant of the Bold attribute - you can have have text which is both bold and italic.
     */
    Italic?: SubtitleStyleBooleanOption;
    /**
     * This defines whether text is underline (true) or not (false). -1 is True, 0 is False.
     */
    Underline?: SubtitleStyleBooleanOption;
    /**
     * This defines whether text is striked out (true) or not (false). -1 is True, 0 is False.
     */
    Strikeout?: SubtitleStyleBooleanOption;
    /**
     * Modifies the width of the font in percent (without % sign).
     */
    ScaleX?: number;
    /**
     * Modifies the height of the font in percent (without % sign).
     */
    ScaleY?: number;
    /**
     * Extra space between charactersin pixel.
     */
    Spacing?: number;
    /**
     * The origin of the rotation is defined by the alignment in degrees.
     * Can be a floating point number.
     */
    Angle?: number;
    BorderStyle?: SubtitleBorderStyle;
    /**
     * If BorderStyle is {@link SubtitleBorderStyleOutlineWithShadow},
     * then this specifies the width of the outline around the text, in pixels.
     */
    Outline?: 0 | 1 | 2 | 3 | 4;
    /**
     * If BorderStyle is {@link SubtitleBorderStyleOutlineWithShadow},
     * then this specifies the depth of the drop shadow behind the text, in pixels.
     *
     * Drop shadow is always used in addition to an outline.
     * SSA will force an outline of 1 pixel if no outline width is given
     */
    Shadow?: 0 | 1 | 2 | 3 | 4;
    /**
     * This sets how text is "justified" within the Left/Right onscreen margins,
     * and also the vertical placing.
     */
    Alignment?: SubtitleAlignmentStyle;
    /**
     * This defines the Left Margin in pixels.
     * It is the distance from the left-hand edge of the screen.
     * The three onscreen margins (MarginL, MarginR, MarginV) define areas in which the subtitle text will be displayed.
     */
    MarginL?: number;
    /**
     * This defines the Right Margin in pixels.
     * It is the distance from the right-hand edge of the screen.
     * The three onscreen margins (MarginL, MarginR, MarginV) define areas in which the subtitle text will be displayed.
     */
    MarginR?: number;
    /**
     * This defines the vertical Left Margin in pixels.
     * For a subtitle, it is the distance from the bottom of the screen.
     * For a toptitle, it is the distance from the top of the screen.
     * For a midtitle, the value is ignored - the text will be vertically centred
     */
    MarginV?: number;
}

export type SubtitleStyleParameter = keyof SubtitleStyleParameters;
