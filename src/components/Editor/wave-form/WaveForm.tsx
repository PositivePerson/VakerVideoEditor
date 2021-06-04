import React, { createRef } from 'react';

interface IWaveEditorProps {
    videoUrl: string;
}

export default class WaveForm extends React.PureComponent<IWaveEditorProps> {

    private readonly canvasRef = createRef<HTMLCanvasElement>();

    public componentDidMount() {

        this.drawWaveForm();
    }

    public render(): React.ReactNode {

        return (
            <canvas
                ref={this.canvasRef}
                className="w-full"
            />
        );
    }

    private async drawWaveForm() {

        const audioContext = new AudioContext();
        const audioBuffer = await this.getAudioBuffer(this.props.videoUrl, audioContext);

        const canvas = this.canvasRef.current!;
        const dpr = window.devicePixelRatio || 1;
        const padding = 0;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding) * dpr;
        const ctx = canvas.getContext('2d')!;

        ctx.scale(dpr, dpr);
        ctx.translate(0, canvas.offsetHeight / 2 + padding);

        const width = canvas.offsetWidth / audioBuffer.length;
        for (let i = 0; i < audioBuffer.length; i++) {
            const x = width * i;
            let y = audioBuffer[i] * canvas.offsetHeight - padding;

            const isEven = !!((i + 1) % 2);
            ctx.lineWidth = 1;
            ctx.fillStyle = '#E8F1F6';
            ctx.beginPath();
            y = isEven ? y : -y;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, y);
            ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
            ctx.lineTo(x + width, 0);
            ctx.fill();
        }
    }

    private async getAudioBuffer(videoUrl: string, audioContext: AudioContext) {
        const response = await fetch(videoUrl);
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        // Normalize data based on highest peek
        // TODO: Only supporting mono right now
        const rawData = audioBuffer.getChannelData(0);
        const samples = 10000;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i;
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j]);
            }

            filteredData.push(sum / blockSize);
        }

        return filteredData;
    }
}
