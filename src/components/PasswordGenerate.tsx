"use client";

import { LuClipboardCheck, LuClipboardCopy, LuRefreshCcw } from "react-icons/lu";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { toast } from "sonner";
import { TbLockCheck, TbLockDown, TbLockExclamation } from "react-icons/tb";

interface PasswordGenerateProps {
    dict: {
        title: string;
        description: string;
        passwordLength: string;
        uppercase: string;
        lowercase: string;
        numbers: string;
        symbols: string;
        weak: string;
        medium: string;
        strong: string;
        refreshMessage: string;
        copyMessage: string;
    };
}

export default function PasswordGenerate({ dict }: PasswordGenerateProps) {
    const [length, setLength] =useState(12);
    const [password, setPassword] = useState("");
    const [weakness, setWeakness] = useState({strength: "", bg: ""});
    const [refresh, setRefresh] = useState(false);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useLowercase, setUseLowercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSpecialChars, setUseSpecialChars] = useState(true);
    const [copied, setCopied] = useState(false);
    const maxLength = 30;
    const handleIncrement = () => {
        setLength((prev) => Math.min(prev + 1, maxLength));
    };
    const handleDecrement = () => {
        setLength((prev) => Math.max(prev - 1, 1));
    };
    const handleSlideChange = (value: number[]) => {
        setLength(value[0]);
    };

    const calculateStrengthScore = (password: string) => {
        let score = 0;

        // 1. Uzunluk skoru
        if (password.length >= 12) score += 2;
        else if (password.length >= 8) score += 1;

        // 2. Çeşitlilik skoru
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+]/.test(password);

        if (hasLower) score += 1;
        if (hasUpper) score += 1;
        if (hasNumber) score += 1;
        if (hasSpecial) score += 2; // Özel karakterler daha fazla katkıda bulunur

        // 3. Yinelenen karakter sayısını kontrol et
        const repeatPenalty = /(.)\1{2,}/.test(password) ? -1 : 0;
        score += repeatPenalty;

        return score;
    };

    const testWeakness = (password: string) => {
        const score = calculateStrengthScore(password);

        if (score <= 2) {
            setWeakness({
                strength: dict.weak,
                bg: "bg-red-500/50",
            });
        } else if (score <= 4) {
            setWeakness({
                strength: dict.medium,
                bg: "bg-yellow-500/50",
            });
        } else {
            setWeakness({
                strength: dict.strong,
                bg: "bg-green-500/50",
            });
        }
    };

    const disableLastOption = () => {
        const activeOptions = [useUppercase, useLowercase, useNumbers, useSpecialChars];
        return activeOptions.filter(Boolean).length === 1;
    };
    

    useEffect(() => {
        const password = createPassword();

        setPassword(password);
        testWeakness(password);
    }, [length, refresh, useUppercase, useLowercase, useNumbers, useSpecialChars]);

    const handleRefresh = () => {
        setRefresh(!refresh);
        toast.success(dict.refreshMessage, {
            duration: 1300
        });
    }

    const handleCopy = () => {
        window.navigator.clipboard.writeText(password);
        setCopied(true);
        toast.success(dict.copyMessage, {
            duration: 1300
        });
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    const createPassword = () => {
        let charset = "";
        if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (useNumbers) charset += "0123456789";
        if (useSpecialChars) charset += "!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < length; i++) {
            const at = Math.floor(Math.random() * charset.length);
            password += charset.charAt(at);
        }
        return password;
    }
    return(
        <div className="my-20">
            <div className="col-span-10 space-y-10">
                <div id="password-area">
                    <div className="py-2 px-3 rounded-xl border border-gray-300">
                        <div className="flex justify-between items-center">
                            <div className="inline-flex gap-7 items-center">
                            <div className="select-none">
                                {weakness.strength === dict.weak && <TbLockDown className="w-6 h-6" />}
                                {weakness.strength === dict.medium && <TbLockExclamation className="w-6 h-6" />}
                                {weakness.strength === dict.strong && <TbLockCheck className="w-6 h-6" />}
                            </div>
                                <AnimatedShinyText className="text-xs sm:text-md md:text-lg text-center">
                                    {password}
                                </AnimatedShinyText>
                            </div>
                            <div className="inline-flex items-center gap-4">
                                <span className={cn(weakness?.bg, "py-1 px-3 rounded-md text-xs")}>{weakness?.strength}</span>
                                <button onClick={handleCopy} className="text-lg font-semibold">{
                                    copied ? (<LuClipboardCheck />) : (<LuClipboardCopy />)}</button>
                                <button onClick={handleRefresh} className="text-lg font-semibold"><LuRefreshCcw /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="generate-controls" className="space-y-10">
                    <div className="sm:flex gap-10 items-center">
                        <div className="">
                            <div className="inline-flex gap-1 items-center mb-3 sm:mb-0"><span>{dict.passwordLength}: </span> <strong>{length}</strong></div>
                        </div>
                        <div className="flex-grow flex gap-3 items-center">
                            <Button variant="secondary" size="icon" disabled={length === 1} onClick={handleDecrement} className={cn("", length === 1 && "text-muted-foreground")}>
                                -
                            </Button>
                            <Slider className="" onValueChange={handleSlideChange} max={maxLength} min={1} value={[length]} step={1} />
                            <Button variant="secondary" size="icon" disabled={length === maxLength} onClick={handleIncrement} className={cn("", length === maxLength && "text-muted-foreground")}>
                                +
                            </Button>
                        </div>
                    </div>
                    <div id="character-selections" className="flex flex-wrap gap-3 items-center justify-center">
                        <div>
                            <Button onClick={() => setUseUppercase(!useUppercase)} variant={useUppercase ? "default" : "ghost"} disabled={useUppercase && disableLastOption()}>
                                {dict.uppercase}
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => setUseLowercase(!useLowercase)} variant={useLowercase ? "default" : "ghost"} disabled={useLowercase && disableLastOption()}>
                                {dict.lowercase}
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => setUseNumbers(!useNumbers)} variant={useNumbers ? "default" : "ghost"} disabled={useNumbers && disableLastOption()}>
                                {dict.numbers}
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => setUseSpecialChars(!useSpecialChars)} variant={useSpecialChars ? "default" : "ghost"} disabled={useSpecialChars && disableLastOption()}>
                                {dict.symbols}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}