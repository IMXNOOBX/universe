import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audio from '../assets/the-hanging-tree.mp3';
import playicon from '../assets/icons8-play-96.png';
import stopicon from '../assets/icons8-stop-96.png';

function AudioPlayer({ className }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [play, { pause, stop, duration, sound }] = useSound(audio);

	const savedPlaybackPosition = localStorage.getItem('playbackPosition');
	const [playbackPosition, setPlaybackPosition] = useState(
		savedPlaybackPosition ? parseFloat(savedPlaybackPosition) : 0
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (sound && isPlaying) {
				setPlaybackPosition(sound.seek([]))
				localStorage.setItem('playbackPosition', sound.seek([]));
			}
		}, 100);
		return () => clearInterval(interval);
	}, [sound]);

	useEffect(() => {
		if (isPlaying) {
			play({ position: playbackPosition });
		} else {
			stop();
		}

		console.log(	)
	}, [isPlaying, play, pause]);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className={`${className}`}>
			<div className={`fixed bottom-0 right-0 z-50 bg-zinc-800/70 p-2 shadow-lg flex items-center rounded-lg mb-24 mr-4 ${isPlaying && 'animate-pulse'}`}>
				<img onClick={togglePlay} className='w-8 mr-2 shadow-2xl bg-zinc-900/60 p-1 rounded-md' src={isPlaying ? stopicon : playicon} alt='controls' />
				<span className='text-white mr-2'>{formatTime(playbackPosition)}</span>
				<input
					type="range"
					min={0}
					max={30}
					value={10}
					className='bg-blue-500 text-blue-500'
					onChange={(e) => setPlaybackPosition(e.target.value)}
				/>
			</div>
		</div>
	);
}

const formatTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;
