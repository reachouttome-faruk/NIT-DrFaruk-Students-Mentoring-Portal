# Students Mentoring Portal - Design Guidelines
## Navodaya Institute of Technology

### Design Approach
**System Selected:** Material Design (Form-focused variant)
**Rationale:** Academic data entry portal requiring clear hierarchy, excellent form patterns, and professional credibility. Material Design provides robust form components, data table patterns, and stepper navigation ideal for multi-step data collection workflows.

---

## Typography System

**Primary Font:** Inter (Google Fonts)
- Headings: 600 weight
- Body/Forms: 400 weight
- Labels: 500 weight

**Hierarchy:**
- Page Titles: text-3xl font-semibold
- Section Headers: text-xl font-semibold
- Table Headers: text-sm font-medium uppercase tracking-wide
- Form Labels: text-sm font-medium
- Body/Input Text: text-base
- Helper Text: text-xs

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Form field spacing: space-y-4
- Section padding: p-6 or p-8
- Card containers: p-8
- Table cell padding: px-4 py-3

**Container Strategy:**
- Main content: max-w-7xl mx-auto
- Form sections: max-w-4xl mx-auto for readability
- Full-width tables: w-full with horizontal scroll on mobile

---

## Core Components

### Header/Navigation
- Fixed top bar with NIT logo (left), page title (center), user info (right)
- Height: h-16
- Includes progress stepper for multi-page flow
- Stepper shows: "Student Details → Subject Performance → Other Parameters → Review"

### Form Sections
**Input Fields:**
- Full-width inputs with floating labels
- Border: border-2 with focus ring
- Height: h-12 for text inputs
- Spacing between fields: space-y-4
- Required field indicator: asterisk in label

**Form Layout:**
- Two-column grid on desktop (grid-cols-2 gap-6)
- Single column on mobile
- Group related fields in cards with subtle borders

### Data Tables
**Subject Performance Table:**
- Horizontal scroll on mobile (overflow-x-auto)
- Sticky first column for subject names
- Alternating row treatment for readability
- Editable cells with inline input fields
- Column widths: Subject (200px), Faculty (180px), Weaknesses (240px), Marks (100px), etc.
- Add/Remove row buttons at bottom

**Other Parameters Section:**
- Vertical layout with labeled sections
- Mix of inputs (SGPA grid), text areas (activities), and checkboxes
- Each parameter in its own card with clear label

### Buttons & Actions
**Primary Actions:** (Next, Submit, Generate PDF)
- Height: h-12
- Font: text-base font-medium
- Full rounded: rounded-lg
- Width: min-w-32

**Secondary Actions:** (Back, Cancel)
- Outlined variant
- Same dimensions as primary

**Action Layout:**
- Bottom of each page: flex justify-between
- Sticky footer on long forms: fixed bottom with backdrop blur

### PDF Preview/Generation
- Full-page modal or separate page
- Preview pane showing formatted output
- Download button prominently placed
- PDF layout matches physical document standards

---

## Page-Specific Layouts

### Page 1: Student & Mentor Details
- Centered card (max-w-2xl)
- NIT logo at top center
- Two sections: "Student Information" and "Mentor Information"
- Grid layout for form fields
- Navigation: Only "Next" button (bottom right)

### Page 2: Subject-wise Performance
- Full-width table container
- "Add Subject" button above table
- Table with 8 columns (as specified)
- Each row editable with inline inputs and text areas
- Navigation: "Back" (left) and "Next" (right)

### Page 3: Other Parameters
- Vertical scrolling form
- Grouped sections in cards
- SGPA: Semester-wise grid input
- Text areas for activities and remarks
- Navigation: "Back" and "Generate Report"

### Page 4: PDF Review & Download
- Split layout: Preview (left 60%), Actions (right 40%)
- Preview shows formatted PDF layout
- Download button, Edit button, New Entry button

---

## Component Specifications

**Cards:**
- Background with subtle border
- Rounded: rounded-xl
- Padding: p-8
- Shadow: shadow-sm

**Form Groups:**
- Labels above inputs
- Helper text below inputs (text-xs)
- Error states with message below field

**Tables:**
- Header: sticky top with background
- Cells: adequate padding (px-4 py-3)
- Borders: border-b on rows
- Hover state on rows

**Progress Stepper:**
- Horizontal dots or line-connected circles
- Current step emphasized
- Completed steps with checkmark
- Placed below header or within header

---

## Interaction Patterns

**Form Validation:**
- Inline validation on blur
- Error messages appear below fields
- Prevent navigation if validation fails
- Summary of errors at top if multiple issues

**Data Persistence:**
- Auto-save draft indicators
- Clear messaging about saved state

**Table Interactions:**
- Click to edit cells
- Tab navigation between cells
- Delete row with confirmation
- Sortable columns where applicable

---

## Accessibility

- All form inputs have associated labels
- Focus indicators on all interactive elements
- Keyboard navigation throughout
- ARIA labels for table headers and complex widgets
- Sufficient contrast ratios for text
- Error messages linked to form fields

---

## Images

**NIT Logo:**
- Header: Height h-10, positioned top-left
- PDF Header: Centered, larger scale
- Format: PNG with transparency preferred

No hero images required - this is a functional application, not a marketing site.