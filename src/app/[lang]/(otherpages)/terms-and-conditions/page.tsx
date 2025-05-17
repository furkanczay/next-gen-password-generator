import { termsOfConditions } from "@/config/terms-and-conditions";
import { Locale } from "@/lib/utils";

export default async function TermsAndConditions({ params }: Readonly<{ params: Promise<{ lang: Locale }> }>) {
    const { lang } = await params;
    const document = termsOfConditions[lang];
    return(
        <div className="flex flex-col gap-5 my-52">
            <span className="text-muted-foreground">{document.lastUpdate}</span>
            <h1 className="text-xl font-bold">{document.title}</h1>

            <p>{document.content}</p>

            {document.terms.map((term, index) => (
                <div key={index}>
                    <h1>{term.name}</h1>
                    <p>{term.content}</p>
                </div>
            ))}
        </div>
    )
}