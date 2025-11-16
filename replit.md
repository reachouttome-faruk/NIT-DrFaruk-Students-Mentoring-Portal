# Students Mentoring Portal - Navodaya Institute of Technology

## Project Overview
A comprehensive web application for Navodaya Institute of Technology faculties to track and document student academic performance, activities, and mentoring progress. The portal features a multi-step form flow that generates professionally formatted, downloadable PDF reports.

## Current State
The application is fully functional with a 5-step form flow:
1. **Student Details** - Student and mentor information including attendance, CGPA, and mentoring period
2. **Subject Performance** - Multi-subject tracking with teaching faculty, weaknesses, marks, outcomes, and mentor remarks
3. **Backlog Information** - Dynamic tracking of backlog subjects with proposed actions
4. **Other Parameters** - Comprehensive tracking of academic, skill, activity, and other student parameters
5. **Review** - Preview and download PDF report with college branding

## Recent Changes (November 15, 2025)

### Branding Update
- Updated site title to "Navodaya Institute of Technology (Autonomous)" across all pages and PDF reports

### Subject Performance Section Field Updates
- Renamed field titles for clarity:
  - "Faculty" → "Teaching Faculty"
  - "Weaknesses" → "Weakness, if any, in the Subject"
  - "CW Marks" → "Class Work & Assignments"
  - "IA Marks" → "IA Performance"
  - "Mentor Remarks" → "Mentor Remarks with Action Plan to Achieve the Outcome"
  - "Current Status" → "Status of Outcome"

### Other Parameters Section Restructure
Updated with new comprehensive headings organized into 5 categories:

**1. Academic Performance:**
- Academic Track (SGPA-Semester-wise)
- Attendance and Alerts Issued (to Parents/Guardians)

**2. Skill Possession (Based on Assessment Tests):**
- Technical / Programming Skills
- Aptitude Skills

**3. Activities & Achievements:**
- Participation in NIT Clubs or Certification Done
- Participation in Co-Curricular Activities (Workshops, Seminars, Guest Lectures, etc.)
- Participation in Extra-Curricular Activities (Sports, Cultural, NSS, etc.)
- Ranks / Awards / Recognitions at College or University Level

**4. Internship/Training & Projects:**
- Internship/Training Undertaken
- Duration
- Skills Gained
- Project/Research Title
- Description
- Outcome

**5. Other Information:**
- Involvement in Any In-disciplinary Activities
- Current Health Status
- Number of Parent Visits to the College
- Other Identified & Resolved Academic/Non-Academic Issues
- Student Grievances (if any)

### Professional UI Enhancements
- Enhanced background watermark visibility with gradient overlay (75-80% opacity)
- Updated header with:
  - Logo with light primary background accent
  - Gradient text effect on institute name
  - Semi-transparent backdrop blur effect
  - Subtle shadow
- Improved progress stepper with:
  - Larger step indicators (12x12)
  - Animated progress bars with smooth transitions
  - Ring effects on active steps
  - Enhanced shadows and colors
- Enhanced card components with:
  - Semi-transparent backgrounds (95% opacity) with backdrop blur
  - Stronger shadows (shadow-lg) for depth
  - Hover effects (shadow-xl on hover)
  - Smooth transitions
- Updated shadow system throughout the app for better depth perception
- Added content wrapper with subtle background and blur effect

## Project Architecture

### Tech Stack
- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter
- **Forms**: React Hook Form with Zod validation
- **PDF Generation**: jsPDF with autoTable plugin
- **Storage**: localStorage for form data persistence

### Design System
- **Color Scheme**: Light blue (hsl(210°)) and dark blue (hsl(217°)) for branding consistency
- **Typography**: Inter font family for professional academic appearance
- **Branding**: NIT logo in header and PDF reports, decorative footer bar in PDFs

### Key Components
- `client/src/pages/Home.tsx` - Main application flow controller
- `client/src/components/StudentDetailsForm.tsx` - Step 1 form
- `client/src/components/SubjectPerformanceForm.tsx` - Step 2 form (multi-subject entries)
- `client/src/components/BacklogInformationForm.tsx` - Step 3 form (multi-backlog entries)
- `client/src/components/OtherParametersForm.tsx` - Step 4 form
- `client/src/components/ReportPreview.tsx` - Step 5 review screen
- `client/src/lib/pdfGenerator.ts` - PDF generation logic with college branding
- `shared/schema.ts` - TypeScript types and Zod validation schemas

### Data Model
All schemas defined in `shared/schema.ts`:
- `StudentDetails` - Student and mentor information
- `SubjectPerformance` - Subject-wise performance tracking (array)
- `BacklogInformation` - Backlog subject tracking (array)
- `OtherParameters` - Comprehensive student parameters
- `MentoringReport` - Complete report structure

### Features
- Multi-step form with progress indicator
- Form data persistence using localStorage
- Dynamic multi-entry forms for subjects and backlogs
- Professional PDF generation with:
  - College logo and branding
  - Watermarked background (NIT Admin Block)
  - Decorative footer bar
  - Structured tables for all sections
- Edit capability from review screen
- New entry creation with data reset

## User Preferences
- Professional academic interface design
- Material Design approach
- Comprehensive data tracking for mentoring activities
- PDF reports with institutional branding (logo, watermark, footer)
