// import Image from "next/image";
// import Link from "next/link";
// import { useCallback } from "react";
// import { ArrowRight, Star } from "lucide-react";
// import { useTranslations } from "next-intl";

// interface ProductCardProps {
//   // product: Product;
//   searchTerm?: string;
//   showArrow?: boolean;
//   variant?: "default" | "compact" | "detailed";
//   className?: string;
// }

// export function ResultSearchCard({
//   // product,
//   searchTerm = "",
//   showArrow = true,
//   variant = "default",
//   className = "",
// }: ProductCardProps) {
//   const t = useTranslations("common.header");
//   const calculateDiscountedPrice = useCallback(
//     (price: number, discount: number) => {
//       return price - (price * discount) / 100;
//     },
//     []
//   );

//   const highlightText = useCallback((text: string, highlight: string) => {
//     if (!highlight.trim()) return text;

//     const regex = new RegExp(`(${highlight})`, "gi");
//     const parts = text.split(regex);

//     return parts.map((part, index) =>
//       regex.test(part) ? (
//         <mark key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">
//           {part}
//         </mark>
//       ) : (
//         part
//       )
//     );
//   }, []);

//   const baseClasses = "block hover:bg-gray-50 transition-colors duration-200";
//   const variantClasses = {
//     default: "p-4 border-b border-gray-100 last:border-b-0",
//     compact: "p-3 border-b border-gray-100 last:border-b-0",
//     detailed: "p-6 border border-gray-200 rounded-lg mb-4 hover:shadow-md",
//   };

//   const imageSize =
//     variant === "compact"
//       ? "w-12 h-12"
//       : variant === "detailed"
//       ? "w-20 h-20"
//       : "w-16 h-16";

//   return (
//     <Link
//       href={`${
//         product.categoryTypeId === 1
//           ? `/buy/${encodeURIComponent(
//               product.categorySlug
//             )}/${encodeURIComponent(product.slug)}`
//           : product.categoryTypeId === 3
//           ? `/rent/${encodeURIComponent(
//               product.categorySlug
//             )}/${encodeURIComponent(product.slug)}`
//           : `/services/${encodeURIComponent(
//               product.categorySlug
//             )}/${encodeURIComponent(product.slug)}`
//       }`}
//       className={`${baseClasses} ${className}`}
//     >
//       <div className={variantClasses[variant]}>
//         <div className="flex items-center gap-4">
//           <div
//             className={`${imageSize} bg-gray-100 rounded-lg overflow-hidden flex-shrink-0`}
//           >
//             <Image
//               src={product.imagePath || "/placeholder.svg"}
//               alt={product.name}
//               width={
//                 variant === "detailed" ? 80 : variant === "compact" ? 48 : 64
//               }
//               height={
//                 variant === "detailed" ? 80 : variant === "compact" ? 48 : 64
//               }
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between mb-1">
//               <h4
//                 className={`font-medium text-gray-900 line-clamp-1 ${
//                   variant === "detailed"
//                     ? "text-lg"
//                     : variant === "compact"
//                     ? "text-sm"
//                     : "text-base"
//                 }`}
//               >
//                 {highlightText(product.name, searchTerm)}
//               </h4>
//             </div>
//             <p
//               className={`text-gray-600 line-clamp-1 mb-2 ${
//                 variant === "detailed" ? "text-base" : "text-sm"
//               }`}
//             >
//               {highlightText(product.nameAr, searchTerm)}
//             </p>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-1">
//                   <Star
//                     className={` ${
//                       variant === "compact" ? "h-3 w-3" : "h-3 w-3"
//                     }`}
//                   />
//                   <span
//                     className={`text-gray-600 ${
//                       variant === "compact" ? "text-xs" : "text-xs"
//                     }`}
//                   >
//                     {product.rating || 0}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-right">
//                 {product.discount > 0 ? (
//                   <div className="flex items-center gap-2">
//                     <span
//                       className={`font-bold text-[#3ABFF8] ${
//                         variant === "detailed" ? "text-base" : "text-sm"
//                       }`}
//                     >
//                       {t("AED")}{" "}
//                       {calculateDiscountedPrice(
//                         product.price,
//                         product.discount
//                       ).toLocaleString()}
//                     </span>
//                     <span
//                       className={`text-gray-500 line-through ${
//                         variant === "compact" ? "text-xs" : "text-xs"
//                       }`}
//                     >
//                       {t("AED")} {product.price.toLocaleString()}
//                     </span>
//                   </div>
//                 ) : (
//                   <span
//                     className={`font-bold text-[#3ABFF8] ${
//                       variant === "detailed" ? "text-base" : "text-sm"
//                     }`}
//                   >
//                     {t("AED")} {product.price.toLocaleString()}
//                   </span>
//                 )}
//                 {product.rent > 0 && (
//                   <div
//                     className={`text-green-600 ${
//                       variant === "compact" ? "text-xs" : "text-xs"
//                     }`}
//                   >
//                     {t("Rent")}: {t("AED")} {product.rent}/{t("month")}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {showArrow && (
//             <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// }
