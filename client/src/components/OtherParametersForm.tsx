import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otherParametersSchema, type OtherParameters } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OtherParametersFormProps {
  defaultValues?: OtherParameters;
  onSubmit: (data: OtherParameters) => void;
  onBack: () => void;
}

export default function OtherParametersForm({ defaultValues, onSubmit, onBack }: OtherParametersFormProps) {
  const form = useForm<OtherParameters>({
    resolver: zodResolver(otherParametersSchema),
    defaultValues: defaultValues || {
      academicTrackSGPA: "",
      attendanceAlerts: "",
      technicalProgrammingSkills: "",
      aptitudeSkills: "",
      clubsTrainings: "",
      coCurricularActivities: "",
      extraCurricularActivities: "",
      ranksAwardsRecognitions: "",
      internshipTrainingUndertaken: "",
      internshipDuration: "",
      internshipSkillsGained: "",
      projectTitle: "",
      projectDescription: "",
      projectOutcome: "",
      indisciplinaryActivities: "",
      currentHealthStatus: "",
      parentVisits: "",
      otherIssuesResolved: "",
      studentGrievances: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="academicTrackSGPA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Track (SGPA-Semester-wise)</FormLabel>
                  <FormDescription>Enter semester-wise SGPA, e.g., "Sem 1: 8.5, Sem 2: 8.8"</FormDescription>
                  <FormControl>
                    <Textarea placeholder="Sem 1: 8.5, Sem 2: 8.8..." data-testid="input-academic-track" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendanceAlerts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance and Alerts Issued (to Parents/Guardians)</FormLabel>
                  <FormDescription>Mention attendance percentage and any alerts given to parents/guardians</FormDescription>
                  <FormControl>
                    <Textarea placeholder="85% attendance, Alert issued on..." data-testid="input-attendance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Possession (Based on Assessment Tests)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="technicalProgrammingSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technical / Programming Skills</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Proficient in Java, C++, Python..." data-testid="input-technical-skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aptitudeSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aptitude Skills</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Logical reasoning: Good, Quantitative: Average..." data-testid="input-aptitude-skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activities & Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="clubsTrainings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participation in NIT Clubs or Certification Done</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Member of Coding Club, AWS Certification..." data-testid="input-clubs-trainings" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coCurricularActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participation in Co-Curricular Activities (Workshops, Seminars, Guest Lectures, etc.)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Attended AI workshop, Guest lecture on..." data-testid="input-cocurricular" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extraCurricularActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participation in Extra-Curricular Activities (Sports, Cultural, NSS, etc.)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="NSS volunteer, Cricket team member..." data-testid="input-extracurricular" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ranksAwardsRecognitions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ranks / Awards / Recognitions at College or University Level</FormLabel>
                  <FormControl>
                    <Textarea placeholder="1st Prize in Hackathon..." data-testid="input-awards" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Internship/Training & Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Internship/Training</h4>
              <FormField
                control={form.control}
                name="internshipTrainingUndertaken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Internship/Training Undertaken</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Software Development Intern at ABC Corp..." data-testid="input-internship-undertaken" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internshipDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Textarea placeholder="3 months (June 2024 - August 2024)..." data-testid="input-internship-duration" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internshipSkillsGained"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills Gained</FormLabel>
                    <FormControl>
                      <Textarea placeholder="React.js, Node.js, MongoDB, REST API development..." data-testid="input-internship-skills" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold text-sm">Projects and Research</h4>
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project/Research Title</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Smart Agriculture Monitoring System..." data-testid="input-project-title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Developed an IoT-based system for monitoring soil moisture, temperature..." data-testid="input-project-description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectOutcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outcome</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Successfully deployed on 5 farms, reduced water usage by 30%..." data-testid="input-project-outcome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="indisciplinaryActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Involvement in Any In-disciplinary Activities</FormLabel>
                  <FormControl>
                    <Textarea placeholder="None / Details of any issues..." data-testid="input-disciplinary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentHealthStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Health Status</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Good health / Any health concerns..." data-testid="input-health" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentVisits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Parent Visits to the College</FormLabel>
                  <FormControl>
                    <Textarea placeholder="3 times - on dates..." data-testid="input-parent-visits" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherIssuesResolved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Identified & Resolved Academic/Non-Academic Issues</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Issue identified and resolved..." data-testid="input-other-issues" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentGrievances"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Grievances (if any)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="None / Details of grievances..." data-testid="input-grievances" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} type="button" data-testid="button-back">
            Back
          </Button>
          <Button type="submit" data-testid="button-generate-report">
            Generate Report
          </Button>
        </div>
      </form>
    </Form>
  );
}
