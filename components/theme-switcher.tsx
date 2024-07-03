import { useTheme } from 'next-themes';
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Switch } from './ui/switch';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="flex items-center">
            {/* Sun Icon */}
            <span className="mr-3">
                <BsFillSunFill
                    size={20}
                    className={theme === 'dark' ? 'text-gray-500' : 'text-yellow-500'}
                />
            </span>
            <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
            >
                <span className="sr-only">Toggle dark mode</span>
                <span aria-hidden="true" />
            </Switch>
            {/* Moon Icon */}
            <span className="ml-3">
                <BsMoonStarsFill
                    size={20}
                    className={theme === 'dark' ? 'text-yellow-500' : 'text-gray-500'}
                />
            </span>
        </div>
    );
}
