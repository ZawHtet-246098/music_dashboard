import React, { useState } from 'react';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-60 bg-gray-200 h-[90%] p-4 relative rounded-bl-[0px] border">
            <div className="relative">
                <div
                    className="flex items-center cursor-pointer mb-10"
                    onClick={toggleDropdown}
                >
                    <img
                        src="https://people.com/thmb/LcIGRZNxffByCCx-vLZ1azpDgtw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/Tom-Hanks-Worries-He-Could-Still-Star-in-Movies-After-His-Death-051723-1-04359e0607a14606be83fe495d55c21e.jpg"
                        alt="User"
                        className="rounded-full mr-3 w-[50px] h-[50px] object-cover"
                    />
                    <div>

                        <h4 className="font-bold">Joshua <span><i className={`fas fa-chevron-down ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`}></i></span></h4>
                        <span className="text-xs bg-gray-400 px-2 py-1 rounded-full text-white">PREMIUM</span>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute left-0 top-[4.5rem] w-56 bg-white shadow-lg rounded-lg p-4 z-10">
                        <span className="block text-sm font-bold text-pink-500 mb-2">
                            PREMIUM <span className="text-xs text-gray-500 ml-10">Through 11/2</span>
                        </span>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span>Private</span>
                                <input type="checkbox" className="toggle-checkbox" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Explicit Filter</span>
                                <input type="checkbox" className="toggle-checkbox" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Friend Activity</span>
                                <input type="checkbox" className="toggle-checkbox" />
                            </div>
                        </div>
                        <div className="mt-3 text-gray-600 text-sm">
                            <p className="cursor-pointer hover:underline">Account Settings</p>
                            <p className="cursor-pointer hover:underline mt-2 text-gray-400">Log out</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-6 text-[#7C7C7C]">
                <h3 className="uppercase text-gray-600 text-xs font-bold">Browse</h3>
                <ul className="space-y-2">
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-music"></i>
                        <span>Songs</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-list"></i>
                        <span>Playlists</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-user"></i>
                        <span>Just for You</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-chart-line"></i>
                        <span>Top Charts</span>
                    </li>
                </ul>

                <h3 className="uppercase text-gray-600 text-xs mt-10 font-bold">Your Playlists</h3>
                <ul className="space-y-2 text-base">
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-chart-line"></i>
                        <span>Workout Mix</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-chart-line"></i>
                        <span>Chillin' at Home</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-chart-line"></i>
                        <span>Booping at Adobe</span>
                    </li>
                    <li className="flex items-center space-x-4 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-100 cursor-pointer">
                        <i className="fas fa-chart-line"></i>
                        <span>XD 4 Life</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
