import type { Metadata } from "next";
import { Lexend } from "next/font/google"
import "@/app/globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers";
import { Locale } from "@/lib/utils";
import LocaleSwitcher from "@/components/language-switcher";
import ThemeChanger from "@/components/modetoggle";
import Footer from "@/components/footer";
import Link from "next/link";

const font = Lexend({
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Czaylabs | Random Password Generator",
  description: "Create strong and secure passwords to keep your account safe online.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: { lang: Locale }
}>) {
  return (
    <html lang={params.lang}>
      <body
        className={`${font.className} antialiased`}
      >
        <Providers>
            <div className="max-w-screen-xl mx-auto">
              <div className="flex justify-between items-center px-5 md:px-20 my-10">
                  <Link href="/" className="inline-flex flex-col gap-1 items-center sm:flex-row sm:items-end">
                      <span className="text-4xl font-bold">CzayLabs</span> 
                      <div className="text-md">
                          <span className="text-yellow-400 text-md">P</span>
                          <span className="text-xs">assword</span> 
                          <span className="text-yellow-400">G</span>
                          <span className="text-xs">enerator</span>
                      </div>
                  </Link>
                  <div className="inline-flex gap-5 items-center">
                      <LocaleSwitcher locale={params.lang} />
                      <ThemeChanger />
                  </div>
              </div>
              {children}
              <Footer />
            </div>
            <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
