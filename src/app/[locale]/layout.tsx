import type { Metadata } from "next";
import { Inter, Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import Providers from "./providers";
import { Toaster } from "sonner";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Layout/header/header";
import Footer from "@/components/Layout/footer/footer";
import StoreProvider from "@/store/StoreProvider";

// English font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Arabic fonts
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {};

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale }).catch(() => ({}));

  // Determine font classes based on locale
  const fontClasses =
    locale === "ar"
      ? `${cairo.variable} ${tajawal.variable}`
      : `${inter.variable}`;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={fontClasses}
        suppressHydrationWarning
      >
        <body className={`${fontClasses} antialiased`}>
          <StoreProvider>
            <Providers>
              <Header />
              <Toaster richColors position="top-right" />
              <SidebarProvider>{children}</SidebarProvider>
              <Footer />
            </Providers>
          </StoreProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
