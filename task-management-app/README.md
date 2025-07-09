# Task Management App with TypeScript

A modern task management application built with React, TypeScript, and Auth0 authentication, featuring a nostalgic Windows 98/2000 user interface theme.

## 🚀 Features

### Core Functionality

- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Pending, In Progress, Completed, Cancelled, Failed
- **Priority Levels**: Low, Medium, High priority assignments
- **Due Date Management**: Set and track task deadlines
- **Task Details**: Rich task descriptions and metadata
- **User Authentication**: Secure login via Auth0

### User Interface

- **Windows 98/2000 Theme**: Authentic retro styling with classic UI elements
- **Responsive Design**: Works on desktop and mobile devices
- **Dual-Pane Layout**: Task list on the left, details on the right
- **Modal Dialogs**: Classic Windows-style confirmation dialogs
- **Progress Indicators**: Animated progress bars for operations

### Technical Features

- **TypeScript**: Full type safety and enhanced developer experience
- **React Context API**: Global state management
- **React Router**: Client-side routing
- **Local Storage**: Persistent task data
- **Error Handling**: Comprehensive error management and validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Auth0 (Required)

You need to set up Auth0 authentication to use the app:

1. **Create an Auth0 Account**: Visit [auth0.com](https://auth0.com) and create a free account
2. **Create a New Application**:
   - Go to Applications → Create Application
   - Choose "Single Page Web Applications"
   - Select React as the technology

3. **Configure Application Settings**:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`

4. **Update Auth0 Configuration**:

   Edit `src/Auth0Provider.tsx` and replace the placeholder values:

   ```typescript
   const domain = "your-auth0-domain.auth0.com";
   const clientId = "your-client-id";
   const redirectUri = "http://localhost:5173";
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```
The application will start on `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## 📱 How to Use the App

### Getting Started

1. **Launch the Application**: Open your browser and navigate to the development server URL
2. **Authentication**: Click "Log In" to authenticate via Auth0
3. **Dashboard Access**: After login, you'll be redirected to the task dashboard

### Managing Tasks

#### Creating Tasks

1. Navigate to the **Tasks** page from the navigation bar
2. Click the **"New Task"** button in the left panel
3. Fill out the task form:
   - **Task Name**: Enter a descriptive title
   - **Description**: Add detailed task information
   - **Status**: Choose from Pending, In Progress, Completed, etc.
   - **Priority**: Set Low, Medium, or High priority
   - **Due Date**: Optional deadline setting
4. Click **"Create Task"** to save

#### Viewing Tasks

- **Task List**: All tasks appear in the left panel listbox
- **Quick Preview**: Click any task to see basic details in the right panel
- **Full View**: Click **"View Full Details"** for comprehensive task information
- **Task Selection**: Selected tasks are highlighted in blue

#### Editing Tasks

1. Select a task from the list
2. Click **"Edit Task"** button or use the edit button in the full view
3. Modify any task properties in the form
4. Click **"Update Task"** to save changes

#### Task Status Management

- **Status Updates**: Change task status using dropdowns in the full view
- **Priority Changes**: Adjust priority levels as needed
- **Progress Tracking**: Visual indicators show task status

#### Deleting Tasks

1. Select the task you want to delete
2. Click **"Delete Task"** button
3. Confirm deletion in the Windows-style dialog
4. Task will be permanently removed

#### Bulk Operations

- **Clear All Tasks**: Use the "Clear All" button to remove all tasks
- **Confirmation Required**: All destructive operations require user confirmation

### Navigation

- **Home**: Welcome page and authentication
- **Tasks**: Main task management dashboard
- **Profile**: User profile information (if authenticated)

### User Interface Elements

#### Windows 98/2000 Theme

- **Window Frames**: Classic outset borders and title bars
- **Buttons**: Traditional 3D button styling with hover effects
- **Input Fields**: Inset styling with authentic focus states
- **Dialog Boxes**: Modal dialogs with classic Windows appearance
- **Progress Bars**: Animated striped progress indicators

#### Responsive Features

- **Mobile Friendly**: Adapts to smaller screens
- **Touch Support**: Works with touch devices
- **Keyboard Navigation**: Full keyboard accessibility

## 🏗️ Project Architecture

### Component Structure

```
src/
├── components/
│   ├── NavigationBar.tsx     # Main navigation
│   ├── HomePage.tsx          # Welcome/landing page
│   ├── TasksLayout.tsx       # Main task dashboard layout
│   ├── TaskList.tsx          # Task management container
│   ├── ListBox.tsx           # Task selection listbox
│   ├── DisplayBox.tsx        # Task detail display
│   ├── TaskForm.tsx          # Task creation/editing form
│   ├── NewTask.tsx           # New task page wrapper
│   ├── EditTask.tsx          # Edit task page wrapper
│   ├── ViewTask.tsx          # Full task view component
│   ├── DeleteTask.tsx        # Task deletion confirmation
│   ├── ClearTasks.tsx        # Bulk task clearing
│   └── Profile.tsx           # User profile component
├── contexts/
│   ├── UserContext.ts        # User and task state management
│   └── SelectionContext.ts   # Task selection state
├── hooks/                    # Custom React hooks
├── Auth0Provider.tsx         # Auth0 configuration
└── main.tsx                  # Application entry point
```

### State Management

- **UserContext**: Manages user data and task collection
- **SelectionContext**: Handles task selection state
- **Local Storage**: Persists task data between sessions
- **React State**: Component-level state management

### TypeScript Integration

- **Strong Typing**: All components use TypeScript interfaces
- **Type Safety**: Compile-time error checking
- **Data Validation**: Runtime type checking for forms

## 🔧 Technical Stack

### Frontend

- **React 19**: Modern React with hooks and context
- **TypeScript 5.8**: Static type checking
- **Vite 7**: Fast build tool and development server
- **React Router 7**: Client-side routing

### Styling

- **CSS3**: Custom Windows 98/2000 theme
- **Bootstrap 5**: Grid system and utilities
- **CSS Variables**: Consistent theming
- **Responsive Design**: Mobile-first approach

### Authentication

- **Auth0**: Secure authentication and authorization
- **JWT Tokens**: Session management
- **OAuth 2.0**: Industry-standard authentication

### Development Tools

- **ESLint**: Code linting and style enforcement
- **TypeScript Compiler**: Type checking and compilation
- **Vite HMR**: Hot module replacement for development

## 🐛 Troubleshooting

### Common Issues

#### Auth0 Configuration

- **Error**: "Invalid redirect URI"
  - **Solution**: Ensure redirect URIs in Auth0 dashboard match your local development URL

#### Development Server

- **Error**: "Port 5173 already in use"
  - **Solution**: Either stop the existing process or use a different port with `npm run dev -- --port 3000`

#### Build Issues

- **Error**: TypeScript compilation errors
  - **Solution**: Run `npm run lint` to identify and fix type issues

#### Styling Issues

- **Issue**: CSS not loading properly
  - **Solution**: Clear browser cache and restart development server

### Performance Tips

- **Large Task Lists**: The app handles hundreds of tasks efficiently
- **Local Storage**: Data persists between browser sessions
- **Memory Usage**: Regularly clear completed tasks for optimal performance

## 🔒 Security Considerations

- **Authentication**: All user data is protected by Auth0
- **Local Storage**: Tasks are stored locally and not transmitted to servers
- **CSRF Protection**: Auth0 handles cross-site request forgery protection
- **Data Validation**: All inputs are validated both client-side and through TypeScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Please ensure you comply with Auth0's terms of service when using their authentication services.

## 🙏 Acknowledgments
Coding Temple Bootcamp and all faculty and staff for the knowledge and lessons that have gotten me this far.

