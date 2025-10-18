"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import { Search, Phone, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SearchInput from "./searsh/SearchInput";

export default function MobileNavigationClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMenuItems, setOpenMenuItems] = useState(new Set<string>());
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useParams();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations("common.header");

  const toggleMenuItem = (itemTitle: string) => {
    setOpenMenuItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  const handleSheetClose = () => {
    setIsOpen(false);
    setOpenMenuItems(new Set());
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="xl:hidden  p-2"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-label="Toggle Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] overflow-auto sm:w-[400px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <VisuallyHidden>
            <DialogTitle>Navigation Menu</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center pb-4 border-b">
              <Link
                href="/"
                className="flex items-center space-x-2 flex-shrink-0"
              >
                <Image src={logo} alt="Logo" width={60} height={35} />
              </Link>
            </div>
            <div className="py-4 border-b">
              <div className="relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputValue.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(
                        inputValue
                      )}`;
                    }
                    const input = e.currentTarget.querySelector(
                      "input"
                    ) as HTMLInputElement;
                    input?.blur();
                  }}
                >
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder={t("Search")}
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      setInputValue(value);
                      if (debounceTimer.current) {
                        clearTimeout(debounceTimer.current);
                      }
                      debounceTimer.current = setTimeout(() => {
                        setInputValue(value);
                      }, 200);
                    }}
                    autoComplete="off"
                    spellCheck={false}
                    className="pl-4 pr-10 border-gray-300 focus:border-[#3ABFF8]"
                    aria-label="Search medical equipment, services, and products"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3ABFF8] transition-colors duration-200"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="py-4 border-b">
              <nav className="space-y-2">
                <Link
                  href={`/${locale}/`}
                  className="block px-3 py-2 text-gray-700 hover:text-main hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={handleSheetClose}
                >
                  {t("Home")}
                </Link>
                <Link
                  href={`/${locale}/countries`}
                  className="block px-3 py-2 text-gray-700 hover:text-main hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={handleSheetClose}
                >
                  {t("Countries")}
                </Link>
                <Link
                  href={`/${locale}/campaigns`}
                  className="block px-3 py-2 text-gray-700 hover:text-main hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={handleSheetClose}
                >
                  {t("Campaigns")}
                </Link>
                <Link
                  href={`/${locale}/contact-us`}
                  className="block px-3 py-2 text-gray-700 hover:text-main hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={handleSheetClose}
                >
                  {t("Contact Us")}
                </Link>
              </nav>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Button
                variant="default"
                className="text-white w-full !bg-[#2c7242]"
              >
                أضف منطقة
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-sm xl:hidden">
          <div className="container mx-auto px-4 pb-3">
            <div className="relative">
              <SearchInput />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
