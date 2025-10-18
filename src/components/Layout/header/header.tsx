import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNavigationClient from "./MobileNavigation";
import { getLocale, getTranslations } from "next-intl/server";
import SearchInput from "./searsh/SearchInput";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const t = await getTranslations("common.header");
  const locale = await getLocale();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 lg:h-20">
          <Link href="/" className="flex  items-center space-x-2 flex-shrink-0">
            <Image
              src={logo}
              alt="Zakatok"
              width={35}
              height={35}
              className=" object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-4 gap-3">
            <Link
              href={`/${locale}/`}
              className="text-gray-700 hover:text-[#3ABFF8] transition-colors duration-200 font-medium"
            >
              {t("Home")}
            </Link>
            <Link
              href={`/${locale}/countries`}
              className="text-gray-700 hover:text-[#3ABFF8] transition-colors duration-200 font-medium"
            >
              {t("Countries")}
            </Link>
            <Link
              href={`/${locale}/campaigns`}
              className="text-gray-700 hover:text-[#3ABFF8] transition-colors duration-200 font-medium"
            >
              {t("Campaigns")}
            </Link>

            <Link
              href={`/${locale}/contact-us`}
              className="text-gray-700 hover:text-[#3ABFF8] transition-colors duration-200 font-medium"
            >
              {t("Contact Us")}
            </Link>
          </nav>
          <div className="lg:hidden hidden xl:flex search-input flex-1 max-w-md mx-8">
            <SearchInput />
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button variant="default" className="text-white !bg-[#2c7242]">
              أضف منطقة
            </Button>
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <LanguageSwitcher />
            <MobileNavigationClient />
          </div>
        </div>
      </div>
    </header>
  );
}
