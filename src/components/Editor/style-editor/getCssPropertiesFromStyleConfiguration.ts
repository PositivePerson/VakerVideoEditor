import { IEditorTextStyles } from '~/redux/editor/editor.reducer';
import { CSSProperties } from 'react';

const getCssPropertiesFromStyleConfiguration = (style: IEditorTextStyles): CSSProperties => ({
    fontFamily: style.font,
    fontSize: `${style.fontSize}px`,
    fontStyle: style.fontStyle,
    fontWeight: style.fontType,
    color: style.fontColor,
    backgroundColor: style.backgroundActive ? style.backgroundColor : 'transparent',
    borderRadius: `${style.borderRounded}px`,
    textDecoration: style.textDecoration,
    textTransform: style.textTransform,
    textAlign: style.textAlign,
});

export default getCssPropertiesFromStyleConfiguration;
