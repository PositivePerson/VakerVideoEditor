import React from 'react';
import { IEditorTextStyles } from '~/redux/editor/editor.reducer';
import getCssPropertiesFromStyleConfiguration from '~/components/Editor/style-editor/getCssPropertiesFromStyleConfiguration';

interface IHeadlinePreviewProps {
    headline: string;
    style: IEditorTextStyles;
}

const HeadlinePreview: React.FunctionComponent<IHeadlinePreviewProps> = ({ headline, style }) => (
    <div
        className={`p-2 opacity-90`}
        style={getCssPropertiesFromStyleConfiguration(style)}
    >
        {headline}
    </div>
);

export default HeadlinePreview;
