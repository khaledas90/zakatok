"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchDropdown } from "./PaperSearch";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { uiActions } from "@/store/uiSlice";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function SearchInput() {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const interactingWithDropdownRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const t = useTranslations("common.header");

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (open || isFocused) {
      setOpen(false);
      setIsFocused(false);
    }
  }, [pathname]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        router.push(`/products?search=${encodeURIComponent(inputValue)}`);
        dispatch(uiActions.setIsNavigating(true));
      }
      const input = e.currentTarget.querySelector("input") as HTMLInputElement;
      input?.blur();
    },
    [inputValue, dispatch, router]
  );

  const handleSearchClose = useCallback(() => {
    setOpen(false);
    setInputValue("");
    setIsFocused(false);
  }, []);

  const handleSearchClear = useCallback(() => {
    setInputValue("");
    setOpen(false);
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setInputValue(value);
    }, 400);
  };

  return (
    <div className="w-full relative">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full"
        role="search"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder={t("Search")}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setOpen(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              if (!interactingWithDropdownRef.current) {
                setIsFocused(false);
                setOpen(false);
              }
            }, 150);
          }}
          className="pl-4 pr-12 border-gray-300 focus:ring-0 transition-colors duration-200"
          autoComplete="off"
          spellCheck={false}
          aria-label="Search products"
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-[#3ABFF8] transition-colors duration-200"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {isFocused && (
        <div
          className={clsx(
            "transition-all duration-300",
            open ? "visible opacity-100" : "invisible opacity-0"
          )}
          onMouseDown={() => {
            interactingWithDropdownRef.current = true;
          }}
          onMouseUp={() => {
            setTimeout(() => {
              interactingWithDropdownRef.current = false;
            }, 0);
          }}
        >
          <SearchDropdown
            searchTerm={inputValue}
            isOpen={open}
            onClose={handleSearchClose}
            onClear={handleSearchClear}
          />
        </div>
      )}
    </div>
  );
}
