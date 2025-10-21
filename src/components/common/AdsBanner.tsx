"use client";
import React from "react";
import Image from "next/image";

interface AdsBannerProps {
  type?: "image" | "text" | "both";
  imageSrc?: string;
  text?: string;
  width?: string | number;
  height?: string | number;
  bgColor?: string;
  textColor?: string;
  borderRadius?: string | number;
  fontSize?: string | number;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({
  type = "text",
  imageSrc,
  text = "مساحة إعلانية",
  width = "250px",
  height = "100px",
  bgColor = "#2c7242",
  textColor = "white",
  borderRadius = "8px",
  fontSize = "1.25rem",
  orientation = "vertical",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width,
        height,
        backgroundColor: bgColor,
        borderRadius,
        flexDirection: orientation === "vertical" ? "column" : "row",
      }}
    >
      {type === "image" && imageSrc && (
        <Image
          src={imageSrc}
          alt="Ad banner"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      )}

      {type === "text" && (
        <p
          className={`text-center font-semibold ${
            orientation === "vertical"
              ? "rotate-180 [writing-mode:vertical-rl]"
              : ""
          }`}
          style={{ color: textColor, fontSize }}
        >
          {text}
        </p>
      )}

      {type === "both" && (
        <div
          className={`flex ${
            orientation === "vertical" ? "flex-col" : "flex-row"
          } items-center justify-center gap-2`}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="Ad banner"
              width={120}
              height={120}
              className="object-contain rounded-md"
            />
          )}
          <p
            className={`font-semibold ${
              orientation === "vertical"
                ? "rotate-180 [writing-mode:vertical-rl]"
                : ""
            }`}
            style={{ color: textColor, fontSize }}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdsBanner;
