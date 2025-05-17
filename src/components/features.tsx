"use client"
import { GiKeyLock } from "react-icons/gi";
import FeatureCard from "./feature-card";
import { LuFingerprint } from "react-icons/lu";
import { BsShieldLock } from "react-icons/bs";
import { Locale } from "@/lib/utils";

export default function Features({ lang }: { lang: Locale }) {
    const features = {
        tr: {
            title: "Parolamızı neden güçlü seçmeliyiz?",
            description: "Parolanızı güçlü seçmek, hesaplarınızı ve kişisel bilgilerinizi korumak için önemlidir. Güçlü bir parola, hesabınızın güvende kalmasını sağlar ve bilgisayar korsanlarının hesabınıza erişmesini zorlaştırır.",
            parts: [
                {
                    title: "Uzun",
                    description: "Parola ne kadar uzunsa o kadar güvenli olur. Güçlü bir parola en az 10 karakter uzunluğunda olmalıdır.",
                    icon: GiKeyLock
                },
                {
                    title: "Karmaşık",
                    description: "Güçlü parolalar kelimelere veya isimlere benzememek için büyük ve küçük harfler, rakamlar, semboller gibi bir dizi tahmin edilemez karakter içermelidir.",
                    icon: BsShieldLock
                },
                {
                    title: "Benzersiz",
                    description: "Bir saldırı olması durumunda güvenlik açıklarını azaltmak için her bir hesabın ayrı birer güçlü parolaya sahip olması gerekir.",
                    icon: LuFingerprint
                }
            ]
        },
        en: {
            title: "Why should we choose a strong password?",
            description: "Choosing a strong password is important to protect your accounts and personal information. A strong password keeps your account safe and makes it difficult for hackers to access your account.",
            parts: [
                {
                    title: "Long",
                    description: "The longer the password, the more secure it is. A strong password should be at least 10 characters long.",
                    icon: GiKeyLock
                },
                {
                    title: "Complex",
                    description: "Strong passwords should contain a variety of unpredictable characters, such as uppercase and lowercase letters, numbers, and symbols, to avoid resembling words or names.",
                    icon: BsShieldLock
                },
                {
                    title: "Unique",
                    description: "To reduce security vulnerabilities in the event of an attack, each account should have a separate strong password.",
                    icon: LuFingerprint
                }
            ]
        }
    }
    return(
        <div className="bg-linear-to-t from-zinc-100/20 to-zinc-400/10 py-10 px-5 md:px-20 text-center rounded-xl border border-zinc-300 dark:border-zinc-700">
            <h1 className="text-3xl font-bold mt-10">{features[lang].title}</h1>
            <p className="my-10">{features[lang].description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
                {features[lang].parts.map((part, index) => (
                    <FeatureCard key={index} title={part.title} description={part.description} Icon={part.icon} />
                ))}
            </div>
        </div>
    )
}