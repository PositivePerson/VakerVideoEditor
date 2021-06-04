/* eslint-disable max-len */
import React, { CSSProperties, FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetVideoLogo, setSettings, setVideoLogo } from '~/redux/editor/editor.actions'
import SelectAdvancedSettings from '~/components/Editor/style-editor/SelectAdvancedSettings';
import ProgressBarSettings from '~/components/Editor/style-editor/ProgressBarSettings';
import { useDropzone } from 'react-dropzone';
import { RootState } from '~/redux/rootStore';

interface Props {
}

const AdditionalEditor: FC<Props> = () => {
    const headlineConfiguration = useSelector(({ editor }: RootState) => editor?.styles?.headline);
    const progressbarStyles = useSelector(({ editor }: RootState) => editor?.styles?.progress);

    const dispatch = useDispatch();

    const [uploadLogo, setUploadLogo] = useState<{ preview: string, name: string }>();

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        if (acceptedFiles.length !== 1) {
            return;
        }

        const logoFile = acceptedFiles[0];
        const previewData = URL.createObjectURL(logoFile);

        setUploadLogo({
            preview: previewData,
            name: logoFile.name,
        });

        dispatch(resetVideoLogo());
        dispatch(setVideoLogo(logoFile, previewData));
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const dropzoneStyle: CSSProperties = {
        ...(isDragActive ? {
            backgroundColor: '#43597d',
        } : {}),
    };

    const handleHeadlineChange = (name: string, value: string | number | boolean) => {
        dispatch(setSettings('headline', name, value))
    }

    const handleProgressbarChange = (name: string, value: string | number | boolean) => {
        dispatch(setSettings('progress', name, value))
    }

    return (
        <>
            <div>
                <div className="mt-5">
                    <SelectAdvancedSettings
                        onChange={handleHeadlineChange}
                        configuration={headlineConfiguration}
                        headline={headlineConfiguration.headline}
                        previewText="This is a headline"
                        contentEditable={false}
                        onContentChange={value => handleHeadlineChange("headline", value)}
                    />
                </div>
                <div className="pt-5">
                    <ProgressBarSettings
                        onChange={handleProgressbarChange}
                        style={progressbarStyles}
                        headline="Add Progress-Bar"
                    />
                </div>
            </div>
            <div className="w-[440px] mx-auto max-h-full overflow-hidden mt-8">
                <div>
                    <div className="text-center text-font-2 font-bold uppercase tracking-wider mb-2">
                        Add an element like Logo/Image
                    </div>

                    <div className="flex w-full items-center justify-center bg-grey-lighter pb-5">
                        <label
                            // The onclick handler prevents opening the dialog twice
                            {...getRootProps({ style: dropzoneStyle, onClick: e => e.preventDefault() })}
                            className="w-64 shadow-lg flex flex-col items-center px-4 py-10 bg-white text-gray-200 rounded-lg tracking-wide border border-blue cursor-pointer hover:bg-[#43597d] hover:text-white"
                        >
                            {!uploadLogo ? (
                                <svg className="w-10 h-10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                            ) : (
                                <div className="flex overflow-hidden">
                                    <img
                                        src={uploadLogo.preview}
                                        className="block"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </div>
                            )}

                            <input
                                {...getInputProps()}
                                className="sr-only"
                            />
                        </label>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdditionalEditor
