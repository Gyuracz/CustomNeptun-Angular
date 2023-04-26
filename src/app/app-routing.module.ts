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
  // { path: "instructors/create", component: InstructorCreateComponent, canActivate: [AdminGuard] },
  // { path: "instructors/update/:id", component: InstructorUpdateComponent, canActivate: [AdminGuard] },
  // { path: "instructors/:id", component: InstructorGetByIdComponent, canActivate: [AuthGuard] },
  // Semesters' paths
  {
    path: "semesters",
    canLoad: [AuthGuard],
    loadChildren: () => import("./semester/semester.module").then(m => m.SemesterModule)
  },
  // { path: "semesters/create", component: SemesterCreateComponent, canActivate: [AdminGuard] },
  // { path: "semesters/update/:id", component: SemesterUpdateComponent, canActivate: [AdminGuard] },
  // { path: "semesters/:id", component: SemesterGetByIdComponent, canActivate: [AuthGuard] },
  // Students' paths
  {
    path: "students",
    canLoad: [AuthGuard],
    loadChildren: () => import("./student/student.module").then(m => m.StudentModule)
  },
  // { path: "students/create", component: StudentCreateComponent, canActivate: [AdminGuard] },
  // { path: "students/update/:id", component: StudentUpdateComponent, canActivate: [AdminGuard] },
  // { path: "students/:id", component: StudentGetByIdComponent, canActivate: [AuthGuard] },
  // Subjects' paths
  {
    path: "subjects",
    canLoad: [AuthGuard],
    loadChildren: () => import("./subject/subject.module").then(m => m.SubjectModule)
  },
  // { path: "subjects/create", component: SubjectCreateComponent, canActivate: [AdminGuard] },
  // { path: "subjects/update/:id", component: SubjectUpdateComponent, canActivate: [AdminGuard] },
  // Error path
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
