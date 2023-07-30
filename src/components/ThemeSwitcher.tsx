import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="flex items-center">
            {/* Sun Icon */}
            <span className="mr-3">
                <FiSun
                    className={`${
                        theme === 'dark' ? 'text-gray-500' : 'text-yellow-500'
                    } h-5 w-5`}
                />
            </span>
            <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className={`${
                    theme === 'dark' ? 'bg-green-600' : 'bg-gray-600'
                } relative inline-flex flex-shrink-0 h-5 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Toggle dark mode</span>
                {/* Switch Track */}
                <span
                    aria-hidden="true"
                    className={`${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                    } pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            {/* Moon Icon */}
            <span className="ml-3">
                <FiMoon
                    className={`${
                        theme === 'dark' ? 'text-yellow-500' : 'text-gray-500'
                    } h-5 w-5`}
                />
            </span>
        </div>
    );
}
