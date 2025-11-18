import { useState, memo, useCallback, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { BacklogInformation } from "@shared/schema";

interface BacklogInformationFormProps {
  defaultValues?: BacklogInformation[];
  onSubmit: (data: BacklogInformation[]) => void;
  onBack: () => void;
}

function BacklogInformationForm({ defaultValues, onSubmit, onBack }: BacklogInformationFormProps) {
  const [backlogs, setBacklogs] = useState<BacklogInformation[]>(
    defaultValues && defaultValues.length > 0
      ? defaultValues
      : []
  );

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      setBacklogs(defaultValues);
    } else if (backlogs.length > 0 && (!defaultValues || defaultValues.length === 0)) {
      setBacklogs([]);
    }
  }, [defaultValues, backlogs.length]);

  const addBacklog = useCallback(() => {
    setBacklogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        subjectNameWithCode: "",
        actionProposed: "",
      },
    ]);
  }, []);

  const removeBacklog = useCallback((id: string) => {
    setBacklogs((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const updateBacklog = useCallback((id: string, field: keyof BacklogInformation, value: string) => {
    setBacklogs((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  }, []);

  const handleSubmit = useCallback(() => {
    if (backlogs.length > 0) {
      const valid = backlogs.every(
        (b) => b.subjectNameWithCode && b.actionProposed
      );
      if (!valid) {
        alert("Please fill in all fields for backlog subjects");
        return;
      }
    }
    onSubmit(backlogs);
  }, [backlogs, onSubmit]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Backlog Information</CardTitle>
              <CardDescription>Enter details of subjects with backlogs (if any)</CardDescription>
            </div>
            <Button onClick={addBacklog} variant="outline" size="sm" data-testid="button-add-backlog">
              <Plus className="w-4 h-4 mr-2" />
              Add Backlog Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {backlogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No backlog subjects added. Click "Add Backlog Subject" to add one, or click Next to skip.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.No</TableHead>
                    <TableHead className="min-w-[250px]">Name of the Subject with Code *</TableHead>
                    <TableHead className="min-w-[300px]">Action Proposed to Clear *</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlogs.map((backlog, index) => (
                    <TableRow key={backlog.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={backlog.subjectNameWithCode}
                          onChange={(e) => updateBacklog(backlog.id, "subjectNameWithCode", e.target.value)}
                          placeholder="e.g., Mathematics - MAT101"
                          data-testid={`input-backlog-subject-${index}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          value={backlog.actionProposed}
                          onChange={(e) => updateBacklog(backlog.id, "actionProposed", e.target.value)}
                          placeholder="Enter action plan to clear the backlog"
                          className="min-h-[60px]"
                          data-testid={`input-backlog-action-${index}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBacklog(backlog.id)}
                          data-testid={`button-remove-backlog-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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

export default memo(BacklogInformationForm);
