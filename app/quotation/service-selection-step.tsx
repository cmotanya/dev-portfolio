import { Lightbulb } from "lucide-react";
import React from "react";
import { services } from "../data/quotation";
import { cn } from "@/lib/utils";

interface SelectedServiceStepProps {
  onSelectService: (serviceId: string) => void;
  selectedServiceId: string | null;
}

const ServiceSelectionStep: React.FC<SelectedServiceStepProps> = ({
  onSelectService,
  selectedServiceId,
}) => {
  return (
    <div className="">
      <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
        <Lightbulb className="text-secondary mr-3 inline-block size-8 -translate-y-1 transform" />
        <h2 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent uppercase">
          Choose Your Service
        </h2>
      </div>

      <p className="text-secondary-text">
        Select the type of installation or service you need a quote for.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className={cn(
                "border-secondary/20 group bg-background hover:shadow-secondary/20 flex flex-col items-center rounded-xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                selectedServiceId === service.id &&
                  "border-secondary border-2 hover:-translate-y-0",
              )}
            >
              <Icon
                size={48}
                className={cn(
                  "group-hover:text-secondary mb-4 transition-all duration-300",
                  selectedServiceId === service.id
                    ? "text-primary group-hover:text-primary"
                    : "text-secondary/60",
                )}
              />
              <h3 className="text-primary text-xl font-semibold">
                {service.name}
              </h3>
              <p className="text-secondary-text text-sm">
                {service.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelectionStep;
