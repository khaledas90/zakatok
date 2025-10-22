import { CreditCard, Banknote, Building2 } from "lucide-react";

export default function AsideDetails() {
  return (
    <aside className="space-y-2">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-[#2c7242] mb-4 text-center">
          طرق الدفع المقبولة
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <span className="text-sm">ماستر</span>
            <CreditCard className="w-5 h-5 text-[#c48845]" />
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <span className="text-sm">كاش</span>
            <Banknote className="w-5 h-5 text-[#c48845]" />
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <span className="text-sm">تحويل بنكي</span>
            <Building2 className="w-5 h-5 text-[#c48845]" />
          </div>
        </div>
      </div>

      {/* Supported Organizations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-[#2c7242] mb-4 text-center">
          تبرعات مدعومة
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md">
            <div className="w-6 h-6 rounded-full bg-[#e52836]" />
            <span className="text-sm">الصليب الأحمر</span>
          </div>
          <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md">
            <div className="w-6 h-6 rounded-full bg-[#2c7242]" />
            <span className="text-sm">الأزهر</span>
          </div>
        </div>
      </div>

      {/* Cities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-[#2c7242] mb-4 text-center">
          المدن المتاحة
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md">
            <div className="w-6 h-6 rounded-full bg-[#c48845]" />
            <span className="text-sm">الجيزة</span>
          </div>
          <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md">
            <div className="w-6 h-6 rounded-full bg-[#c48845]" />
            <span className="text-sm">القاهرة</span>
          </div>
          <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md">
            <div className="w-6 h-6 rounded-full bg-[#c48845]" />
            <span className="text-sm">مدينة نصر</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
