import Features from "@/components/features";
import PasswordGenerate from "@/components/PasswordGenerate";
import { getDictionary, Locale } from "@/lib/utils";

export default async function Home({ params }: Readonly<{ params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params
  const dict = await getDictionary(lang);
  return (
    <div>

      <div className="flex flex-col gap-3 md:px-20 px-5">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">{dict.title}</h1>
          <p>{dict.description}</p>
        </div>
        <PasswordGenerate dict={dict} />
      </div>
      <Features lang={lang} />
    </div>
  );
}
