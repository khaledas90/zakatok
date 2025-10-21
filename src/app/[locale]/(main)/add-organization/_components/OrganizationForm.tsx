"use client";
import React, { useState, useEffect } from "react";
import {
  useForm,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { CustomPhoneInput } from "@/components/ui/phone-input";
import {
  getOrganizationFormSchema,
  OrganizationFormData,
  PaymentBankData,
  PaymentCashData,
} from "@/lib/validations/organization-form";
import {
  getCountries,
  getDonationTypes,
  getFormSteps,
} from "@/lib/constants/organization-form";
import { useAddOrgnizationMutation } from "@/store/api/global/orgnization";
import { useTranslations } from "next-intl";
import Link from "next/link";

type InputGroupItem = {
  name: keyof OrganizationFormData;
  required: boolean;
  type?: "number" | "url" | "date";
};

interface OrganizationFormProps {
  onSubmit: SubmitHandler<OrganizationFormData>;
  submitTitle: string;
  initialValues?: Partial<OrganizationFormData>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
}

const firstInputGroup: InputGroupItem[] = [
  { name: "officialName", required: true },
  { name: "licenseNumber", required: true },
  { name: "address", required: true },
  { name: "country", required: true },
  { name: "city", required: true },
  { name: "creationDate", required: true, type: "date" },
];

const secondInputGroup: InputGroupItem[] = [
  { name: "organizationType", required: true },
  { name: "numberOfBeneficiaries", required: true, type: "number" },
  { name: "websiteUrl", required: false, type: "url" },
];

const fifthInputGroup: InputGroupItem[] = [
  { name: "targetAmount", required: true, type: "number" },
  { name: "projectDuration", required: false, type: "number" },
];

const getAvailableFields = (initialValues?: Partial<OrganizationFormData>) => {
  const availableFieldsSet = new Set([
    "officialName",
    "licenseNumber",
    "address",
    "country",
    "city",
    "mobileCountryCode",
    "mobileNumber",
    "altMobileCountryCode",
    "altMobileNumber",
    "creationDate",
    "organizationType",
    "numberOfBeneficiaries",
    "projectDescription",
    "websiteUrl",
    "paymentBank",
    "paymentCash",
    "donationType",
    "targetAmount",
    "projectDuration",
    "agreeToTerms",
  ]);

  if (!initialValues) return undefined;

  const obj: Record<string, unknown> = {};
  (Object.keys(initialValues) as (keyof OrganizationFormData)[]).forEach(
    (key) => {
      if (availableFieldsSet.has(key)) {
        obj[key] = initialValues[key];
      }
    }
  );

  return obj as OrganizationFormData;
};

const CustomTextField = ({
  input,
  register,
  title,
  errors,
}: {
  input: InputGroupItem;
  register: UseFormRegister<OrganizationFormData>;
  title: string;
  errors: FieldErrors<OrganizationFormData>;
}) => {
  return (
    <FormInput
      key={input.name}
      label={title}
      placeholder={title}
      required={input.required}
      type={input.type}
      {...register(input.name, {
        required: input.required,
        onChange: () => {},
      })}
      error={errors[input.name]?.message}
    />
  );
};

export function OrganizationForm({
  onSubmit,
  submitTitle,
  initialValues,
  currentStep,
  setCurrentStep,
  completedSteps,
  setCompletedSteps,
}: OrganizationFormProps) {
  const t = useTranslations("common.organizationForm");
  const [addOrganization, { isLoading, isError, error }] =
    useAddOrgnizationMutation();

  const COUNTRIES = getCountries();
  const DONATION_TYPES = getDonationTypes();
  const organizationFormSchema = getOrganizationFormSchema();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    mode: "onTouched",
    values: getAvailableFields(initialValues),
    reValidateMode: "onChange",
    defaultValues: {
      officialName: "",
      licenseNumber: "",
      address: "",
      country: "egypt",
      city: "",
      mobileCountryCode: "+20",
      mobileNumber: "",
      altMobileCountryCode: "+20",
      altMobileNumber: "",
      creationDate: "",
      organizationType: "",
      numberOfBeneficiaries: "",
      projectDescription: "",
      websiteUrl: "",
      paymentBank: [
        {
          bankName: "",
          accountNumber: "",
          iban: "",
        },
      ],
      paymentCash: [],
      donationType: "",
      targetAmount: "",
      projectDuration: "",
      agreeToTerms: false,
    },
  });

  const formData = watch();

  const getFieldsForStep = (step: number): (keyof OrganizationFormData)[] => {
    switch (step) {
      case 1:
        return [
          "officialName",
          "licenseNumber",
          "address",
          "country",
          "city",
          "mobileCountryCode",
          "mobileNumber",
          "creationDate",
        ];
      case 2:
        return [
          "organizationType",
          "numberOfBeneficiaries",
          "projectDescription",
        ];
      case 3:
        return ["paymentBank"];
      case 4:
        return ["paymentCash"];
      case 5:
        return ["donationType", "targetAmount", "agreeToTerms"];
      default:
        return [];
    }
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (isError && error) {
      console.error("Organization creation error:", error);
    }
  }, [isError, error]);

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            {firstInputGroup.slice(0, 2).map((input) => (
              <CustomTextField
                errors={errors}
                key={input.name}
                input={input}
                title={
                  input.name === "officialName"
                    ? t("step1.officialName")
                    : t("step1.licenseNumber")
                }
                register={register}
              />
            ))}
          </div>

          <CustomTextField
            errors={errors}
            input={firstInputGroup[2]}
            title={t("step1.address")}
            register={register}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormSelect
              label={t("step1.country")}
              required
              options={COUNTRIES}
              {...register("country")}
              error={errors.country?.message}
            />
            <CustomTextField
              errors={errors}
              input={firstInputGroup[4]}
              title={t("step1.city")}
              register={register}
            />
          </div>

          <CustomPhoneInput
            label={t("step1.mobileNumber")}
            required
            value={formData.mobileNumber}
            onChange={(value) => setValue("mobileNumber", value || "")}
            error={errors.mobileNumber?.message}
          />

          <CustomPhoneInput
            label={t("step1.altMobileNumber")}
            value={formData.altMobileNumber}
            onChange={(value) => setValue("altMobileNumber", value || "")}
            error={errors.altMobileNumber?.message}
          />

          <div className="space-y-2">
            <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
              {t("step1.creationDate")}
              <span className="text-[#e52836]">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("creationDate")}
                className={`w-full px-3 py-2 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  errors.creationDate
                    ? "border-[#e52836] focus:border-[#e52836] focus:ring-[#e52836]"
                    : "border-[#d9d9d9] focus:border-[#2c7242] focus:ring-[#2c7242]"
                }`}
              />
            </div>
            {errors.creationDate && (
              <p className="text-[#e52836] text-xs mt-1">
                {errors.creationDate.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-6 animate-fade-in">
          <CustomTextField
            errors={errors}
            input={secondInputGroup[0]}
            title={t("step2.organizationType")}
            register={register}
          />

          <CustomTextField
            errors={errors}
            input={secondInputGroup[1]}
            title={t("step2.numberOfBeneficiaries")}
            register={register}
          />

          <div className="space-y-2">
            <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
              {t("step2.projectDescription")}
              <span className="text-[#e52836]">*</span>
            </label>
            <textarea
              {...register("projectDescription")}
              placeholder={t("step2.projectDescriptionPlaceholder")}
              rows={5}
              className={`w-full px-3 py-2 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none ${
                errors.projectDescription
                  ? "border-[#e52836] focus:border-[#e52836] focus:ring-[#e52836]"
                  : "border-[#d9d9d9] focus:border-[#2c7242] focus:ring-[#2c7242]"
              }`}
            />
            {errors.projectDescription && (
              <p className="text-[#e52836] text-xs mt-1">
                {errors.projectDescription.message}
              </p>
            )}
          </div>

          <CustomTextField
            errors={errors}
            input={secondInputGroup[2]}
            title={t("step2.websiteUrl")}
            register={register}
          />
        </div>
      );
    }

    if (currentStep === 3) {
      const paymentBanks = watch("paymentBank") || [];

      const addBankAccount = () => {
        const newBanks = [
          ...paymentBanks,
          { bankName: "", accountNumber: "", iban: "" },
        ];
        setValue("paymentBank", newBanks);
      };

      const removeBankAccount = (index: number) => {
        if (paymentBanks.length > 1) {
          const newBanks = paymentBanks.filter((_, i) => i !== index);
          setValue("paymentBank", newBanks);
        }
      };

      const updateBankAccount = (
        index: number,
        field: keyof PaymentBankData,
        value: string
      ) => {
        const newBanks = [...paymentBanks];
        newBanks[index] = { ...newBanks[index], [field]: value };
        setValue("paymentBank", newBanks);
      };

      return (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#202121]">
              {t("step3.bankAccounts")}
            </h3>
            <button
              type="button"
              onClick={addBankAccount}
              className="px-4 py-2 bg-[#2c7242] text-white rounded-md hover:bg-[#2c7242]/90 transition-all"
            >
              {t("step3.addBankAccount")}
            </button>
          </div>

          {paymentBanks.map((bank, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#202121]">
                  {t("step3.bankAccount")} {index + 1}
                </h4>
                {paymentBanks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBankAccount(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    {t("step3.delete")}
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
                    {t("step3.bankName")}
                    <span className="text-[#e52836]">*</span>
                  </label>
                  <input
                    type="text"
                    value={bank.bankName}
                    onChange={(e) =>
                      updateBankAccount(index, "bankName", e.target.value)
                    }
                    placeholder={t("step3.bankNamePlaceholder")}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
                    {t("step3.accountNumber")}
                    <span className="text-[#e52836]">*</span>
                  </label>
                  <input
                    type="text"
                    value={bank.accountNumber}
                    onChange={(e) =>
                      updateBankAccount(index, "accountNumber", e.target.value)
                    }
                    placeholder={t("step3.accountNumberPlaceholder")}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#202121] text-sm font-medium">
                  {t("step3.iban")}
                </label>
                <input
                  type="text"
                  value={bank.iban || ""}
                  onChange={(e) =>
                    updateBankAccount(index, "iban", e.target.value)
                  }
                  placeholder={t("step3.ibanPlaceholder")}
                  className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                />
              </div>
            </div>
          ))}

          {errors.paymentBank && (
            <p className="text-[#e52836] text-xs mt-1">
              {errors.paymentBank.message}
            </p>
          )}
        </div>
      );
    }

    if (currentStep === 4) {
      const paymentCash = watch("paymentCash") || [];

      const addCashLocation = () => {
        const newCash = [
          ...paymentCash,
          {
            addresseCash: "",
            cityCash: "",
            mobileCash: "",
            altMobileCash: "",
            urlMapCash: "",
          },
        ];
        setValue("paymentCash", newCash);
      };

      const removeCashLocation = (index: number) => {
        const newCash = paymentCash.filter((_, i) => i !== index);
        setValue("paymentCash", newCash);
      };

      const updateCashLocation = (
        index: number,
        field: keyof PaymentCashData,
        value: string
      ) => {
        const newCash = [...paymentCash];
        newCash[index] = { ...newCash[index], [field]: value };
        setValue("paymentCash", newCash);
      };

      return (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#202121]">
              {t("step4.cashPaymentLocations")}
            </h3>
            <button
              type="button"
              onClick={addCashLocation}
              className="px-4 py-2 bg-[#2c7242] text-white rounded-md hover:bg-[#2c7242]/90 transition-all"
            >
              {t("step4.addCashLocation")}
            </button>
          </div>

          {paymentCash.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>{t("step4.noCashLocations")}</p>
              <p className="text-sm">{t("step4.canAddCashLocations")}</p>
            </div>
          )}

          {paymentCash.map((cash, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#202121]">
                  {t("step4.cashLocation")} {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeCashLocation(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  {t("step3.delete")}
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
                    {t("step4.address")}
                    <span className="text-[#e52836]">*</span>
                  </label>
                  <input
                    type="text"
                    value={cash.addresseCash}
                    onChange={(e) =>
                      updateCashLocation(index, "addresseCash", e.target.value)
                    }
                    placeholder={t("step4.addressPlaceholder")}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
                      {t("step4.city")}
                      <span className="text-[#e52836]">*</span>
                    </label>
                    <input
                      type="text"
                      value={cash.cityCash}
                      onChange={(e) =>
                        updateCashLocation(index, "cityCash", e.target.value)
                      }
                      placeholder={t("step4.cityPlaceholder")}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
                      {t("step4.mobileNumber")}
                      <span className="text-[#e52836]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={cash.mobileCash}
                      onChange={(e) =>
                        updateCashLocation(index, "mobileCash", e.target.value)
                      }
                      placeholder={t("step4.mobileNumberPlaceholder")}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[#202121] text-sm font-medium">
                      {t("step4.altMobileNumber")}
                    </label>
                    <input
                      type="tel"
                      value={cash.altMobileCash || ""}
                      onChange={(e) =>
                        updateCashLocation(
                          index,
                          "altMobileCash",
                          e.target.value
                        )
                      }
                      placeholder={t("step4.altMobileNumberPlaceholder")}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#202121] text-sm font-medium">
                      {t("step4.mapUrl")}
                    </label>
                    <input
                      type="url"
                      value={cash.urlMapCash || ""}
                      onChange={(e) =>
                        updateCashLocation(index, "urlMapCash", e.target.value)
                      }
                      placeholder={t("step4.mapUrlPlaceholder")}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#2c7242] focus:border-[#2c7242]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {errors.paymentCash && (
            <p className="text-[#e52836] text-xs mt-1">
              {errors.paymentCash.message}
            </p>
          )}
        </div>
      );
    }

    if (currentStep === 5) {
      const selectedDonationType = watch("donationType");

      return (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            <label className="text-[#202121] text-sm font-medium flex items-center gap-1">
              {t("step5.donationType")}
              <span className="text-[#e52836]">*</span>
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {DONATION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("donationType", type)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedDonationType === type
                      ? "border-[#2c7242] bg-[#2c7242]/5 text-[#2c7242]"
                      : "border-[#d9d9d9] hover:border-[#2c7242]/50"
                  }`}
                >
                  <div className="font-medium">{type}</div>
                </button>
              ))}
            </div>
            {errors.donationType && (
              <p className="text-[#e52836] text-xs mt-1">
                {errors.donationType.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CustomTextField
              errors={errors}
              input={fifthInputGroup[0]}
              title={t("step5.targetAmount")}
              register={register}
            />
            <CustomTextField
              errors={errors}
              input={fifthInputGroup[1]}
              title={t("step5.projectDuration")}
              register={register}
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-[#d9d9d9]">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                {...register("agreeToTerms")}
                className="mt-1 w-5 h-5 text-[#2c7242] border-[#d9d9d9] rounded focus:ring-[#2c7242]"
              />
              <label htmlFor="terms" className="text-sm text-[#202121]">
                {t("step5.agreeToTerms")}{" "}
                <Link
                  href="/terms-of-service"
                  className="text-[#2c7242] hover:underline"
                >
                  {t("step5.termsAndConditions")}
                </Link>{" "}
                و{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#2c7242] hover:underline"
                >
                  {t("step5.privacyPolicy")}
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-[#e52836] text-xs">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {renderStepContent()}

        {isError && (
          <div className="text-[#e52836] text-sm py-4">
            {t("formSubmissionError")}
          </div>
        )}

        <div className="flex flex-col items-center gap-4 sm:flex-row justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 border rounded-md transition-all ${
              currentStep === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-[#2c7242] text-[#2c7242] hover:bg-[#2c7242] hover:text-white"
            }`}
          >
            {t("navigation.previous")}
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              {t("navigation.step")} {currentStep} {t("navigation.of")} {5}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2c7242] text-white hover:bg-[#2c7242]/90"
            }`}
          >
            {isLoading
              ? t("navigation.sending")
              : currentStep === 5
              ? submitTitle
              : t("navigation.next")}
          </button>
        </div>
      </div>
    </form>
  );
}
