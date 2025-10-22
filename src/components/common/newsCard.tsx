import Image from "next/image";
import newsLogo from "@/assets/news.svg";
interface NewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function NewsCard({
  imageUrl,
  title,
  description,
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageUrl || newsLogo}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-[#5b5d6b] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
