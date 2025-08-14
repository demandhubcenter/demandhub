
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export function MobileHeader() {
    return (
        <header className="md:hidden flex items-center h-12 mb-4 -ml-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Menu</span>
        </header>
    )
}
