import { Download, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MentoringReport } from "@shared/schema";

interface ReportPreviewProps {
  data: MentoringReport;
  onDownload: () => void;
  onEdit: () => void;
  onNewEntry: () => void;
}

export default function ReportPreview({ data, onDownload, onEdit, onNewEntry }: ReportPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Mentoring Report Preview</h2>
          <p className="text-muted-foreground mt-1">Review the report before downloading</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit} data-testid="button-edit">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button onClick={onDownload} data-testid="button-download">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <img 
                src="/navodaya-logo.png" 
                alt="Navodaya Institute of Technology (Autonomous)" 
                className="w-20 h-20 object-contain" 
              />
            </div>
            <h3 className="text-xl font-semibold">Navodaya Institute of Technology (Autonomous)</h3>
            <p className="text-lg">Students Mentoring Report</p>
            <p className="text-sm text-muted-foreground">Department: {data.studentDetails.mentorDepartment}</p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Name:</span>
                  <span data-testid="text-student-name">{data.studentDetails.studentName}</span>
                  <span className="font-medium">USN:</span>
                  <span data-testid="text-usn">{data.studentDetails.usn}</span>
                  <span className="font-medium">Father's Name:</span>
                  <span data-testid="text-father-name">{data.studentDetails.fatherName}</span>
                  <span className="font-medium">Class:</span>
                  <span data-testid="text-class">{data.studentDetails.class}</span>
                  <span className="font-medium">Section:</span>
                  <span data-testid="text-section">{data.studentDetails.section}</span>
                  <span className="font-medium">Attendance as on Date:</span>
                  <span data-testid="text-attendance-date">{data.studentDetails.attendanceAsOnDate}</span>
                  <span className="font-medium">Current CGPA:</span>
                  <span data-testid="text-cgpa">{data.studentDetails.currentCGPA}</span>
                  <span className="font-medium">Mentoring Period:</span>
                  <span data-testid="text-mentoring-period">{data.studentDetails.mentoringPeriod}</span>
                </div>
              </div>
              {data.studentDetails.studentPhotoDataUrl && (
                <div className="w-24 h-32 flex-shrink-0">
                  <img 
                    src={data.studentDetails.studentPhotoDataUrl} 
                    alt="Student" 
                    className="w-full h-full object-cover rounded-md border-2 border-border"
                    data-testid="img-student-photo"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentor Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Name:</span>
              <span data-testid="text-mentor-name">{data.studentDetails.mentorName}</span>
              <span className="font-medium">Designation:</span>
              <span data-testid="text-designation">{data.studentDetails.mentorDesignation}</span>
              <span className="font-medium">Department:</span>
              <span data-testid="text-department">{data.studentDetails.mentorDepartment}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>IA Subject-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Teaching Faculty</TableHead>
                  <TableHead>Weakness, if any, in the Subject</TableHead>
                  <TableHead>Class Work & Assignments</TableHead>
                  <TableHead>IA Performance</TableHead>
                  <TableHead>Expected Outcome</TableHead>
                  <TableHead>Mentor Remarks with Action Plan to Achieve the Outcome</TableHead>
                  <TableHead>Status of Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.subjectPerformance.map((subject, index) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.subjectName}</TableCell>
                    <TableCell>{subject.subjectCode}</TableCell>
                    <TableCell>{subject.teachingFaculty}</TableCell>
                    <TableCell className="max-w-[200px]">{subject.weaknesses}</TableCell>
                    <TableCell>{subject.classworkMarks}</TableCell>
                    <TableCell>{subject.internalMarks}</TableCell>
                    <TableCell className="max-w-[200px]">{subject.expectedOutcome}</TableCell>
                    <TableCell className="max-w-[250px]">{subject.mentorRemarks}</TableCell>
                    <TableCell className="max-w-[200px]">{subject.currentStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {data.backlogInformation && data.backlogInformation.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Backlog Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.No</TableHead>
                    <TableHead>Name of the Subject with Code</TableHead>
                    <TableHead>Action Proposed to Clear</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.backlogInformation.map((backlog, index) => (
                    <TableRow key={backlog.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell data-testid={`text-backlog-subject-${index}`}>{backlog.subjectNameWithCode}</TableCell>
                      <TableCell className="max-w-[400px]" data-testid={`text-backlog-action-${index}`}>{backlog.actionProposed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Other Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-1/3">Academic Track (SGPA-Semester-wise)</TableCell>
                <TableCell>{data.otherParameters.academicTrackSGPA}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Attendance and Alerts Issued (to Parents/Guardians)</TableCell>
                <TableCell>{data.otherParameters.attendanceAlerts}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technical / Programming / Aptitude Skills</TableCell>
                <TableCell>{data.otherParameters.skillsPossession}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Skill Based Certificates (online/offline)</TableCell>
                <TableCell>{data.otherParameters.skillBasedCertificates}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Participation in Co-Curricular Activities (Workshops, Seminars, Guest Lectures, etc.)</TableCell>
                <TableCell>{data.otherParameters.coCurricularActivities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Participation in Extra-Curricular Activities (Sports, Cultural, NSS, etc.)</TableCell>
                <TableCell>{data.otherParameters.extraCurricularActivities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Ranks / Awards / Recognitions at College or University Level</TableCell>
                <TableCell>{data.otherParameters.ranksAwardsRecognitions}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Internship/Training Undertaken</TableCell>
                <TableCell>{data.otherParameters.internshipTrainingUndertaken}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Internship/Training Duration</TableCell>
                <TableCell>{data.otherParameters.internshipDuration}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Internship/Training Skills Gained</TableCell>
                <TableCell>{data.otherParameters.internshipSkillsGained}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Project Title (Micro/Minor/Major)</TableCell>
                <TableCell>{data.otherParameters.projectTitle}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Project Description</TableCell>
                <TableCell>{data.otherParameters.projectDescription}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Technical Papers Published/Presented in Journal/Conferences/Symposium</TableCell>
                <TableCell>{data.otherParameters.technicalPapersPublished}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Involvement in Any In-disciplinary Activities</TableCell>
                <TableCell>{data.otherParameters.indisciplinaryActivities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Current Health Status</TableCell>
                <TableCell>{data.otherParameters.currentHealthStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Number of Parent Visits to the College</TableCell>
                <TableCell>{data.otherParameters.parentVisits}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Other Identified & Resolved Academic/Non-Academic Issues</TableCell>
                <TableCell>{data.otherParameters.otherIssuesResolved}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Student Grievances (if any)</TableCell>
                <TableCell>{data.otherParameters.studentGrievances}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onNewEntry} size="lg" data-testid="button-new-entry">
          Create New Entry
        </Button>
      </div>
    </div>
  );
}
