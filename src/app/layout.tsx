import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SITE_BASE_PATH } from '@/lib/siteBasePath'
import Aoscompo from '@/lib/utils/aos'
import ScrollToTop from './components/scroll-to-top'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import ToasterContext from './api/contex/ToasetContex'
import { WalletConnectProvider } from './contexts/WalletConnectContext'
import ClientMountGate from './components/ClientMountGate'
import GlobalUnhandledRejectionGuard from './components/GlobalUnhandledRejectionGuard'

const font = Inter({ subsets: ['latin'] })


/** Static file in /public — avoids a webpack-split app/favicon route that breaks dev when .next is stale. */
export const metadata: Metadata = {
  applicationName: 'Fixforge-dApps',
  title: {
    default: 'Fixforge-dApps',
    template: '%s | Fixforge-dApps',
  },
  icons: {
    icon: [{ url: `${SITE_BASE_PATH}/favicon.ico`, sizes: 'any' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`} suppressHydrationWarning>
        <GlobalUnhandledRejectionGuard />
        <ClientMountGate
          fallback={
            <div
              className="min-h-screen bg-body-bg"
              suppressHydrationWarning
              aria-busy="true"
            />
          }
        >
          <WalletConnectProvider>
            <ToasterContext />
            <Aoscompo>
              <Header />
              {children}
              <Footer />
            </Aoscompo>
            <ScrollToTop />
          </WalletConnectProvider>
        </ClientMountGate>
      </body>
    </html>
  )
}
