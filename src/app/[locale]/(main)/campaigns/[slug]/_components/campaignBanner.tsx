import { Calendar, ChevronDown, Phone, Users } from "lucide-react";
import { MapPin } from "lucide-react";
import { Globe } from "lucide-react";
import Image from "next/image";
import campaignsTwo from "@/assets/CampaignsTwo.svg";
import { RatingOverview } from "./ratingOverview";
import { DonationModal } from "../../_components/donationModal";
export default function CampaignBanner() {
  return (
    <div className="bg-[#bb7b2f] text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-28">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={campaignsTwo}
                  alt="57357 logo"
                  width={300}
                  height={300}
                  className="w-32 h-32 md:w-60 md:h-60   lg:w-80 lg:h-80 object-contain"
                />
              </div>
              <div className="text-center md:text-right flex flex-col gap-3 max-w-md lg:max-w-lg">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                  مؤسسة مستشفى سرطان الأطفال
                </h2>
                <RatingOverview />
                <div className="flex flex-col gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white">
                    نبذة
                  </h1>
                  <p className="text-xs sm:text-sm text-white text-justify leading-relaxed">
                    أحد أكبر مستشفيات الأطفال في العالم يقع في القاهرة بمصر
                    ويختص في علاج سرطانات الأطفال. ويتميز هذا المستشفى بكونه بني
                    عن طريق التبرعات مع حملة دعائيّة كبيرة صاحبت بناءه.
                  </p>
                </div>
                <DonationModal />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3 text-xs sm:text-sm text-white w-full lg:w-auto lg:min-w-[280px]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>تاريخ التأسيس : يناير 2020</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>رقم الاتصال : 2010 مليون 20+</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>الأعضاء: 1000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>العنوان : القاهرة</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>التاريخ : 23/24/2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span>الموقع :</span>
              <a
                href="https://www.mobaahrt.com"
                className="underline text-white hover:text-gray-200 transition-colors break-all"
              >
                www.mobaahrt.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <a
                href="https://www.mobaahrt.com"
                className="underline text-white hover:text-gray-200 transition-colors"
              >
                عرض علي الخريطة
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
