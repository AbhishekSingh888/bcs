"use client";
import { useState } from 'react'
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from '@/components/nextauth/SessionProvider'
import { ThemeProvider } from 'next-themes'
import CustomCursor from '@/components/shared/CustomCursor'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import SmoothScrollProvider from '@/components/shared/SmoothScrollProvider'
import PageReveal from '@/components/shared/PageReveal'
import Loader from '@/components/shared/Loader'

export default function RootLayoutClient({
    children,
    session,
}: {
    children: React.ReactNode
    session: any
}) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <NextTopLoader color="#07be8a" />
            {loading && <Loader onFinish={() => setLoading(false)} />}
            {!loading && (
                <SessionProviderComp session={session}>
                    <ThemeProvider attribute='class' enableSystem={true} defaultTheme='light'>
                        <CustomCursor />
                        <Header />
                        <SmoothScrollProvider>
                            {children}
                        </SmoothScrollProvider>
                        <Footer />
                    </ThemeProvider>
                </SessionProviderComp>
            )}
        </>
    );
}