import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBell, FaPlay, FaHeart, FaEllipsisH } from 'react-icons/fa';

import { useFetchAlbums } from "../hooks/useAlbums";


const Dashboard = ({setCurrentMusic,recentlyPlayed, setIsPlaying,}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchRef = useRef(null);

	const { data, isLoading } = useFetchAlbums();

  console.log(data)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);


  return (
    <div className="flex-grow p-6 relative bg-white rounded-br-[0px] h-[90%]">
      {/* Top Bar with Search and Notifications */}
      <div className="flex justify-between items-center mb-6">
        {/* Search */}
        <div className="flex items-center space-x-4" ref={searchRef}>
          {isSearchOpen ? (
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none transition-all duration-300 ease-in-out transform w-[400px]"
              placeholder="Search for songs, artists, and albums"
            />
          ) : (
            <FaSearch
              className="text-xl cursor-pointer transition-all duration-300 ease-in-out"
              onClick={toggleSearch}
            />
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-xl cursor-pointer" onClick={toggleNotifications} />
          {isNotificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4"
              style={{ zIndex: '100' }}
            >
              <h4 className="font-bold mb-2">Notifications</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <img
                    src="https://img.huffingtonpost.com/asset/64cd1b302200005d00574407.jpeg?ops=scalefit_500_noupscale"
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm">
                      <strong>Maria</strong> likes your playlist{' '}
                      <span className="font-bold">XD 4 Life.</span>
                    </p>
                    <span className="text-xs text-gray-500">2m ago</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <img
                    src="https://img.huffingtonpost.com/asset/64cd1b302200005d00574407.jpeg?ops=scalefit_500_noupscale"
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm">
                      <strong>Jasmine</strong> is currently listening to{' '}
                      <span className="font-bold">Best of Blues.</span>
                    </p>
                    <span className="text-xs text-gray-500">3h ago</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <img
                    src="https://img.huffingtonpost.com/asset/64cd1b302200005d00574407.jpeg?ops=scalefit_500_noupscale"
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm">
                      <strong>Marc</strong> liked your playlist{' '}
                      <span className="font-bold">Booping at Adobe.</span>
                    </p>
                    <span className="text-xs text-gray-500">5h ago</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Get Lost Section */}
        <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-[25px] min-h-[220px] transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-5xl font-bold mb-2">GET LOST</h2>
          <p className="text-3xl opacity-50">in your music.</p>
          <button className="absolute bottom-4 left-4 bg-white text-purple-600 p-2 rounded-full">
            <FaPlay className="ml-[.1rem]" />
          </button>
        </div>

        {/* Mellow Section */}
        <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-[25px] min-h-[220px] transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-5xl font-bold mb-2">MELLOW</h2>
          <p className="text-3xl opacity-50">beats.</p>
          <button className="absolute bottom-4 left-4 bg-white text-cyan-600 p-2 rounded-full">
            <FaPlay className="ml-[.1rem]" />
          </button>
        </div>
      </div>

      {/* Recently Played and Recommendations */}
      <div className="mt-10 grid grid-cols-2 gap-6">
        {/* Recently Played */}
        <div>
          <h3 className="text-lg font-bold mb-4">Recently Played</h3>
          {/* <ul>
            <li className="flex items-center justify-between py-2 border-b hover:bg-gray-600 px-2 hover:rounded hover:text-white"
            onClick={() => setCurrentMusic('/audio/Anitek_-_All_That_Jazz.mp3')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <FaPlay className="text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold">All that Jazz</p>
                  <p className="text-sm text-gray-500">Various Artists</p>
                </div>
              </div>
              <div className="flex items-center space-x-20">
                <span>02:53</span>
                <FaHeart className="cursor-pointer text-gray-400" />
                <FaEllipsisH className="cursor-pointer text-gray-400" />
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b hover:bg-gray-600 px-2 hover:rounded hover:text-white"
            onClick={() => setCurrentMusic('https://www.youtube.com/embed/L2e9acreKmQ')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <FaPlay className='text-gray-700' />
                </div>
                <div>
                  <p className="font-semibold">Splashed</p>
                  <p className="text-sm text-gray-500">Blue-Eyed Dream</p>
                </div>
              </div>
              <div className="flex items-center space-x-20">
                <span>05:12</span>
                <FaHeart className="cursor-pointer text-gray-400" />
                <FaEllipsisH className="cursor-pointer text-gray-400" />
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b hover:bg-gray-600 px-2 hover:rounded hover:text-white"
            onClick={() => setCurrentMusic('https://www.youtube.com/embed/L2e9acreKmQ')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <FaPlay className='text-gray-700' />
                </div>
                <div>
                  <p className="font-semibold">Prism</p>
                  <p className="text-sm text-gray-500">Gus Bot</p>
                </div>
              </div>
              <div className="flex items-center space-x-20">
                <span>03:22</span>
                <FaHeart className="cursor-pointer text-gray-400" />
                <FaEllipsisH className="cursor-pointer text-gray-400" />
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b hover:bg-gray-600 px-2 hover:rounded hover:text-white"
            onClick={() => setCurrentMusic('https://www.youtube.com/embed/L2e9acreKmQ')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <FaPlay className='text-gray-700' />
                </div>
                <div>
                  <p className="font-semibold">Mind-blowing Beats</p>
                  <p className="text-sm text-gray-500">Various Artists</p>
                </div>
              </div>
              <div className="flex items-center space-x-20">
                <span>09:10</span>
                <FaHeart className="cursor-pointer text-gray-400" />
                <FaEllipsisH className="cursor-pointer text-gray-400" />
              </div>
            </li>
          </ul> */}

          <ul>
            {recentlyPlayed?.map((music) => (
              <li
                key={music.id}
                className="flex items-center justify-between py-2 border-b hover:bg-gray-600 px-2 hover:rounded hover:text-white"
                onClick={() => {setCurrentMusic(music); }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                    <FaPlay className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-semibold">{music.title}</p>
                    <p className="text-sm text-gray-500">{music.artist}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-20">
                  <span>{music.duration}</span>
                  <FaHeart className="cursor-pointer text-gray-400" />
                  <FaEllipsisH className="cursor-pointer text-gray-400" />
                </div>
              </li>
            ))}
            </ul>
        </div>

        {/* Recommended For You */}
        <div className='ml-8'>
          <h3 className="text-lg font-bold mb-4">Recommended For You</h3>
          <div className="flex space-x-4">
            <div className="w-32 h-40 rounded-lg flex flex-col justify-start items-center text-start">
              <div className="w-full h-28 bg-gray-300 hover:bg-gray-600 rounded-lg flex justify-center items-center">
                <FaPlay className="text-white text-2xl" />
              </div>
              <div className="flex flex-col items-center mt-2">
                <p className="text-base text-gray-600">Best of Blues</p>
                <p className="text-xs text-gray-400">Jazzmaster Bill</p>
              </div>
            </div>

            <div className="w-32 h-40 rounded-lg relative flex flex-col justify-center items-center">
              <div className="w-full h-28 bg-gray-300 hover:bg-gray-600 rounded-lg flex justify-center items-center">
                <FaPlay className="text-white text-2xl" />
              </div>
              <div className="flex flex-col items-center mt-2">
                <p className="text-base text-gray-600">Out of This World</p>
                <p className="text-xs text-gray-400">Lily Wonders</p>
              </div>
            </div>

            <div className="w-32 h-40 rounded-lg flex flex-col justify-center items-center">
              <div className="w-full h-28 bg-gray-300 hover:bg-gray-600 rounded-lg flex justify-center items-center">
                <FaPlay className="text-white text-2xl" />
              </div>
              <div className="flex flex-col items-center mt-2">
                <p className="text-base text-gray-600">Acoustics</p>
                <p className="text-xs text-gray-400">The Spaceman</p>
              </div>
            </div>

            <div className="w-32 h-40 rounded-lg flex flex-col justify-center items-center">
              <div className="w-full h-28 bg-gray-300 hover:bg-gray-600 rounded-lg flex justify-center items-center">
                <FaPlay className="text-white text-2xl" />
              </div>
              <div className="flex flex-col items-center mt-2">
                <p className="text-base text-gray-600">Acoustics</p>
                <p className="text-xs text-gray-400">The Spaceman</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
