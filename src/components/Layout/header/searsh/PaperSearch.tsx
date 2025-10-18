import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, X } from "lucide-react";

// import { ResultSearchCard } from "./ResultSearchCard";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SearchDropdownProps {
  searchTerm: string;
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  // products?: Product[];
  isLoading?: boolean;
  totalCount?: number;
}

export function SearchDropdown({
  searchTerm,
  isOpen,
  onClose,
  onClear,
}: SearchDropdownProps) {
  const t = useTranslations("common.header");

  if (!isOpen || !searchTerm.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <Card className="border-2 border-[#3ABFF8]/20 shadow-2xl max-h-[80vh] overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#3ABFF8]/5 to-[#FF8C00]/5">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-[#3ABFF8]" />
              <span className="font-medium text-gray-900">
                {t("Search Results for")} "{searchTerm}"
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                aria-label="exit"
                size="sm"
                onClick={() => {
                  onClose();
                  onClear();
                }}
                className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {true && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ABFF8] mx-auto mb-4"></div>
              <p className="text-gray-600">{t("Searching products")}</p>
            </div>
          )}
          {!true && [""]?.length === 0 && searchTerm.trim() && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("No results found")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("Try searching for something else")}
              </p>
              <Button
                variant="outline"
                onClick={onClear}
                className="text-[#3ABFF8] border-[#3ABFF8] hover:bg-[#3ABFF8]/10"
              >
                {t("Clear Search")}
              </Button>
            </div>
          )}
          {/* {!true && [""] && [""].length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {[""].length > 5
                ? [""]
                    .slice(0, 5)
                    .map((product) => (
                      <ResultSearchCard
                        key={product.id || product.name}
                        product={product}
                      />
                    ))
                : data.content.map((product) => (
                    <ResultSearchCard
                      key={product.id || product.name}
                      product={product}
                    />
                  ))}
            </div>
          )} */}

          {/* {!isLoading && (data?.content?.length ?? 0) > 5 && (
            <div className="p-4 border-t bg-gray-50">
              <Link href={`/products?search=${encodeURIComponent(searchTerm)}`}>
                <Button className="w-full bg-[#3ABFF8] hover:bg-[#2DA5D8] text-white">
                  View All Results ({data?.content?.length ?? 0}
                  )
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
