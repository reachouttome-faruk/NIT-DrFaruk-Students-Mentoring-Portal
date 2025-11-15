import { z } from "zod";

export const studentDetailsSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  attendanceAsOnDate: z.string().min(1, "Attendance as on date is required"),
  currentCGPA: z.string().min(1, "Current CGPA is required"),
  mentoringPeriod: z.string().min(1, "Mentoring period is required"),
  mentorName: z.string().min(1, "Mentor name is required"),
  mentorDesignation: z.string().min(1, "Designation is required"),
  mentorDepartment: z.string().min(1, "Department is required"),
});

export const subjectPerformanceSchema = z.object({
  id: z.string(),
  subjectName: z.string().min(1, "Subject name is required"),
  subjectCode: z.string().min(1, "Subject code is required"),
  teachingFaculty: z.string().min(1, "Teaching faculty is required"),
  weaknesses: z.string(),
  classworkMarks: z.string(),
  internalMarks: z.string(),
  expectedOutcome: z.string(),
  mentorRemarks: z.string(),
  currentStatus: z.string(),
});

export const backlogSchema = z.object({
  id: z.string(),
  subjectNameWithCode: z.string().min(1, "Subject name with code is required"),
  actionProposed: z.string().min(1, "Action proposed is required"),
});

export const otherParametersSchema = z.object({
  academicTrack: z.string(),
  attendance: z.string(),
  technicalSkills: z.string(),
  aptitudeSkills: z.string(),
  programmingSkills: z.string(),
  coCurricularActivities: z.string(),
  extraCurricularActivities: z.string(),
  ranksAwards: z.string(),
  disciplinaryIssues: z.string(),
  healthGraph: z.string(),
  parentVisits: z.string(),
  otherIssues: z.string(),
});

export const mentoringReportSchema = z.object({
  studentDetails: studentDetailsSchema,
  subjectPerformance: z.array(subjectPerformanceSchema),
  backlogInformation: z.array(backlogSchema),
  otherParameters: otherParametersSchema,
});

export type StudentDetails = z.infer<typeof studentDetailsSchema>;
export type SubjectPerformance = z.infer<typeof subjectPerformanceSchema>;
export type BacklogInformation = z.infer<typeof backlogSchema>;
export type OtherParameters = z.infer<typeof otherParametersSchema>;
export type MentoringReport = z.infer<typeof mentoringReportSchema>;
