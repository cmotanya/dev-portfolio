"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, FileText } from "lucide-react";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import ServiceSelectionStep from "./service-selection-step";
import ItemSelectionStep from "./item-selection-step";
import { QSelectedItem } from "@/lib/types";

const QuotationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  // using a specific key for selectedItems to force re-render/reset when service changes
  const [selectedItemKey, setSelectedItemKey] = useState(0);
  const [selectedItems, setSelectedItems] = useState<QSelectedItem[]>([]);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedItems([]); // Clear selected items when service changes
    setSelectedItemKey((prev) => prev + 1);
    setCurrentStep(2);
  };

  const handleUpdateItems = (newItems: QSelectedItem[]) => {
    setSelectedItems(newItems);
  };

  const handleGoToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="flex items-center justify-center gap-4 md:justify-start">
        <FileText size={45} className="text-secondary shrink-0 -rotate-6" />
        <h1 className="from-secondary via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
          Quotation
        </h1>
      </div>

      {/* progressive step indicator */}
      <div className="relative mx-auto mt-12 max-w-3xl border-4 border-transparent">
        <div className="absolute left-1/2 flex w-full -translate-x-1/2 items-center justify-around">
          <Fade direction="up" triggerOnce cascade damping={0.3} duration={300}>
            {[1, 2, 3].map((step_num) => (
              <div
                key={step_num}
                className={cn(
                  "relative z-50 flex size-12 items-center justify-center rounded-full text-xl transition-all duration-300 ease-in-out",
                  currentStep === step_num
                    ? "bg-primary text-background scale-130 font-medium md:scale-120"
                    : "bg-secondary/30 text-primary",
                  currentStep > step_num && "bg-primary text-background",
                )}
              >
                {step_num}
              </div>
            ))}
          </Fade>
        </div>
      </div>

      {/* dynamic step content */}
      <div className="border-secondary/10 shadow-secondary/20 bg-secondary/5 relative mt-18 rounded-lg border p-2 shadow-sm md:p-6">
        {currentStep === 1 && (
          <ServiceSelectionStep
            onSelectService={handleSelectService}
            selectedServiceId={selectedServiceId}
          />
        )}
        {currentStep === 2 && selectedServiceId && (
          <ItemSelectionStep
            key={selectedItemKey}
            selectedServiceId={selectedServiceId}
            selectedItems={selectedItems}
            onUpdateItems={handleUpdateItems}
            onNext={handleGoToNextStep}
          />
        )}
        {/* {currentStep === 3 && <SummaryStep />} */}

        {/* navigation buttons (only for step 2 back) */}
        {currentStep > 1 && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="bg-primary group text-background mr-auto flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-3 hover:shadow-lg"
            >
              <ArrowLeft
                size={14}
                className="transition-all duration-300 ease-out group-hover:-translate-x-1.5"
              />
              Back
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuotationPage;
