import { ReactNode } from 'react';
import { SideNav } from './side-nav';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex gap-24 container mx-auto pt-12">
            <SideNav />
            
            {children}
            
        </div>
    )
}