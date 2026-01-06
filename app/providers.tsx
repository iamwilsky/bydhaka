'use client'

import { ReactNode } from 'react'

import { DataProvider } from '@/contexts/DataContext'
import { ModalProvider } from '@/contexts/ModalContext'

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <DataProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </DataProvider>
    )
}
