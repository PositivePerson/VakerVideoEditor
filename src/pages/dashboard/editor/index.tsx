import { ClipboardIcon, ColorSwatchIcon, DotsCircleHorizontalIcon, } from '@heroicons/react/outline';
import { Tabs } from 'antd';
import React, { FunctionComponent, useState } from 'react';
import SubtitleEditor from '~/components/Editor/Tabs/SubtitleTab';
import VideoPlayer from '~/components/Editor/video-player/VideoPlayer';
import StyleEditor from '~/components/Editor/Tabs/StyleEditor';
import AdditionalEditor from '~/components/Editor/Tabs/AdditionalEditor';
import WaveForm from '~/components/Editor/wave-form/WaveForm';
import SubtitleTrackEditor from '~/components/Editor/subtitle-track-editor/SubtitleTrackEditor';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';
import generateSubtitleTracks from '~/components/Editor/subtitle-track-editor/generateSubtitleTracks';
import { useRouter } from 'next/router';
import DashboardWrapper from '~/components/ui/DashboardWrapper';
import EditorSwitch from '~/components/ui/Form/EditorSwitch';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import EditorHeader from '~/components/Editor/EditorHeader';
import Head from 'next/head';
import ExportSRTModal from "../../../components/Editor/ExportSRTModal"
import ExportVideoModal from '~/components/Editor/ExportVideoModal';

// TODO: Does ReactPlayer & Wavesurfer also work with uploads?
const videoUrl = '/assets/test.mp4';

const Editor: FunctionComponent = () => {

    const router = useRouter();
    const [showTimeline, setShowTimeline] = useState(true);
    const [isSRTModalOpen, setIsSRTModalOpen] = useState(false)
    const [isExportModalOpen, setIsExportModalOpen] = useState(false)
    const [videoPlaying, setVideoPlaying] = useState(false)
    const [currentLineStart, setCurrentLineStart] = useState(0);
    const [lineProgress, setLineProgress] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState<{
        state: boolean;
        action?: 'Login' | 'SignUp';
    }>({
        state: false,
        action: undefined,
    });

    const user = useSelector(({ user }: RootState) => user);

    const subtitleNodeList = useSelector(({ editor }: RootState) => editor?.subtitles);
    const subtitleTracks = generateSubtitleTracks(subtitleNodeList);

    console.log('nodes', subtitleNodeList);
    console.log('tracks', subtitleTracks);

    
    const onStartExportVideo = (quality: string, notifyWhenFinishes: boolean) => {
        //TODO
        console.log(quality, notifyWhenFinishes);
    }
    const onDownloadSRTFile = (withTimestamps: boolean) => {
		//TODO
        console.log("download SRT FILE", withTimestamps)
	}

    const [tabIndex, setTabIndex] = useState(0)
    const tabs = [
        {
            key: 'SUBTITLE',
            title: 'subtitles',
            icon: "/assets/editor/subtitle-panel.svg",
            view: <SubtitleEditor currentLineStart={currentLineStart} lineProgress={lineProgress} setVideoPlaying={setVideoPlaying}/>,
        },
        {
            key: 'STYLE',
            title: 'style',
            icon: "/assets/editor/style-panel.svg",
            view: <StyleEditor />,
        },
        {
            key: 'ADD',
            title: 'add',
            icon: "/assets/editor/add-panel.svg",
            view: <AdditionalEditor />,
        },
    ];

    return (
        <>  
            <Head>
                <title>Dashboard - { "Editor" }</title>
            </Head>

            <ExportSRTModal isModalOpen={isSRTModalOpen} setIsModalOpen={setIsSRTModalOpen} onDownloadSRTFile={onDownloadSRTFile} />
            <ExportVideoModal isModalOpen={isExportModalOpen} setIsModalOpen={setIsExportModalOpen} onStartExportVideo={onStartExportVideo} />

            <div className="bg-[#FCFCFC]">
                <EditorHeader projectName={"projectName"} setIsSRTModalOpen={setIsSRTModalOpen} setIsExportModalOpen={setIsExportModalOpen} />
                <main className="min-h-screen py-36 sm:px-8 lg:px-12 max-w-[1900px] mx-auto overflow-hidden">
                    
                    <div className="grid gap-2 px-4 sm:px-0 lg:grid-cols-11">
                        <div className="lg:col-span-5">
                            <VideoPlayer
                                videoUrl={videoUrl}
                                videoPlaying={videoPlaying}
                                setVideoPlaying={setVideoPlaying}
                                setCurrentLineStart={setCurrentLineStart}
                                setLineProgress={setLineProgress}
                            />
                        </div>
                    <div className="hidden shadow-sm place-self-center lg:inline-block w-5 lg:col-span-1 bg-white h-full" />

                    <div className="lg:col-span-5 px-0 sm:px-6 lg:px-0 xl:px-6 2xl:px-16">
                        <div className="px-6 lg:px-0 mt-12 lg:mt-0">
                            
                            <div className="flex space-x-3 mx-2 p-2 bg-white shadow rounded-md mb-8">
                                {   tabs.map((tab, i) => (
                                    <button 
                                        onClick={() => setTabIndex(i)} 
                                        className={`flex py-2 space-x-2 rounded flex-1 w-24 justify-center items-center uppercase font-bold focus:outline-none  
                                            ${tabIndex === i ? 'text-white bg-main' : 'text-main hover:bg-gray-100'}`
                                        }
                                    >
                                        <img src={tab.icon} alt="panel icon" width="25px" height="25px" className={`${tabIndex === i && "filter saturate-0 brightness-[3]"}`} />
                                        <span>{tab.title}</span>
                                    </button>
                                ))}
                            </div>
                            
                            {/* 
                                I coded this way because with 'display:none' ('hidden' tailwind class) the panel view does not unmount
                                and the states of each will be preserved 
                            */}
                            { tabs.map(({ view }, i) => (
                                <div className={tabIndex !== i ? "hidden" : ""}>{ view }</div>
                            )) }
                                
                            
                            </div>

                        </div>
                    </div>

                    <div className="w-full mt-16 px-4 space-y-3">
                        <div className="flex items-center">
                            <EditorSwitch isActive={showTimeline} onChange={() => { setShowTimeline(prev => !prev)} } /> 
                            <div className="text-font-2 font-extrabold pl-4">Timeline on/off</div>   
                        </div>
                        <div className="inline-flex font-extrabold space-x-3 px-1 items-center justify-between bg-white rounded-full shadow">
                            <MinusIcon className="h-4 w-4" />
                            <div>fit</div>
                            <PlusIcon className="h-4 w-4" />
                        </div>
                        
                        
                        <div className={`${!showTimeline && "hidden"} w-full relative md:mr-2 p-2 rounded-2xl bg-white`}>
                            <div className="mb-2">
                                <SubtitleTrackEditor
                                    videoLength={30}
                                    tracks={subtitleTracks}
                                />
                            </div>

                            <div>
                                <WaveForm
                                    videoUrl={videoUrl}
                                />
                            </div>
                        </div>                        
                        
                    </div>
                </main>

            </div>
        </>
    );
};

export default Editor;
