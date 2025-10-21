import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
}: StepIndicatorProps) {
  const t = useTranslations("common.organizationForm.navigation");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <>
      {/* Desktop Step Indicator */}
      <div
        className="hidden lg:block relative h-full"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          className={`absolute ${
            isRTL ? "right-[19px]" : "left-[19px]"
          } top-10 bottom-0 h-[440px] w-[2px] bg-gray-300 z-0`}
        />

        <div className="flex flex-col gap-12 h-full py-8">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            const isPast = currentStep > step.number;

            return (
              <div
                key={step.number}
                className="relative flex items-start gap-5 z-10"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                    isCurrent
                      ? "bg-[#2c7242] text-white shadow-lg"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : isPast
                      ? "bg-[#2c7242] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    step.number
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-bold text-lg mb-1 ${
                      isCurrent
                        ? "text-[#2c7242]"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-800"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div
        className="lg:hidden bg-white rounded-lg shadow-lg p-6 mb-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2c7242]">
            {t("step")} {currentStep} {t("of")} {steps.length}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2c7242] transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-[#2c7242]">
              {currentStep}/{steps.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${
              currentStep === steps[currentStep - 1].number
                ? "bg-[#2c7242] text-white shadow-lg"
                : completedSteps.includes(steps[currentStep - 1].number)
                ? "bg-green-500 text-white"
                : currentStep > steps[currentStep - 1].number
                ? "bg-[#2c7242] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {completedSteps.includes(steps[currentStep - 1].number) ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              currentStep
            )}
          </div>
          <div>
            <h3 className="font-bold text-base text-[#2c7242]">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-500 text-xs">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
