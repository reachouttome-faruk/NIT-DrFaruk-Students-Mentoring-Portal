# Students Mentoring Portal
### Navodaya Institute of Technology (Autonomous)

A comprehensive faculty portal for tracking and mentoring students' academic performance, skills development, and overall progress.

![NIT Mentoring Portal](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## 🎯 Features

### **5-Step Form Workflow**
1. **Student Details** - Personal information, academic details, mentor information
2. **IA Subject Performance** - Internal assessment tracking with detailed metrics
3. **Backlog Information** - Track subjects with backlogs and action plans
4. **Other Parameters** - Skills, achievements, projects, and activities
5. **Review & Generate** - Preview all data and generate professional PDF reports

### **Key Capabilities**
- ✅ **Student Photo Upload** - Add student photos to reports
- ✅ **PDF Report Generation** - Professional reports with NIT branding
- ✅ **Watermarked Background** - NIT Admin Block watermark on all pages
- ✅ **Data Persistence** - All data stored locally in browser
- ✅ **Offline Capable** - Works without internet after first load
- ✅ **Mobile Responsive** - Works on tablets and mobile devices
- ✅ **Dark Mode Support** - Easy on the eyes in low-light conditions

## 🚀 Live Demo

Visit the live application: [Your GitHub Pages URL]

## 📋 Form Fields Included

**Student Information:**
- Name, USN, Father's Name, Mobile Number
- Class, Section, Attendance, CGPA
- Mentoring Period, Student Photo

**Mentor Information:**
- Name, Employee ID, Designation, Department

**Academic Performance:**
- Subject-wise IA marks tracking
- Weaknesses identification
- Expected outcomes and current status

**Skills & Activities:**
- Academic performance tracking
- Skill possession assessment
- Co-curricular activities
- Internships and projects
- Technical papers

## 🛠️ Technology Stack

- **Frontend Framework:** React 18.3 with TypeScript
- **Build Tool:** Vite 5.4
- **UI Components:** Radix UI + Tailwind CSS
- **Form Management:** React Hook Form + Zod validation
- **PDF Generation:** jsPDF with autoTable
- **State Management:** TanStack Query
- **Routing:** Wouter
- **Storage:** Browser localStorage

## 📦 Installation & Development

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### GitHub Pages (Automated)

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**See [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md) for detailed deployment instructions.**

Every push to the `main` branch automatically triggers a build and deployment.

### Manual Deployment

```bash
npm run deploy
```

## 📄 Generated PDF Reports

PDF reports include:
- **NIT Branding** - College logo and name
- **Watermarked Background** - NIT Admin Block building
- **Student Photo** - If uploaded
- **Complete Data** - All form information organized professionally
- **Signature Sections** - For student, mentor, and head of department

## 💾 Data Storage

All student data is stored in the **browser's localStorage**:
- ✅ No external database required
- ✅ Data persists across sessions
- ✅ Complete privacy - data never leaves the device
- ⚠️ Clearing browser data will erase all information

## 🎨 Design Features

- **Professional UI** - Clean, modern interface
- **NIT Branding** - Consistent college identity
- **Responsive Design** - Works on all screen sizes
- **Dark Mode** - Automatic theme switching
- **Accessibility** - WCAG compliant components

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This project is maintained for Navodaya Institute of Technology. For suggestions or issues:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 👥 Credits

**Developed for:**
Navodaya Institute of Technology (Autonomous)

**Technology Stack:**
- React Team
- Vite Team
- Tailwind CSS Team
- Radix UI Team

## 📞 Support

For technical issues or questions:
- Open an issue on GitHub
- Contact your IT department

---

**Made with ❤️ for NIT Faculty and Students**
