"use client";
import { z } from "zod";
import { useTranslations } from "next-intl";

export const getOrganizationFormSchema = () => {
  const t = useTranslations("common.organizationForm.validation");

  const paymentBankSchema = z.object({
    bankName: z.string().min(1, t("bankNameRequired")),
    accountNumber: z.string().min(1, t("accountNumberRequired")),
    iban: z.string().optional(),
  });

  const paymentCashSchema = z.object({
    addresseCash: z.string().min(1, t("addressRequired")),
    cityCash: z.string().min(1, t("cityRequired")),
    mobileCash: z.string().min(1, t("mobileNumberRequired")),
    altMobileCash: z.string().optional(),
    urlMapCash: z.string().optional(),
  });

  return z.object({
    // Step 1: Basic Information
    officialName: z.string().min(1, t("officialNameRequired")),
    licenseNumber: z.string().min(1, t("licenseNumberRequired")),
    address: z.string().min(1, t("addressRequired")),
    country: z.string().min(1, t("countryRequired")),
    city: z.string().min(1, t("cityRequired")),
    mobileCountryCode: z.string().min(1, t("countryCodeRequired")),
    mobileNumber: z.string().min(1, t("mobileNumberRequired")),
    altMobileCountryCode: z.string().optional(),
    altMobileNumber: z.string().optional(),
    creationDate: z.string().min(1, t("creationDateRequired")),

    // Step 2: More Information
    organizationType: z.string().min(1, t("organizationTypeRequired")),
    numberOfBeneficiaries: z
      .string()
      .min(1, t("numberOfBeneficiariesRequired")),
    projectDescription: z.string().min(1, t("projectDescriptionRequired")),
    websiteUrl: z
      .string()
      .url(t("invalidWebsiteUrl"))
      .optional()
      .or(z.literal("")),

    // Step 3: Bank Payment Methods
    paymentBank: z.array(paymentBankSchema).min(1, t("atLeastOneBankAccount")),

    // Step 4: Cash Payment Methods
    paymentCash: z.array(paymentCashSchema).optional(),

    // Step 5: Donations & Causes
    donationType: z.string().min(1, t("donationTypeRequired")),
    targetAmount: z.string().min(1, t("targetAmountRequired")),
    projectDuration: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: t("mustAgreeToTerms"),
    }),
  });
};

// Fallback schema for backward compatibility
const paymentBankSchema = z.object({
  bankName: z.string().min(1, "اسم البنك مطلوب"),
  accountNumber: z.string().min(1, "رقم الحساب مطلوب"),
  iban: z.string().optional(),
});

const paymentCashSchema = z.object({
  addresseCash: z.string().min(1, "العنوان مطلوب"),
  cityCash: z.string().min(1, "المدينة مطلوبة"),
  mobileCash: z.string().min(1, "رقم الموبايل مطلوب"),
  altMobileCash: z.string().optional(),
  urlMapCash: z.string().optional(),
});

export const organizationFormSchema = z.object({
  // Step 1: Basic Information
  officialName: z.string().min(1, "الاسم الرسمي مطلوب"),
  licenseNumber: z.string().min(1, "رقم الترخيص مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  country: z.string().min(1, "الدولة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  mobileCountryCode: z.string().min(1, "رمز الدولة مطلوب"),
  mobileNumber: z.string().min(1, "رقم الموبايل مطلوب"),
  altMobileCountryCode: z.string().optional(),
  altMobileNumber: z.string().optional(),
  creationDate: z.string().min(1, "تاريخ الإنشاء مطلوب"),

  // Step 2: More Information
  organizationType: z.string().min(1, "نوع المنظمة مطلوب"),
  numberOfBeneficiaries: z.string().min(1, "عدد المستفيدين مطلوب"),
  projectDescription: z.string().min(1, "وصف المشروع مطلوب"),
  websiteUrl: z
    .string()
    .url("الموقع الإلكتروني غير صحيح")
    .optional()
    .or(z.literal("")),

  // Step 3: Bank Payment Methods
  paymentBank: z
    .array(paymentBankSchema)
    .min(1, "يجب إضافة حساب بنكي واحد على الأقل"),

  // Step 4: Cash Payment Methods
  paymentCash: z.array(paymentCashSchema).optional(),

  // Step 5: Donations & Causes
  donationType: z.string().min(1, "نوع التبرع مطلوب"),
  targetAmount: z.string().min(1, "المبلغ المستهدف مطلوب"),
  projectDuration: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

export type OrganizationFormData = z.infer<typeof organizationFormSchema>;
export type PaymentBankData = z.infer<typeof paymentBankSchema>;
export type PaymentCashData = z.infer<typeof paymentCashSchema>;

// Step-specific validation schemas with translations
export const getStep1Schema = () => {
  const schema = getOrganizationFormSchema();
  return schema.pick({
    officialName: true,
    licenseNumber: true,
    address: true,
    country: true,
    city: true,
    mobileCountryCode: true,
    mobileNumber: true,
    creationDate: true,
  });
};

export const getStep2Schema = () => {
  const schema = getOrganizationFormSchema();
  return schema.pick({
    organizationType: true,
    numberOfBeneficiaries: true,
    projectDescription: true,
    websiteUrl: true,
  });
};

export const getStep3Schema = () => {
  const schema = getOrganizationFormSchema();
  return schema.pick({
    paymentBank: true,
  });
};

export const getStep4Schema = () => {
  const schema = getOrganizationFormSchema();
  return schema.pick({
    paymentCash: true,
  });
};

export const getStep5Schema = () => {
  const schema = getOrganizationFormSchema();
  return schema.pick({
    donationType: true,
    targetAmount: true,
    agreeToTerms: true,
  });
};

// Fallback step-specific validation schemas for backward compatibility
export const step1Schema = organizationFormSchema.pick({
  officialName: true,
  licenseNumber: true,
  address: true,
  country: true,
  city: true,
  mobileCountryCode: true,
  mobileNumber: true,
  creationDate: true,
});

export const step2Schema = organizationFormSchema.pick({
  organizationType: true,
  numberOfBeneficiaries: true,
  projectDescription: true,
  websiteUrl: true,
});

export const step3Schema = organizationFormSchema.pick({
  paymentBank: true,
});

export const step4Schema = organizationFormSchema.pick({
  paymentCash: true,
});

export const step5Schema = organizationFormSchema.pick({
  donationType: true,
  targetAmount: true,
  agreeToTerms: true,
});
