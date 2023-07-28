import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';

export function ThemeSwitcher() {

    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className={`${
            theme === 'dark' ? 'bg-green-600' : 'bg-gray-600'
            } relative inline-flex flex-shrink-0 h-5 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Toggle dark mode</span>
            <span
            aria-hidden="true"
            className={`${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
            } pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
}