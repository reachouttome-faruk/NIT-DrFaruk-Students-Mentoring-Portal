import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { MentoringReport } from "@shared/schema";

export function generatePDF(data: MentoringReport, logoDataUrl?: string, footerDataUrl?: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  const addFooter = () => {
    if (footerDataUrl) {
      const footerHeight = 8;
      doc.addImage(footerDataUrl, "PNG", 0, pageHeight - footerHeight, pageWidth, footerHeight);
    }
  };

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

  const studentDetailsBody: any[][] = [
    ["Student Name", data.studentDetails.studentName],
    ["USN", data.studentDetails.usn],
    ["Father's Name", data.studentDetails.fatherName],
    ["Class", data.studentDetails.class],
    ["Section", data.studentDetails.section],
    ["Attendance as on Date", data.studentDetails.attendanceAsOnDate],
    ["Current CGPA", data.studentDetails.currentCGPA],
    ["Mentoring Period", data.studentDetails.mentoringPeriod],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [["Field", "Value"]],
    body: studentDetailsBody,
    theme: "grid",
    headStyles: { fillColor: [33, 91, 145], fontSize: 10 },
    styles: { fontSize: 9 },
    margin: { left: 14, right: data.studentDetails.studentPhotoDataUrl ? 50 : 14, bottom: 15 },
    didDrawPage: addFooter,
  });

  if (data.studentDetails.studentPhotoDataUrl) {
    const photoX = pageWidth - 45;
    const photoY = yPos + 5;
    const photoWidth = 30;
    const photoHeight = 40;
    doc.addImage(data.studentDetails.studentPhotoDataUrl, "JPEG", photoX, photoY, photoWidth, photoHeight);
  }

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
    didDrawPage: addFooter,
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("IA Subject-wise Performance", 14, yPos);
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
      ["Technical / Programming / Aptitude Skills", otherParams.skillsPossession],
      ["Skill Based Certificates (online/offline)", otherParams.skillBasedCertificates],
      ["Participation in Co-Curricular Activities (Workshops, Seminars, Guest Lectures, etc.)", otherParams.coCurricularActivities],
      ["Participation in Extra-Curricular Activities (Sports, Cultural, NSS, etc.)", otherParams.extraCurricularActivities],
      ["Ranks / Awards / Recognitions at College or University Level", otherParams.ranksAwardsRecognitions],
      ["Internship/Training Undertaken", otherParams.internshipTrainingUndertaken],
      ["Internship/Training Duration", otherParams.internshipDuration],
      ["Internship/Training Skills Gained", otherParams.internshipSkillsGained],
      ["Project Title (Micro/Minor/Major)", otherParams.projectTitle],
      ["Project Description", otherParams.projectDescription],
      ["Technical Papers Published/Presented in Journal/Conferences/Symposium", otherParams.technicalPapersPublished],
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
    didDrawPage: addFooter,
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 120 },
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 20;

  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const signatureY = yPos;
  const col1X = 20;
  const col2X = 110;
  const lineWidth = 70;
  const rowHeight = 30;

  doc.text("Mentor Signature", col1X, signatureY);
  doc.line(col1X, signatureY + 15, col1X + lineWidth, signatureY + 15);

  doc.text("HOD Signature", col2X, signatureY);
  doc.line(col2X, signatureY + 15, col2X + lineWidth, signatureY + 15);

  doc.text("Dean Signature", col1X, signatureY + rowHeight);
  doc.line(col1X, signatureY + rowHeight + 15, col1X + lineWidth, signatureY + rowHeight + 15);

  doc.text("Principal Signature", col2X, signatureY + rowHeight);
  doc.line(col2X, signatureY + rowHeight + 15, col2X + lineWidth, signatureY + rowHeight + 15);

  return doc;
}
