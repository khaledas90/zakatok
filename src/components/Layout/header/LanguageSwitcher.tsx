"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import EnFlag from "@/assets/en-flag.svg";
import ArFlag from "@/assets/ar-flag.svg";
import Image from "next/image";
import { invalidateAllQueries } from "@/store/api";

const LanguageSwitcher = ({ isFooter }: { isFooter?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("common.header");
  const router = useRouter();

  const languages = [
    {
      code: "en",
      nativeName: "English",
      flagImage: EnFlag,
    },
    {
      code: "ar",
      nativeName: "العربية",
      flagImage: ArFlag,
    },
  ];

  const currentLang = pathname.startsWith("/ar") ? "ar" : "en";
  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        title="Language"
        aria-label="Language"
        type="button"
        className={`group relative flex items-center gap-2 px-1 py-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out`}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2">
          <Image
            src={currentLang === "ar" ? ArFlag : EnFlag}
            alt="Flag"
            width={20}
            height={20}
          />
          <span
            className={`${
              isFooter
                ? "text-white group-hover:text-green-200"
                : "text-gray-700 group-hover:text-gray-900"
            } text-sm font-medium transition-colors`}
          >
            {currentLanguage?.nativeName}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-all duration-300 ${
            isFooter
              ? `text-white ${
                  isOpen
                    ? "rotate-180 text-green-200"
                    : "group-hover:text-green-200"
                }`
              : `text-gray-500 ${
                  isOpen ? "rotate-180 text-[" : "group-hover:text-gray-700"
                }`
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`absolute z-40 top-full mt-2 w-36 border border-gray-200/50 shadow-2xl bg-white overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
        style={{
          top: isFooter ? "-81px" : "",
          left: isFooter ? (currentLang === "ar" ? "10px" : "-20px") : "",
        }}
      >
        {languages.map((lang, index) => (
          <Link
            key={lang.code}
            href={`/${lang.code}`}
            className={`group flex items-center gap-3 px-3 py-2 transition-all duration-200 ease-in-out ${
              currentLang === lang.code
                ? "bg-gray-100 text-black"
                : "hover:bg-gray-50 text-[ hover:text-gray-900"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);

              const pathWithoutLang = pathname.replace(/^\/(ar|en)/, "");
              const newPath = `/${lang.code}${pathWithoutLang || "/"}`;

              router.push(newPath);
              invalidateAllQueries();
            }}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-around items-center gap-2">
              <Image src={lang.flagImage} alt="Flag" width={20} height={20} />
              <div
                className={`font-medium text-nowrap text-sm ${
                  currentLang === lang.code ? "text-[#2c7242]" : "text-gray-900"
                }`}
              >
                {lang.nativeName}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
