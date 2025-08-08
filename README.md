# SmartStarter

AI-powered task planning tool that helps users break down complex goals into actionable first steps.

## Project Overview

SmartStarter is an AI-based web application where users input tasks and AI generates detailed task breakdown steps and recommended first actions. The project adopts a frontend-backend separation architecture, with frontend using native HTML/CSS/JS and backend using Node.js to build a proxy server.

## Key Features

- **AI Task Analysis**: Intelligent breakdown of complex tasks into executable steps
- **Starting Step Recommendations**: AI generates two immediate first-step suggestions
- **Complete Task Planning**: Detailed step-by-step execution plans
- **User Feedback**: The specific experiment was conducted by using a questionnaire survey to collect feedback.
- **Validation Mechanism**: Verify the impact of starting steps on user actions (current focus)


## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design, mobile support
- Google Fonts (Montserrat)

### Backend
- Node.js, Express.js
- Axios (HTTP requests)
- CORS (Cross-origin support)

### AI Integration
- OpenRouter API
- DeepSeek language models
- Error handling and mock data fallback

## Project Structure

```
web/
├── index.html          # Home page - task input
├── suggestion.html     # Suggestions page - AI analysis results
├── feedback.html       # Feedback page - user feedback
├── style.css          # Global styles
├── index.js           # Home page interaction logic
├── suggestion.js      # Suggestions page logic
├── feedback.js        # Feedback page logic
├── proxy.js           # Backend proxy server
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd web
npm install
```

### 2. Configure API Key
Replace your OpenRouter API Key in `proxy.js`:
```javascript
const API_KEY = 'your-api-key-here';
```

### 3. Start Server
```bash
node proxy.js
```

### 4. Open Application
Open `index.html` in your browser

## Usage Flow

1. **Input Task**: Enter the task to be planned on the home page
2. **AI Analysis**: View AI-generated complete task planning
3. **Select Steps**: Choose one from the two recommended starting steps
4. **Complete Feedback**: Provide feedback on AI suggestions

## Project Highlights

- **Frontend-Backend Separation**: Clear architectural design
- **AI Integration**: Real AI capability application
- **User Experience**: Loading animations, error handling, responsive design
- **Validation-Oriented**: Focus on validating AI suggestions' impact on user actions
- **Code Quality**: Modular, well-commented, maintainable code

## Development Environment

- Node.js v14+
- Modern browsers (Chrome, Firefox, Safari, Edge)
- OpenRouter API account

---

**Development Period**: January-February 2024  
**Project Status**: MVP validation phase, focusing on validating the impact of starting steps on user actions 