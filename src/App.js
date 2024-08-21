// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Player from './components/Player';

function App() {
  const [curMusic, setCurrentMusic] = useState('/audio/JLS_ATI.mp3')
  const [isPlaying, setIsPlaying] = useState(false);

  const [recentlyPlayed, setRecentlyPlayed] = useState([
    {
      id: 1,
      title: 'All that Jazz',
      artist: 'Various Artists',
      duration: '02:53',
      url: '/audio/Anitek_-_All_That_Jazz.mp3',
    },
    {
      id: 2,
      title: 'Dancing_Capotasto',
      artist: 'I capotasto',
      duration: '02:09',
      url: '/audio/Dancing_Capotasto_-_I_capotasto.mp3',
    },
    {
      id: 3,
      title: 'Fast Line_OMOA',
      artist: 'Mike Huber Music - Soul Mike',
      duration: '03:37',
      url: '/audio/Mike_Huber_Music_-_Fast_Line_OMOA.mp3',
    },
    {
      id: 4,
      title: "Mind's Eye",
      artist: 'VCelestial Aeon Project',
      duration: '03:30',
      url: "audio/Mind's_Eye_-_celestial.aeon.project.mp3",
    },
  ]);

  return (
    <div className="flex h-screen bg-[#EC4899]">
      <Sidebar />
      <Dashboard setCurrentMusic={setCurrentMusic} setIsPlaying={setIsPlaying} recentlyPlayed={recentlyPlayed} />
      <Player curMusic={curMusic} setCurMusic={setCurrentMusic} isPlaying={isPlaying} setIsPlaying={setIsPlaying} recentlyPlayed={recentlyPlayed} />
    </div>
  );
}

export default App;
