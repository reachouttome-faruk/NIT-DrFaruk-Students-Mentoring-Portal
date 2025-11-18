import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import ProgressStepper from "@/components/ProgressStepper";
import StudentDetailsForm from "@/components/StudentDetailsForm";
import SubjectPerformanceForm from "@/components/SubjectPerformanceForm";
import BacklogInformationForm from "@/components/BacklogInformationForm";
import OtherParametersForm from "@/components/OtherParametersForm";
import type { StudentDetails, SubjectPerformance, BacklogInformation, OtherParameters, MentoringReport } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const ReportPreview = lazy(() => import("@/components/ReportPreview"));

const STEPS = [
  { label: "Student Details", step: 1 },
  { label: "Subject Performance", step: 2 },
  { label: "Backlog Information", step: 3 },
  { label: "Other Parameters", step: 4 },
  { label: "Review", step: 5 },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [backlogInformation, setBacklogInformation] = useState<BacklogInformation[]>([]);
  const [otherParameters, setOtherParameters] = useState<OtherParameters | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string>("");
  const [footerDataUrl, setFooterDataUrl] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const cachedLogo = sessionStorage.getItem("logoDataUrl");
    const cachedFooter = sessionStorage.getItem("footerDataUrl");

    if (cachedLogo) {
      setLogoDataUrl(cachedLogo);
    } else {
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = logoImg.width;
        canvas.height = logoImg.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(logoImg, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          setLogoDataUrl(dataUrl);
          sessionStorage.setItem("logoDataUrl", dataUrl);
        }
      };
      logoImg.src = "/navodaya-logo.png";
    }

    if (cachedFooter) {
      setFooterDataUrl(cachedFooter);
    } else {
      const footerImg = new Image();
      footerImg.crossOrigin = "anonymous";
      footerImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = footerImg.width;
        canvas.height = footerImg.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(footerImg, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          setFooterDataUrl(dataUrl);
          sessionStorage.setItem("footerDataUrl", dataUrl);
        }
      };
      footerImg.src = "/footer-bar.png";
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("mentoringData");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.studentDetails) setStudentDetails(data.studentDetails);
      if (data.subjectPerformance) setSubjectPerformance(data.subjectPerformance);
      if (data.backlogInformation) setBacklogInformation(data.backlogInformation);
      if (data.otherParameters) setOtherParameters(data.otherParameters);
      if (data.currentStep) setCurrentStep(data.currentStep);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(
        "mentoringData",
        JSON.stringify({ studentDetails, subjectPerformance, backlogInformation, otherParameters, currentStep })
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [studentDetails, subjectPerformance, backlogInformation, otherParameters, currentStep]);

  const handleStudentDetailsSubmit = useCallback((data: StudentDetails) => {
    setStudentDetails(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSubjectPerformanceSubmit = useCallback((data: SubjectPerformance[]) => {
    setSubjectPerformance(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleBacklogInformationSubmit = useCallback((data: BacklogInformation[]) => {
    setBacklogInformation(data);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleOtherParametersSubmit = useCallback((data: OtherParameters) => {
    setOtherParameters(data);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    if (!studentDetails || !otherParameters) return;

    const reportData: MentoringReport = {
      studentDetails,
      subjectPerformance,
      backlogInformation,
      otherParameters,
    };

    const { generatePDF } = await import("@/lib/pdfGenerator");
    const doc = generatePDF(reportData, logoDataUrl, footerDataUrl);
    doc.save(`Mentoring_Report_${studentDetails.studentName.replace(/\s+/g, "_")}.pdf`);
    
    toast({
      title: "PDF Generated",
      description: "The mentoring report has been downloaded successfully.",
    });
  }, [studentDetails, otherParameters, subjectPerformance, backlogInformation, logoDataUrl, footerDataUrl, toast]);

  const handleEdit = useCallback(() => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleNewEntry = useCallback(() => {
    setStudentDetails(null);
    setSubjectPerformance([]);
    setBacklogInformation([]);
    setOtherParameters(null);
    setCurrentStep(1);
    localStorage.removeItem("mentoringData");
    window.scrollTo({ top: 0, behavior: "instant" });
    toast({
      title: "New Entry",
      description: "Ready to create a new mentoring report.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <img 
                src="/navodaya-logo.png" 
                alt="Navodaya Institute of Technology (Autonomous)" 
                className="w-12 h-12 object-contain" 
                data-testid="logo-nit" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Navodaya Institute of Technology (Autonomous)
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Students Mentoring Portal</p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressStepper currentStep={currentStep} steps={STEPS} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <StudentDetailsForm defaultValues={studentDetails || undefined} onSubmit={handleStudentDetailsSubmit} />
          </div>
        )}

        {currentStep === 2 && (
          <SubjectPerformanceForm
            defaultValues={subjectPerformance.length > 0 ? subjectPerformance : undefined}
            onSubmit={handleSubjectPerformanceSubmit}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <BacklogInformationForm
            defaultValues={backlogInformation.length > 0 ? backlogInformation : undefined}
            onSubmit={handleBacklogInformationSubmit}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto">
            <OtherParametersForm
              defaultValues={otherParameters || undefined}
              onSubmit={handleOtherParametersSubmit}
              onBack={() => setCurrentStep(3)}
            />
          </div>
        )}

        {currentStep === 5 && studentDetails && otherParameters && (
          <Suspense fallback={
            <div className="space-y-4 max-w-4xl mx-auto">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          }>
            <ReportPreview
              data={{
                studentDetails,
                subjectPerformance,
                backlogInformation,
                otherParameters,
              }}
              onDownload={handleDownloadPDF}
              onEdit={handleEdit}
              onNewEntry={handleNewEntry}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}
