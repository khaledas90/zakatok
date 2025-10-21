import { useTranslations } from "next-intl";

export const getCountries = () => {
  const t = useTranslations("common.organizationForm.constants.countries");
  return [
    { value: "egypt", label: t("egypt") },
    { value: "saudi", label: t("saudi") },
    { value: "uae", label: t("uae") },
    { value: "jordan", label: t("jordan") },
    { value: "qatar", label: t("qatar") },
  ];
};

export const getCountryCodes = () => {
  const t = useTranslations("common.organizationForm.constants.countryCodes");
  return [
    { value: "+20", label: t("egypt") },
    { value: "+966", label: t("saudi") },
    { value: "+971", label: t("uae") },
    { value: "+962", label: t("jordan") },
    { value: "+974", label: t("qatar") },
  ];
};

export const getDonationTypes = () => {
  const t = useTranslations("common.organizationForm.constants.donationTypes");
  return [t("zakat"), t("sadaqah"), t("orphanSponsorship"), t("emergencyAid")];
};

export const getFormSteps = () => {
  const t = useTranslations("common.organizationForm.constants.formSteps");
  return [
    {
      number: 1,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      number: 2,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      number: 3,
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      number: 4,
      title: t("step4.title"),
      description: t("step4.description"),
    },
    {
      number: 5,
      title: t("step5.title"),
      description: t("step5.description"),
    },
  ];
};
