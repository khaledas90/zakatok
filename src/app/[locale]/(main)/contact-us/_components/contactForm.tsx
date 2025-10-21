"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Shield,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations("common.contactUs");

  const contactSchema = z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    email: z.string().email(t("validation.emailInvalid")),
    phone: z.string().min(1, t("validation.phoneRequired")),
    subject: z.string().min(1, t("validation.subjectRequired")),
    message: z.string().min(10, t("validation.messageMinLength")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label={t("fullName")}
            placeholder={t("fullNamePlaceholder")}
            required
            {...register("name")}
            error={errors.name?.message}
          />
          <FormInput
            label={t("emailField")}
            placeholder={t("emailFieldPlaceholder")}
            type="email"
            required
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label={t("phoneField")}
            placeholder={t("phoneFieldPlaceholder")}
            type="tel"
            required
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FormInput
            label={t("subject")}
            placeholder={t("subjectPlaceholder")}
            required
            {...register("subject")}
            error={errors.subject?.message}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
            {t("message")}
            <span className="text-[#e52836]">*</span>
          </label>
          <textarea
            {...register("message")}
            placeholder={t("messagePlaceholder")}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none ${
              errors.message
                ? "border-[#e52836] focus:border-[#e52836] focus:ring-[#e52836]"
                : "border-[#d9d9d9] focus:border-[#2c7242] focus:ring-[#2c7242]"
            }`}
          />
          {errors.message && (
            <p className="text-[#e52836] text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-lg bg-[#2c7242] hover:bg-[#245a35] text-white transition-all"
        >
          <Send className="w-5 h-5 ml-2" />
          {t("sendMessageButton")}
        </Button>
      </form>
    </>
  );
}
