import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers";
import { Locale } from "@/lib/utils";
import LocaleSwitcher from "@/components/language-switcher";
import ThemeChanger from "@/components/modetoggle";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";

const font = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Czaylabs | Random Password Generator",
  description:
    "Create strong and secure passwords to keep your account safe online.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Providers>
          <div className="max-w-(--breakpoint-xl) mx-auto">
            <div className="flex justify-between items-center px-5 md:px-20 my-10">
              <Link
                href="/"
                className="inline-flex flex-col gap-1 items-center sm:flex-row sm:items-end"
              >
                <Image
                  src="/pwg-czaylabs-logo.svg"
                  alt="PWG Czaylabs Logo"
                  width={100}
                  height={100}
                  className="h-90 w-auto rounded-full dark:invert"
                />
              </Link>
              <div className="inline-flex gap-5 items-center">
                <LocaleSwitcher locale={lang} />
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
