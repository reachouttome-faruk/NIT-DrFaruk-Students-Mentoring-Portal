import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { MentoringReport } from "@shared/schema";

export function generatePDF(
  data: MentoringReport, 
  logoDataUrl?: string, 
  footerDataUrl?: string, 
  watermarkDataUrl?: string,
  watermarkDimensions?: { width: number; height: number } | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  const addWatermark = () => {
    if (watermarkDataUrl && watermarkDimensions) {
      doc.saveGraphicsState();
      (doc as any).setGState(new (doc as any).GState({ opacity: 0.15 }));
      const aspectRatio = watermarkDimensions.width / watermarkDimensions.height;
      const watermarkWidth = pageWidth * 0.8;
      const watermarkHeight = watermarkWidth / aspectRatio;
      const xPos = (pageWidth - watermarkWidth) / 2;
      const yPos = (pageHeight - watermarkHeight) / 2;
      doc.addImage(watermarkDataUrl, "PNG", xPos, yPos, watermarkWidth, watermarkHeight);
      doc.restoreGraphicsState();
    }
  };

  const addFooter = () => {
    if (footerDataUrl) {
      const footerHeight = 8;
      doc.addImage(footerDataUrl, "PNG", 0, pageHeight - footerHeight, pageWidth, footerHeight);
    }
  };

  addWatermark();

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", pageWidth / 2 - 15, yPos, 30, 30);
    yPos += 35;
  }

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Navodaya Institute of Technology (Autonomous)", pageWidth / 2, yPos, { align: "center" });
  yPos += 7;

  doc.setFontSize(12);
  doc.text("Students Mentoring Report", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Department: ${data.studentDetails.mentorDepartment}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 12;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Student Details", 14, yPos);
  yPos += 5;

  autoTable(doc, {
    startY: yPos,
    head: [["Field", "Value"]],
    body: [
      ["Student Name", data.studentDetails.studentName],
      ["Class", data.studentDetails.class],
      ["Section", data.studentDetails.section],
      ["Attendance as on Date", data.studentDetails.attendanceAsOnDate],
      ["Current CGPA", data.studentDetails.currentCGPA],
      ["Mentoring Period", data.studentDetails.mentoringPeriod],
    ],
    theme: "grid",
    headStyles: { fillColor: [33, 91, 145], fontSize: 10 },
    styles: { fontSize: 9 },
    margin: { left: 14, right: 14, bottom: 15 },
    willDrawPage: addWatermark,
    didDrawPage: addFooter,
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Mentor Details", 14, yPos);
  yPos += 5;

  autoTable(doc, {
    startY: yPos,
    head: [["Field", "Value"]],
    body: [
      ["Mentor Name", data.studentDetails.mentorName],
      ["Designation", data.studentDetails.mentorDesignation],
      ["Department", data.studentDetails.mentorDepartment],
    ],
    theme: "grid",
    headStyles: { fillColor: [33, 91, 145], fontSize: 10 },
    styles: { fontSize: 9 },
    margin: { left: 14, right: 14, bottom: 15 },
    willDrawPage: addWatermark,
    didDrawPage: addFooter,
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  if (yPos > 250) {
    doc.addPage();
    addWatermark();
    yPos = 20;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Subject-wise Performance", 14, yPos);
  yPos += 5;

  autoTable(doc, {
    startY: yPos,
    head: [["Subject", "Code", "Teaching Faculty", "Weakness, if any", "Class Work & Assignments", "IA Performance", "Expected Outcome", "Mentor Remarks with Action Plan", "Status of Outcome"]],
    body: data.subjectPerformance.map((subject) => [
      subject.subjectName,
      subject.subjectCode,
      subject.teachingFaculty,
      subject.weaknesses,
      subject.classworkMarks,
      subject.internalMarks,
      subject.expectedOutcome,
      subject.mentorRemarks,
      subject.currentStatus,
    ]),
    theme: "grid",
    headStyles: { fillColor: [33, 91, 145], fontSize: 7 },
    styles: { fontSize: 7, cellPadding: 2 },
    margin: { left: 14, right: 14, bottom: 15 },
    willDrawPage: addWatermark,
    didDrawPage: addFooter,
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 15 },
      2: { cellWidth: 20 },
      3: { cellWidth: 22 },
      4: { cellWidth: 18 },
      5: { cellWidth: 15 },
      6: { cellWidth: 22 },
      7: { cellWidth: 30 },
      8: { cellWidth: 20 },
    },
  });

  doc.addPage();
  addWatermark();
  yPos = 20;

  if (data.backlogInformation && data.backlogInformation.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Backlog Information", 14, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [["S.No", "Name of the Subject with Code", "Action Proposed to Clear"]],
      body: data.backlogInformation.map((backlog, index) => [
        (index + 1).toString(),
        backlog.subjectNameWithCode,
        backlog.actionProposed,
      ]),
      theme: "grid",
      headStyles: { fillColor: [33, 91, 145], fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 3 },
      margin: { left: 14, right: 14, bottom: 15 },
      willDrawPage: addWatermark,
    didDrawPage: addFooter,
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 70 },
        2: { cellWidth: 90 },
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    if (yPos > 250) {
      doc.addPage();
      addWatermark();
      yPos = 20;
    }
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Other Parameters", 14, yPos);
  yPos += 5;

  const otherParams = data.otherParameters;
  autoTable(doc, {
    startY: yPos,
    head: [["Parameter", "Details"]],
    body: [
      ["Academic Track (SGPA-Semester-wise)", otherParams.academicTrackSGPA],
      ["Attendance and Alerts Issued (to Parents/Guardians)", otherParams.attendanceAlerts],
      ["Skill Possession - Technical / Programming Skills", otherParams.technicalProgrammingSkills],
      ["Skill Possession - Aptitude Skills", otherParams.aptitudeSkills],
      ["Participation in NIT Clubs or Certification Trainings", otherParams.clubsTrainings],
      ["Participation in Co-Curricular Activities (Workshops, Seminars, Guest Lectures, etc.)", otherParams.coCurricularActivities],
      ["Participation in Extra-Curricular Activities (Sports, Cultural, NSS, etc.)", otherParams.extraCurricularActivities],
      ["Ranks / Awards / Recognitions at College or University Level", otherParams.ranksAwardsRecognitions],
      ["Involvement in Any In-disciplinary Activities", otherParams.indisciplinaryActivities],
      ["Current Health Status", otherParams.currentHealthStatus],
      ["Number of Parent Visits to the College", otherParams.parentVisits],
      ["Other Identified & Resolved Academic/Non-Academic Issues", otherParams.otherIssuesResolved],
      ["Student Grievances (if any)", otherParams.studentGrievances],
    ],
    theme: "grid",
    headStyles: { fillColor: [33, 91, 145], fontSize: 10 },
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 14, right: 14, bottom: 15 },
    willDrawPage: addWatermark,
    didDrawPage: addFooter,
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 120 },
    },
  });

  return doc;
}
