"use client"
import { useTheme } from "next-themes"
import { MagicCard } from "./ui/magic-card"
import { IconType } from "react-icons";


export default function FeatureCard({  title, description, Icon }: { title: string, description: string, Icon: IconType }) {
    const {theme} = useTheme();
    return(
        <MagicCard
            className="flex-col items-center py-10 justify-center shadow-2xl whitespace-nowrap text-md"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
            <div className="flex flex-col gap-3 items-center justify-center text-wrap px-10">
                <Icon className="w-10 h-10 my-10" />
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="text-muted-foreground font-light">{description}</p>
            </div>
        </MagicCard>
    )
}