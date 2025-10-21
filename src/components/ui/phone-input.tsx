"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "@/components/ui/label";

interface CustomPhoneInputProps {
  label: string;
  required?: boolean;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  error?: string;
  placeholder?: string;
}

export function CustomPhoneInput({
  label,
  required,
  value,
  onChange,
  error,
  placeholder = "رقم الموبايل",
}: CustomPhoneInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[#202121] text-sm font-medium flex items-center gap-1">
        {label}
        {required && <span className="text-[#e52836]">*</span>}
      </Label>
      <PhoneInput
        dir="ltr"
        international
        countryCallingCodeEditable={false}
        defaultCountry="EG"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`phone-input ${
          error
            ? "border-[#e52836] focus:border-[#e52836] focus:ring-[#e52836]"
            : "border-[#d9d9d9] focus:border-[#2c7242] focus:ring-[#2c7242]"
        }`}
        style={
          {
            "--PhoneInput-color--focus": "#2c7242",
            "--PhoneInputCountryFlag-height": "1.2em",
          } as React.CSSProperties
        }
      />
      {error && <p className="text-[#e52836] text-xs mt-1">{error}</p>}

      <style jsx global>{`
        .phone-input .PhoneInputInput {
          border: 1px solid ${error ? "#e52836" : "#d9d9d9"};
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 14px;
          transition: all 0.2s;
          direction: ltr;
          text-align: left;
        }

        .phone-input .PhoneInputInput:focus {
          outline: none;
          border-color: ${error ? "#e52836" : "#2c7242"};
          box-shadow: 0 0 0 2px
            ${error ? "rgba(229, 40, 54, 0.2)" : "rgba(44, 114, 66, 0.2)"};
        }

        .phone-input .PhoneInputCountrySelect {
          border: 1px solid ${error ? "#e52836" : "#d9d9d9"};
          border-radius: 6px;
          padding: 8px;
          margin-right: 8px;
          background: white;
          transition: all 0.2s;
        }

        .phone-input .PhoneInputCountrySelect:focus {
          outline: none;
          border-color: ${error ? "#e52836" : "#2c7242"};
          box-shadow: 0 0 0 2px
            ${error ? "rgba(229, 40, 54, 0.2)" : "rgba(44, 114, 66, 0.2)"};
        }

        .phone-input .PhoneInputCountryFlag {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}
