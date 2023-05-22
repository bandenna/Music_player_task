import React, { useState, useRef } from 'react';
import '../App.css'
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [progressTime, setProgress] = useState(0)
    const audioRef = useRef(null);


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
        setCurrentTime(zz)

    };

    return (
        <div className="bg-container">
            <audio
                ref={audioRef}
                src="http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
                onTimeUpdate={handleTimeUpdate}
            />

            <h1 className='mb-5'> Music Player</h1>
            <div className='container'>
                <div className='mt-4 d-flex flex-row'>
                    <button className='for-btn' onClick={handlePlay}><PlayCircleOutlineIcon /></button>
                    <button className='for-btn' onClick={handlePause}><PauseCircleIcon /></button>
                    <div className='inside-div'>
                        <div className='for-music mt-3' style={{ width: `${progressTime + '%'}` }} ></div>
                    </div>
                </div>
                <p>Current Time: {currentTime}</p>

                <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
            </div>

        </div >
    );
};

export default MusicPlayer;

