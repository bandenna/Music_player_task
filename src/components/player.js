import React, { useState, useRef } from 'react';
import '../App.css'
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [progressTime, setProgress] = useState('')
    const [length, setLength] = useState(0)
    const [volume, setVolume] = useState(100);

    const audioRef = useRef(null);
    const clickRef = useRef(null)

    const handleAudioEnd = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const checkWidth = (event) => {
        const kwidth = clickRef.current.clientWidth;
        const offset = event.nativeEvent.offsetX;
        const divProgress = (offset / kwidth) * 100
        audioRef.current.currentTime = divProgress / 100 * length
    }


    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100;
    };


    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        const kk = audioRef.current.currentTime;
        const duration = audioRef.current.duration
        const zz = Math.ceil(kk)
        const progress = kk / duration * 100
        setProgress(progress)
        setLength(duration)
        setCurrentTime(zz)

    };

    return (
        <div className="bg-container">
            <audio
                ref={audioRef}
                src="http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnd}

            />
            <h1 className='mb-5'> Music Player</h1>
            <div className='container'>
                <div className=' mt-4 d-flex flex-row justify-content-center'>
                    <button className='for-btn' onClick={handlePlay}><PlayCircleOutlineIcon /></button>
                    <button className='for-btn' onClick={handlePause}><PauseCircleIcon /></button>
                    <p className='ml-5'>Status: {isPlaying ? 'Playing' : 'Paused'}</p>

                </div>
                <div className='inside-div range ' onClick={checkWidth} ref={clickRef}>
                    <div className=' mt-3 for-music ' style={{ width: `${progressTime + '%'}` }}  ></div>
                </div>
                <div className='d-flex flex-row justify-content-center'>
                    <p className='mt-3 mr-5'>Current Time: {currentTime}</p>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}

                    />
                    <p className='ml-3 mt-3'>sound :{volume}</p>
                </div>


            </div>

        </div >
    );
};

export default MusicPlayer;

