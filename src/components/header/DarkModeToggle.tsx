import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Prevent hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="outline"
                size="icon"
                aria-label="Toggle dark mode"
                className="w-9 h-9"
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    // Determine if dark mode is active
    const isDark = theme === "dark"

    // Toggle between light and dark
    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }

    return (
                    <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="cursor-pointer transition-all duration-300 ease-in-out relative"
                aria-label="Toggle dark mode"
            >
                <Sun
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
                        isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
                    }`}
                />
                <Moon
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out ${
                        isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
                    }`}
                />
                <span className="sr-only">Toggle theme</span>
            </Button>
    )
}