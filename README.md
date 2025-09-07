# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7e0b421c-4044-4d72-bfaa-d4296f6c99b6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7e0b421c-4044-4d72-bfaa-d4296f6c99b6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Database)

## LeaveX - Hostel Leave Management System

### Application Workflow

**LeaveX** is a role-based hostel leave management system with two types of users:

#### 1. Admin Workflow
- **Sign In**: Admin signs in using Admin ID and password
- **Add Students**: Admin can register new students by providing:
  - Personal info (name, roll number, email, phone)
  - Login credentials (password for student login)
  - Academic details (course, year, room number)
  - Guardian information
- **Manage Applications**: View and manage all leave applications
- **View All Students**: Access complete student database

#### 2. Student Workflow
- **Sign In**: Students sign in using their Roll Number and password (set by admin)
- **Apply for Leave**: Submit leave applications with details
- **Track Applications**: View status of all submitted leave applications
- **Profile Management**: View and update personal information

#### Key Features
- **Role-based Authentication**: Separate login flows for admin and students
- **Secure Access Control**: Students can only access their own data
- **Complete Leave Management**: From application to approval workflow
- **Admin Controls**: Full administrative control over student data and applications

#### Authentication Flow
1. User selects role (Admin/Student) on homepage
2. **Admin**: Signs in with Admin ID + password → Access admin dashboard
3. **Student**: Signs in with Roll Number + password → Access student dashboard
4. **No Self-Registration**: Only admins can add students to the system

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7e0b421c-4044-4d72-bfaa-d4296f6c99b6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
