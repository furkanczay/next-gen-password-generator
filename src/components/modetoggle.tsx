"use client"
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <Button variant="ghost"
        type="button"
        size="icon"
        className="px-2" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? ( <MoonIcon /> ) : ( <SunIcon /> )}
      </Button>
    </div>
  )
}

export default ThemeChanger