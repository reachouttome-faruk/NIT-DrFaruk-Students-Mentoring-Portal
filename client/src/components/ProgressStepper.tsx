import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  step: number;
}

interface ProgressStepperProps {
  currentStep: number;
  steps: Step[];
}

export default function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                  currentStep > step.step
                    ? "bg-primary border-primary text-primary-foreground shadow-primary/20"
                    : currentStep === step.step
                    ? "border-primary text-primary bg-primary/5 shadow-primary/10 ring-2 ring-primary/20"
                    : "border-border text-muted-foreground bg-card"
                )}
                data-testid={`step-indicator-${step.step}`}
              >
                {currentStep > step.step ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{step.step}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-3 text-xs font-medium text-center transition-colors duration-300",
                  currentStep >= step.step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-3 rounded-full bg-border overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500 ease-in-out",
                    currentStep > step.step ? "bg-primary w-full" : "bg-border w-0"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
