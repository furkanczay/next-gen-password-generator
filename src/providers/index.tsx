"use client"
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
        <ThemeProvider attribute="class" enableSystem>
            {children}
        </ThemeProvider>
    )
}