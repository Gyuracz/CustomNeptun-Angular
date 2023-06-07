import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  // Default path
  { path: "", component: MainComponent, canActivate: [AuthGuard] },
  // Login page path
  { path: "login", component: LoginComponent },
  // Instructors' paths
  {
    path: "instructors",
    canLoad: [AuthGuard],
    loadChildren: () => import("./instructor/instructor.module").then(m => m.InstructorModule)
  },
  // Semesters' paths
  {
    path: "semesters",
    canLoad: [AuthGuard],
    loadChildren: () => import("./semester/semester.module").then(m => m.SemesterModule)
  },
  // Students' paths
  {
    path: "students",
    canLoad: [AuthGuard],
    loadChildren: () => import("./student/student.module").then(m => m.StudentModule)
  },
  // Subjects' paths
  {
    path: "subjects",
    canLoad: [AuthGuard],
    loadChildren: () => import("./subject/subject.module").then(m => m.SubjectModule)
  },
  // Error path
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
