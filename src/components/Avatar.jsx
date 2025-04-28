import React, { useState, useEffect, useRef } from 'react';

const Avatar = ({user, logout}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(e.target)
        ) {
            setIsOpen(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <img
                id="avatarButton"
                ref={buttonRef}
                onClick={handleToggle}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user?.picture}
                alt="User dropdown"
            />

            {isOpen && (
                <div
                    id="userDropdown"
                    ref={dropdownRef}
                    className="absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{user?.name}</div>
                        <div className="font-medium truncate">{user?.email}</div>
                    </div>

                    <div className="py-1">
                        <button onClick={logout} className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
