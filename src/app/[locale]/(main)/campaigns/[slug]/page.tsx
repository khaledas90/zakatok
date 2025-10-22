import ReviewCard from "@/components/common/reviewCard";
import { ReviewForm } from "./_components/reviewForm";
import AsideDetails from "./_components/asideDetails";
import CampaignBanner from "./_components/campaignBanner";
import NewsSlider from "./_components/NewsSlider";

export default function CampaignDetails() {
  const contentCards = [
    {
      imageUrl: "",
      title: "فعالية خيرية",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
    {
      imageUrl: "",
      title: "فعالية خيرية",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
    {
      imageUrl: "",
      title: "فعالية خيرية",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
  ];

  const reviews = [
    {
      userName: "نور نور بكيت",
      userAvatar: "",
      date: "أضيف في: يناير 8, 2023",
      rating: 5,
      comment:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي (21)",
      likes: 21,
    },
    {
      userName: "نور نور بكيت",
      userAvatar: "",
      date: "أضيف في: يناير 8, 2023",
      rating: 5,
      comment:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي",
      likes: 21,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <CampaignBanner />

      <main className="lg:container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className=" block lg:hidden">
            <AsideDetails />
          </div>
          <div className="flex-1 ">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2c7242]">
                  أخر الأخبار
                </h2>
                <a
                  href="#"
                  className="text-[#c48845] hover:text-[#2c7242] transition-colors"
                >
                  عرض المزيد
                </a>
              </div>
              <NewsSlider news={contentCards} />
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2c7242]">
                  آراء المتبرعين
                </h2>
                <a
                  href="#"
                  className="text-[#c48845] hover:text-[#2c7242] transition-colors"
                >
                  عرض المزيد
                </a>
              </div>
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>

            <ReviewForm />
          </div>

          <div className="lg:w-80 hidden lg:block">
            <AsideDetails />
          </div>
        </div>
      </main>
    </div>
  );
}
