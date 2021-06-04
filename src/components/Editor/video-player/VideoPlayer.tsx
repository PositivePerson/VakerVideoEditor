import { Component, createRef, Fragment, useEffect } from 'react';
import ReactPlayer, { Config as ReactPlayerInternalConfig } from 'react-player';
import { Slider } from 'antd';
import { Listbox, Transition } from '@headlessui/react'
import { autobind } from 'core-decorators';
import Duration from 'src/components/Editor/Duration';
import { NodeList, parseSync, stringifySync } from 'subtitle'
import { connect } from 'react-redux';
import { RootState } from '~/redux/rootStore';
// @ts-ignore
import staticTestVtt from '!!raw-loader!public/assets/azuretest.vtt';
import {
    IEditorHeadlineStyles,
    IEditorKaraokeStyles,
    IEditorLogo,
    IEditorProgressBarStyles,
    IEditorTextStyles,
    IVideoTranslation
} from '~/redux/editor/editor.reducer';
import { Dispatch } from 'redux';
import generateVttFile from '~/utils/generateVttFile';
import VideoPlayerControls from '~/components/Editor/video-player/VideoPlayerControls';
import SubtitlePreview from '~/components/Editor/video-player/SubtitlePreview';
import VideoProgressBar from '~/components/Editor/video-player/VideoProgressBar';
import VideoLogo from '~/components/Editor/video-player/VideoLogo';
import HeadlinePreview from '~/components/Editor/video-player/HeadlinePreview';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface ICroppingFormat {
    value: number;
    label: string;
    aspectRatio: string;
    iconFileName: string;
}

// This enables a smooth seeking
const amountOfSliderSteps = 10000;

const videoFormatList = new Array<ICroppingFormat>(
    { value: 1, label: 'Original', aspectRatio: "", iconFileName:"original.svg" },
    { value: 2, label: 'Instagram', aspectRatio: "1:1", iconFileName:"square.svg" },
    { value: 3, label: 'Youtube, Vimeo', aspectRatio: "16:9", iconFileName:"landscape.svg" },
    { value: 4, label: 'TikTok, Instagram', aspectRatio: "9:16", iconFileName:"portrait.svg" },
    { value: 5, label: 'Facebook, Twitter', aspectRatio: "5:4", iconFileName:"horizontal.svg" },
    { value: 6, label: 'Facebook, Twitter', aspectRatio: "4:5", iconFileName:"vertical.svg" },
    { value: 7, label: 'Pinterest', aspectRatio: "2:3", iconFileName:"pinterest.svg" },
);


/*
                    this.videoFormatOptions = [{
                        label: "Original",
                        widthRatio: null,
                        heightRatio: null,
                        isLandscape: null,
                        description: "The format you uploaded",
                        aspectRatio: 1 / 1.3
                    }, {
                        label: "Square",
                        widthRatio: 1,
                        heightRatio: 1,
                        isLandscape: !0,
                        description: "Instagram",
                        aspectRatio: 1
                    }, {
                        label: "Landscape",
                        widthRatio: 16,
                        heightRatio: 9,
                        isLandscape: !0,
                        description: "Youtube, Vimeo",
                        aspectRatio: 16 / 9
                    }, {
                        label: "Portrait",
                        widthRatio: 9,
                        heightRatio: 16,
                        isLandscape: !1,
                        description: "TikTok, Instagram",
                        aspectRatio: 9 / 16
                    }, {
                        label: "Horizontal Post",
                        widthRatio: 5,
                        heightRatio: 4,
                        isLandscape: !0,
                        description: "Facebook, Twitter",
                        aspectRatio: 5 / 4
                    }, {
                        label: "Vertical Post",
                        widthRatio: 4,
                        heightRatio: 5,
                        isLandscape: !1,
                        description: "Facebook, Twitter",
                        aspectRatio: .8
                    }, {
                        label: "Pinterest",
                        widthRatio: 2,
                        heightRatio: 3,
                        isLandscape: !0,
                        aspectRatio: 2 / 3
                    }],
 */
interface IVideoPlayerProps {
    videoUrl: string;
    videoPlaying: boolean;
    setVideoPlaying: ( x: boolean ) => void;

    // Injected props
    currentVideoTranslation: IVideoTranslation;
    subtitles: NodeList;
    progressBarConfiguration: IEditorProgressBarStyles;
    logo: IEditorLogo;
    subtitleStyle?: IEditorTextStyles;
    karaokeStyle?: IEditorKaraokeStyles;
    headlineStyle?: IEditorHeadlineStyles;
    dispatch: Dispatch;
}

interface IVideoPlayerState {
    /**
     * This is only toggled once after first click on play button
     */
    startedPlaying: boolean;
    /**
     * The current playing state
     */
    playing: boolean;
    seeking: boolean;
    playbackRate: number;
    /**
     * Value between 0 and 1
     */
    playedPercentage: number;
    playedSeconds: number;
    duration: number;
    muted: boolean;
    selectedCropping: ICroppingFormat | null;
    subtitle: string;
}

class VideoPlayer extends Component<IVideoPlayerProps, IVideoPlayerState> {

    public readonly state: IVideoPlayerState = {
        startedPlaying: false,
        playing: false,
        seeking: false,
        playbackRate: 1,
        playedPercentage: 0,
        playedSeconds: 0,
        duration: 0,
        muted: false,
        selectedCropping: videoFormatList[0],
        subtitle: '',
    };

    private playerRef = createRef<ReactPlayer>();

    public render() {

        this.hideDefaultTextTracks();

        const {
            videoUrl,
            subtitles,
            progressBarConfiguration,
            logo,
            subtitleStyle,
            karaokeStyle,
            headlineStyle,
        } = this.props;

        const {
            startedPlaying,
            playing,
            playedPercentage,
            playedSeconds,
            muted,
            playbackRate,
            selectedCropping,
        } = this.state;

        const Observer = () => {
            useEffect(() => {
                if(playing !== this.props.videoPlaying) this.setState({ playing: this.props.videoPlaying });
            }, [this.props.videoPlaying])
            return null // component does not render anything. It's created only to make useEffect() hook use possible.
          }

        return (
            <div className="">
                <Observer />
                
                <div className="relative mb-12 text-center">
                    <Listbox value={this.state.selectedCropping?.value} onChange={this.handleVideoFormatChange} as="div" className="relative z-20 max-w-sm mx-auto">
                        {({ open }) => (
                            <>
                                <Listbox.Button className="hover:bg-gray-100 h-12 bg-white px-4 py-2 rounded-md text-font-1 uppercase font-extrabold tracking tracking-wider shadow-md focus:outline-none">
                                    <div className="flex justify-center items-center">
                                        <img height="30px" width="30px" className="mr-3 w-8 h-8" src={`/assets/editor/aspect-ratio-icons/${this.state.selectedCropping?.iconFileName}`} alt="aspect ratio icon" />
                                        cropping
                                        <ChevronDownIcon className="inline w-5 h-5" />
                                    </div>
                                    
                                </Listbox.Button>
                                <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                >
                                    <Listbox.Options as="div" className="absolute z-10 mt-1 w-full bg-white shadow-lg p-4 rounded-lg  overflow-auto focus:outline-none">
                                    {videoFormatList.map((videoFormat) => (
                                        <Listbox.Option
                                        key={videoFormat.value}
                                        value={videoFormat.value}
                                        as="div"
                                        className={`flex justify-between h-12 font-extrabold px-4 py-2 cursor-pointer rounded-md ${
                                            this.state.selectedCropping?.value === videoFormat.value ? "bg-blue-100" : "hover:bg-gray-100 focus:bg-gray-100" 
                                        }`}
                                        >
                                            <div className="text-font-1 text-lg flex justify-center items-center">
                                                <img height="30px" width="30px" className="mr-3 w-8 h-8" src={`/assets/editor/aspect-ratio-icons/${videoFormat.iconFileName}`} alt="aspect ratio icon" />
                                                {videoFormat.label}
                                            </div>
                                            <div className="text-font-2">{videoFormat.aspectRatio}</div>
                                        
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                            </>
                        )}
                    </Listbox>
                </div>

                <div className="relative">
                    <ReactPlayer
                        ref={this.playerRef}
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "5px", overflow: "hidden" }}
                        playing={playing}
                        muted={muted}
                        playbackRate={playbackRate}
                        progressInterval={10}
                        onProgress={this.handleVideoProgress}
                        onDuration={this.handleVideoDuration}
                        onEnded={this.handleVideoEnded}
                        url={videoUrl}
                    />
                    {startedPlaying && (
                        <div className="absolute w-10/12 transform -translate-x-1/2 bottom-[20px] left-1/2">
                            <SubtitlePreview
                                start={playedSeconds}
                            />
                        </div>
                    )}
                    {startedPlaying && headlineStyle?.active && (
                        <div className="absolute w-10/12 transform -translate-x-1/2 top-0 left-1/2 text-center">
                            <HeadlinePreview
                                headline={headlineStyle.headline}
                                style={headlineStyle}
                            />
                        </div>
                    )}
                    {progressBarConfiguration.active && (
                        <div className="absolute bottom-0 w-full">
                            <VideoProgressBar
                                percent={playedPercentage * 100}
                                backgroundColor={progressBarConfiguration.backgroundColor}
                                progressColor={progressBarConfiguration.progressColor}
                                borderRadius={progressBarConfiguration.borderRounded}
                            />
                        </div>
                    )}
                    {logo.file !== null && logo.blobData !== null && (
                        <VideoLogo
                            file={logo.file}
                            blobData={logo.blobData}
                            size={logo.size}
                            position={logo.position}
                        />
                    )}
                </div>

                <div className="flex">
                    <Slider
                        className="flex-grow"
                        min={0}
                        max={amountOfSliderSteps}
                        value={playedPercentage * amountOfSliderSteps}
                        tipFormatter={this.renderSliderFormatter}
                        onChange={this.handleSeekMouseDown}
                        onAfterChange={this.handleSeekMouseUp}
                        handleStyle={{
                            transition: 'width',
                        }}
                    />
                </div>
                <div className="flex flex-row justify-center items-center space-x-5">
                    <VideoPlayerControls
                        isPlaying={this.state.playing}
                        isMuted={this.state.muted}
                        onPlayToggle={this.handlePlayToggle}
                        onVolumeToggle={this.handleVolumeClick}
                        onSeekBackward={() => this.goBackSeconds()}
                        onSeekForward={() => this.goForwardSeconds()}
                        onPlaybackRateChange={this.handlePlaybackRateChange}
                    />
                </div>
            </div>
        );
    }

    @autobind
    private renderSliderFormatter(value: any) {

        return <Duration seconds={this.state.duration * (value / amountOfSliderSteps)} />;
    }

    private renderSubtitle() {

        return this.getFirstSubtitleText();
    }

    @autobind
    private handleSeekMouseDown(sliderStep: number) {

        this.setState({
            seeking: true,
            playedPercentage: sliderStep / amountOfSliderSteps,
        });
    }

    @autobind
    private handleSeekMouseUp(sliderStep: number) {

        this.setState({ seeking: false });

        this.playerRef.current?.seekTo(sliderStep / amountOfSliderSteps);
    }

    @autobind
    private handleVideoProgress(state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) {

        if (!this.state.seeking) {
            this.setState({
                playedPercentage: state.played,
                playedSeconds: state.playedSeconds,
            });
        }
    }

    @autobind
    private handlePlaybackRateChange(playbackRate: number | null) {
        if (playbackRate !== null) {
            this.setState({ playbackRate });
        }
    }

    @autobind
    private handleVideoFormatChange(selectedValue: number | null) {
        this.setState({ selectedCropping: videoFormatList.find(format => format.value === selectedValue) ?? null })
    }

    @autobind
    private handleVideoDuration(duration: any) {
        this.setState({ duration });
    }

    @autobind
    private handleVideoEnded() {
        this.setState({ playing: false });
    }

    @autobind
    private handlePlayToggle() {
        this.setState({
            startedPlaying: true,
            // playing: this.props.videoPlaying
            // playing: !this.state.playing,
        });
        this.props.setVideoPlaying( !this.props.videoPlaying );
    }

    @autobind
    private handleVolumeClick() {
        this.setState({ muted: !this.state.muted });
    }

    private goBackSeconds(seconds = 5) {
        const span = seconds * -1;
        this.changePlayerTime(span);
    }

    private goForwardSeconds(seconds = 5) {
        this.changePlayerTime(seconds);
    }

    private changePlayerTime(seconds: any) {
        const played = this.state.duration * this.state.playedPercentage;
        this.playerRef.current?.seekTo(played + seconds, 'seconds');
    }

    private hideDefaultTextTracks() {
        const video = this.playerRef && this.playerRef.current?.getInternalPlayer();
        if (!video) {
            return;
        }

        Array.from(video.textTracks)
            .forEach((track: any) => track.mode = 'hidden');
    }

    private hasSubtitles(): boolean {

        return this.getFirstSubtitleText() !== null;
    }

    private getFirstSubtitleText(): string | null {

        const video = this.playerRef.current?.getInternalPlayer();
        if (!video) {
            return null;
        }

        for (let index = 0; index < video.textTracks.length; index++) {
            if (video.textTracks[index].activeCues && video.textTracks[index].activeCues.length > 0) {
                return video.textTracks[index].activeCues[0].text;
            }
        }

        return null;
    }
}


export default connect(
    (state: RootState) => ({
        currentVideoTranslation: state.editor.currentVideoTranslation,
        subtitles: state.editor.subtitles,
        progressBarConfiguration: state.editor.styles.progress,
        logo: state.editor.logo,
        subtitleStyle: state.editor.styles.subtitle,
        karaokeStyle: state.editor.styles.karaoke,
        headlineStyle: state.editor.styles.headline,
    })
)(VideoPlayer);
