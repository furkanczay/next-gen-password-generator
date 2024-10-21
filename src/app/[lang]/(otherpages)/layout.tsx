export default function OtherPagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
        <div className="px-5 md:px-20">
            {children}
        </div>
    )
}
