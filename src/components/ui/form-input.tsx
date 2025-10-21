"use client";

import type React from "react";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="text-[#202121] text-sm font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[#e52836]">*</span>}
        </Label>
        <Input
          ref={ref}
          className={`border-[#d9d9d9] focus:border-[#2c7242] focus:ring-[#2c7242] transition-all ${
            error
              ? "border-[#e52836] focus:border-[#e52836] focus:ring-[#e52836]"
              : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[#e52836] text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
