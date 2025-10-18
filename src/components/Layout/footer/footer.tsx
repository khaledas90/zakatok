import Image from "next/image";

import logoVisa from "@/assets/visa.svg";
import logoMasterCard from "@/assets/mastercard.svg";
import logoAmericanBanck from "@/assets/americanbank.svg";
import { getCurrentYear } from "@/lib/getCurrentYear";
import LanguageSwitcher from "../header/LanguageSwitcher";
export default function Footer() {
  return (
    <footer className="bg-[#2c7242] text-white mt-16">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-1.5">
          <div className="flex flex-col items-center lg:items-start space-y-3">
            <div className="lg:flex grid grid-cols-1 items-center gap-5">
              <div className="flex justify-center gap-2 rounded-md  ">
                <Image
                  src={logoAmericanBanck}
                  alt="American Express"
                  width={36}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src={logoVisa}
                  alt="Visa"
                  width={36}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src={logoMasterCard}
                  alt="MasterCard"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-white/70 font-medium">
                حقوق النشر © {getCurrentYear()} جميع الحقوق محفوظة
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end space-y-3">
            <div className="flex items-center gap-2">
              <LanguageSwitcher isFooter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
