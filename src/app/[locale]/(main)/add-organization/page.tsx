"use client";
import { getFormSteps } from "@/lib/constants/organization-form";
import { StepIndicator } from "./_components/StepIndicator";
import { OrganizationForm } from "./_components/OrganizationForm";
import { Building2, Users, Shield } from "lucide-react";
import { OrganizationFormData } from "@/lib/validations/organization-form";
import { useAddOrgnizationMutation } from "@/store/api/global/orgnization";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AddOrganizationForm() {
  const t = useTranslations("common.organizationForm");
  const [addOrganization, { isLoading, isError, error }] =
    useAddOrgnizationMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const FORM_STEPS = getFormSteps();

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      console.log("Form submitted:", data);
      const organizationData = {
        orgnizationName: data.officialName,
        licenseNumber: data.licenseNumber,
        address: data.address,
        country: data.country,
        city: data.city,
        mobileNumber: data.mobileNumber,
        altMobileNumber: data.altMobileNumber || "",
        creationDate: data.creationDate,
        websiteUrl: data.websiteUrl || "",
        aboutOgrnization: data.projectDescription,
        paymentBank: data.paymentBank,
        paymentCash: data.paymentCash || [],
        DonationsSupported: [data.donationType],
        citiesSupported: [data.city],
        agreeToTerms: data.agreeToTerms,
        totalDonations: 0,
        memberCount: parseInt(data.numberOfBeneficiaries),
        urlpaymentPage: "",
      };

      await addOrganization(organizationData).unwrap();
      alert(t("formSubmittedSuccessfully"));
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(t("formSubmissionError"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#2c7242]/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-[#2c7242]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#202121]">
                    {t("pageTitle")}
                  </h1>
                  <p className="text-gray-600 text-sm">{t("pageSubtitle")}</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{t("supportOrganizations")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{t("secureGuaranteed")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            <StepIndicator
              steps={FORM_STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#202121] mb-2">
                    {FORM_STEPS[currentStep - 1]?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {FORM_STEPS[currentStep - 1]?.description}
                  </p>
                </div>

                <OrganizationForm
                  onSubmit={onSubmit}
                  submitTitle={t("submitForm")}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  completedSteps={completedSteps}
                  setCompletedSteps={setCompletedSteps}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
