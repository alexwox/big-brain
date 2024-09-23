
export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="container mx-auto">

            </nav>

            <div className="container mx-auto">
                {children}
            </div>
        </div>
    )
}