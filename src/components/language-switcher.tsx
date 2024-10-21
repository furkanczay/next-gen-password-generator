"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/lib/utils";
import { Button } from "./ui/button";
import ReactCountryFlag from "react-country-flag"

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
    
    const pathname = usePathname();
    const router = useRouter();
    const redirectedPathname = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <Button
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        onClick={() => router.push(redirectedPathname(locale === "en" ? "tr" : "en"), {
            scroll: false,
        })}
        >
            {locale === "en" ? (
                <ReactCountryFlag countryCode="TR" svg style={{width: '1.5rem', height: '1.5rem'}} />
            ) : (
                <ReactCountryFlag countryCode="US" svg style={{width: '1.5rem', height: '1.5rem'}} />
            )}
        </Button>
    );
}