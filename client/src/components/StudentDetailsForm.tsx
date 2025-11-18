import { useState, memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentDetailsSchema, type StudentDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface StudentDetailsFormProps {
  defaultValues?: StudentDetails;
  onSubmit: (data: StudentDetails) => void;
}

function StudentDetailsForm({ defaultValues, onSubmit }: StudentDetailsFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(defaultValues?.studentPhotoDataUrl);

  const form = useForm<StudentDetails>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: defaultValues || {
      studentName: "",
      usn: "",
      fatherName: "",
      studentPhotoDataUrl: "",
      class: "",
      section: "",
      attendanceAsOnDate: "",
      currentCGPA: "",
      mentoringPeriod: "",
      mentorName: "",
      mentorDesignation: "",
      mentorDepartment: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      setPhotoPreview(defaultValues.studentPhotoDataUrl);
    } else {
      form.reset({
        studentName: "",
        usn: "",
        fatherName: "",
        studentPhotoDataUrl: "",
        class: "",
        section: "",
        attendanceAsOnDate: "",
        currentCGPA: "",
        mentoringPeriod: "",
        mentorName: "",
        mentorDesignation: "",
        mentorDepartment: "",
      });
      setPhotoPreview(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPhotoPreview(dataUrl);
        form.setValue("studentPhotoDataUrl", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [form]);

  const removePhoto = useCallback(() => {
    setPhotoPreview(undefined);
    form.setValue("studentPhotoDataUrl", "");
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Enter the student's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" data-testid="input-student-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student USN *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter USN" data-testid="input-usn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Father's Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter father's name" data-testid="input-father-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., B.Tech CSE" data-testid="input-class" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., A, B, C" data-testid="input-section" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attendanceAsOnDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attendance as on Date *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 85% (as on 15/11/2025)" data-testid="input-attendance-date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentCGPA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current CGPA *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8.5" data-testid="input-cgpa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mentoringPeriod"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Mentoring Period *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., July 2025 - November 2025" data-testid="input-mentoring-period" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-48">
                <FormField
                  control={form.control}
                  name="studentPhotoDataUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Photo</FormLabel>
                      <FormDescription className="text-xs">Upload passport size photo</FormDescription>
                      <FormControl>
                        <div className="space-y-2">
                          {photoPreview ? (
                            <div className="relative w-32 h-40 mx-auto">
                              <img 
                                src={photoPreview} 
                                alt="Student" 
                                className="w-full h-full object-cover rounded-md border-2 border-border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6"
                                onClick={removePhoto}
                                data-testid="button-remove-photo"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-32 h-40 mx-auto border-2 border-dashed border-border rounded-md cursor-pointer hover-elevate active-elevate-2 transition-colors">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground text-center px-2">Click to upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoUpload}
                                data-testid="input-photo-upload"
                              />
                            </label>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentor Information</CardTitle>
            <CardDescription>Enter the mentor's details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="mentorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentor Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mentor name" data-testid="input-mentor-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentorDesignation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Assistant Professor" data-testid="input-designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentorDepartment"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Department *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Computer Science & Engineering" data-testid="input-department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" data-testid="button-next">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(StudentDetailsForm);
