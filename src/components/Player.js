import React, { useState, useRef, useEffect } from 'react';
import { BiRepeat } from 'react-icons/bi';
import { BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { CgRepeat } from 'react-icons/cg';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Import volume icons

const Player = ({ curMusic, setCurMusic, isPlaying, setIsPlaying, recentlyPlayed }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5); // Set default volume to 50%
    const [previousVolume, setPreviousVolume] = useState(0.5); // New state to store the previous volume
    const [isMuted, setIsMuted] = useState(false); // New state for mute control
    const [isLooping, setIsLooping] = useState(false); // New state for loop control
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = isMuted ? 0 : volume; // Apply the volume or mute state
            audio.loop = isLooping; // Apply the loop state
            audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
            audio.onloadedmetadata = () => setDuration(audio.duration);
            audio.onended = () => {
                setIsPlaying(false);
                setCurrentTime(0);
                if (!isLooping) {
                    audio.currentTime = 0;
                    handleNextTrack(); // Automatically play next track when the current one ends
                }
            };
        }
    }, [volume, isMuted, isLooping]);

    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [curMusic]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const progress = e.target;
        const clickX = e.nativeEvent.offsetX;
        const width = progress.clientWidth;
        const newTime = (clickX / width) * duration;
        audioRef.current.currentTime = newTime;
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (newVolume > 0) {
            setIsMuted(false);
        }
        setPreviousVolume(newVolume); // Update the previous volume when changed
    };

    const toggleMute = () => {
        if (isMuted) {
            setVolume(previousVolume); // Restore the previous volume when unmuting
        } else {
            setPreviousVolume(volume); // Save the current volume before muting
            setVolume(0); // Set volume to 0 when muting
        }
        setIsMuted(!isMuted);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    const handleNextTrack = () => {
        const currentIndex = recentlyPlayed.findIndex((music) => music.url === curMusic.url);
        const nextIndex = (currentIndex + 1) % recentlyPlayed.length;
        setCurMusic(recentlyPlayed[nextIndex]);
        setIsPlaying(true);
    };

    const handlePrevTrack = () => {
        const currentIndex = recentlyPlayed.findIndex((music) => music.url === curMusic.url);
        const prevIndex = (currentIndex - 1 + recentlyPlayed.length) % recentlyPlayed.length;
        setCurMusic(recentlyPlayed[prevIndex]);
        setIsPlaying(true);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-pink-500 text-white px-6 py-3 flex items-center justify-between">
            {/* Audio element */}
            <audio ref={audioRef} src={curMusic?.url ? curMusic?.url : curMusic}></audio>

            {/* Left section: Thumbnail and track info */}
            <div className="flex items-center space-x-4 cursor-pointer" style={{ flexBasis: '20%' }}>
            <div
    className={`bg-purple-600 w-10 h-10 rounded-full overflow-hidden shadow-lg 
    ${isPlaying ? 'animate-spin' : ''}`}
    style={{
        animation: isPlaying ? 'spin 3s linear infinite' : 'none',
    }}
>
    <img
        src="https://images.8tracks.com/cover/i/000/888/361/97125.original-5144.jpg?rect=163,0,402,402&q=98&fm=jpg&fit=max"
        className="w-full h-full object-cover"
    />
</div>

                <div>
                    <h4 className="font-semibold">{curMusic?.title ? curMusic?.title : 'Mind-Blowing'}</h4>
                    <p className="text-sm text-gray-200">{curMusic?.artist ? curMusic?.artist : 'Various Artists'}</p>
                </div>
            </div>

            {/* Middle section: Player controls */}
            <div className="flex items-center space-x-6 mx-6" style={{ flexBasis: '50%' }}>
                <i className="fas fa-random text-lg opacity-75 cursor-pointer"></i>
                <i className="fas fa-step-backward text-lg cursor-pointer" onClick={handlePrevTrack}></i>
                <i
                    className={`fas ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} text-3xl cursor-pointer`}
                    onClick={togglePlayPause}
                ></i>
                <i className="fas fa-step-forward text-lg cursor-pointer" onClick={handleNextTrack}></i>
                <CgRepeat
                    className={`w-[60px] h-[60px] cursor-pointer ${isLooping ? 'opacity-100 text-blue-400' : 'opacity-75'}`}
                    onClick={toggleLoop}
                />

                {/* Progress bar and time indicators */}
                <span className="text-sm">
                    {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
                <div className="w-full bg-pink-400 h-1 rounded-full relative" onClick={handleProgressClick}>
                    <div
                        className="bg-white h-3 w-3 rounded-full absolute top-1/2 transform -translate-y-1/2"
                        style={{ left: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>
                <span className="text-sm">
                    {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                </span>
            </div>

            {/* Right section: Additional controls */}
            <div className="flex items-center space-x-4">
                <i className="fas fa-music text-lg"></i>
                <i className="fas fa-desktop text-lg"></i>
                {/* Speaker icon */}
                {isMuted || volume === "0" ? (
                    <FaVolumeMute className="text-lg cursor-pointer" onClick={toggleMute} />
                ) : (
                    <FaVolumeUp className="text-lg cursor-pointer" onClick={toggleMute} />
                )}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 bg-pink-400 h-1 rounded-full cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Player;
