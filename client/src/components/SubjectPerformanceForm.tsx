import { useState, memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SubjectPerformance } from "@shared/schema";

interface SubjectPerformanceFormProps {
  defaultValues?: SubjectPerformance[];
  onSubmit: (data: SubjectPerformance[]) => void;
  onBack: () => void;
}

function SubjectPerformanceForm({ defaultValues, onSubmit, onBack }: SubjectPerformanceFormProps) {
  const [subjects, setSubjects] = useState<SubjectPerformance[]>(
    defaultValues && defaultValues.length > 0
      ? defaultValues
      : [
          {
            id: crypto.randomUUID(),
            subjectName: "",
            subjectCode: "",
            teachingFaculty: "",
            weaknesses: "",
            classworkMarks: "",
            internalMarks: "",
            expectedOutcome: "",
            mentorRemarks: "",
            currentStatus: "",
          },
        ]
  );

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      setSubjects(defaultValues);
    } else if ((!defaultValues || defaultValues.length === 0) && subjects.length > 1) {
      setSubjects([
        {
          id: crypto.randomUUID(),
          subjectName: "",
          subjectCode: "",
          teachingFaculty: "",
          weaknesses: "",
          classworkMarks: "",
          internalMarks: "",
          expectedOutcome: "",
          mentorRemarks: "",
          currentStatus: "",
        },
      ]);
    }
  }, [defaultValues, subjects.length]);

  const addSubject = useCallback(() => {
    setSubjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        subjectName: "",
        subjectCode: "",
        teachingFaculty: "",
        weaknesses: "",
        classworkMarks: "",
        internalMarks: "",
        expectedOutcome: "",
        mentorRemarks: "",
        currentStatus: "",
      },
    ]);
  }, []);

  const removeSubject = useCallback((id: string) => {
    setSubjects((prev) => {
      if (prev.length > 1) {
        return prev.filter((s) => s.id !== id);
      }
      return prev;
    });
  }, []);

  const updateSubject = useCallback((id: string, field: keyof SubjectPerformance, value: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }, []);

  const handleSubmit = useCallback(() => {
    const valid = subjects.every(
      (s) => s.subjectName && s.subjectCode && s.teachingFaculty
    );
    if (valid) {
      onSubmit(subjects);
    } else {
      alert("Please fill in required fields (Subject Name, Code, and Teaching Faculty) for all subjects");
    }
  }, [subjects, onSubmit]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>IA Subject-wise Performance</CardTitle>
              <CardDescription>Enter performance details for each subject</CardDescription>
            </div>
            <Button onClick={addSubject} variant="outline" size="sm" data-testid="button-add-subject">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Subject Name *</TableHead>
                  <TableHead className="min-w-[100px]">Code *</TableHead>
                  <TableHead className="min-w-[150px]">Teaching Faculty *</TableHead>
                  <TableHead className="min-w-[200px]">Weakness, if any, in the Subject</TableHead>
                  <TableHead className="min-w-[150px]">Class Work & Assignments</TableHead>
                  <TableHead className="min-w-[120px]">IA Performance</TableHead>
                  <TableHead className="min-w-[200px]">Expected Outcome</TableHead>
                  <TableHead className="min-w-[280px]">Mentor Remarks with Action Plan to Achieve the Outcome</TableHead>
                  <TableHead className="min-w-[200px]">Status of Outcome</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject, index) => (
                  <TableRow key={subject.id}>
                    <TableCell>
                      <Input
                        value={subject.subjectName}
                        onChange={(e) => updateSubject(subject.id, "subjectName", e.target.value)}
                        placeholder="Subject name"
                        data-testid={`input-subject-name-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={subject.subjectCode}
                        onChange={(e) => updateSubject(subject.id, "subjectCode", e.target.value)}
                        placeholder="Code"
                        data-testid={`input-subject-code-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={subject.teachingFaculty}
                        onChange={(e) => updateSubject(subject.id, "teachingFaculty", e.target.value)}
                        placeholder="Faculty name"
                        data-testid={`input-faculty-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={subject.weaknesses}
                        onChange={(e) => updateSubject(subject.id, "weaknesses", e.target.value)}
                        placeholder="Weaknesses"
                        className="min-h-[60px]"
                        data-testid={`input-weaknesses-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={subject.classworkMarks}
                        onChange={(e) => updateSubject(subject.id, "classworkMarks", e.target.value)}
                        placeholder="Marks"
                        data-testid={`input-classwork-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={subject.internalMarks}
                        onChange={(e) => updateSubject(subject.id, "internalMarks", e.target.value)}
                        placeholder="Marks"
                        data-testid={`input-internal-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={subject.expectedOutcome}
                        onChange={(e) => updateSubject(subject.id, "expectedOutcome", e.target.value)}
                        placeholder="Expected outcome"
                        className="min-h-[60px]"
                        data-testid={`input-outcome-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={subject.mentorRemarks}
                        onChange={(e) => updateSubject(subject.id, "mentorRemarks", e.target.value)}
                        placeholder="Remarks and action plan"
                        className="min-h-[60px]"
                        data-testid={`input-remarks-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={subject.currentStatus}
                        onChange={(e) => updateSubject(subject.id, "currentStatus", e.target.value)}
                        placeholder="Current status"
                        className="min-h-[60px]"
                        data-testid={`input-status-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      {subjects.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSubject(subject.id)}
                          data-testid={`button-remove-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} data-testid="button-back">
          Back
        </Button>
        <Button onClick={handleSubmit} data-testid="button-next">
          Next
        </Button>
      </div>
    </div>
  );
}

export default memo(SubjectPerformanceForm);
