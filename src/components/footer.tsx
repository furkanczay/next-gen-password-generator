import Link from "next/link";

export default function Footer(){
    const date = new Date();
    return(
        <footer className="bg-gray-800 text-white text-center py-5 flex flex-col gap-5 md:flex-row justify-between items-center px-5 md:px-20">
            <div>
                <p>{date.getFullYear()} Czaylabs | Tüm Hakları Saklıdır.</p>
            </div>
            <div className="inline-flex gap-5 items-center">
                <Link href="/privacy-policy" className="text-white hover:text-muted-foreground">Gizlilik Politikası</Link>
                <Link href="/terms-and-conditions" className="text-white hover:text-muted-foreground">Kullanım Şartları</Link>
            </div>
        </footer>
    )
}