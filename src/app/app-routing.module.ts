import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor/instructor.component';
import { SemesterComponent } from './semester/semester.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { InstructorGetByIdComponent } from './instructor/instructor.get-by-id/instructor.get-by-id.component';
import { StudentGetByIdComponent } from './student/student.get-by-id/student.get-by-id.component';
import { SemesterGetByIdComponent } from './semester/semester.get-by-id/semester.get-by-id.component';
import { SubjectCreateComponent } from './subject/subject.create/subject.create.component';
import { SemesterCreateComponent } from './semester/semester.create/semester.create.component';
import { StudentCreateComponent } from './student/student.create/student.create.component';
import { InstructorCreateComponent } from './instructor/instructor.create/instructor.create.component';
import { SubjectUpdateComponent } from './subject/subject.update/subject.update.component';
import { InstructorUpdateComponent } from './instructor/instructor.update/instructor.update.component';
import { SemesterUpdateComponent } from './semester/semester.update/semester.update.component';
import { StudentUpdateComponent } from './student/student.update/student.update.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './login/auth.guard';
import { AdminGuard } from './login/admin.guard';

const routes: Routes = [
  // Default path
  { path: "", component: MainComponent, canActivate: [AuthGuard] },
  // Login page path
  { path: "login", component: LoginComponent },
  // Instructors' paths
  { path: "instructors", component: InstructorComponent, canActivate: [AuthGuard] },
  { path: "instructors/create", component: InstructorCreateComponent, canActivate: [AdminGuard] },
  { path: "instructors/update/:id", component: InstructorUpdateComponent, canActivate: [AdminGuard] },
  { path: "instructors/:id", component: InstructorGetByIdComponent, canActivate: [AuthGuard] },
  // Semesters' paths
  { path: "semesters", component: SemesterComponent, canActivate: [AuthGuard] },
  { path: "semesters/create", component: SemesterCreateComponent, canActivate: [AdminGuard] },
  { path: "semesters/update/:id", component: SemesterUpdateComponent, canActivate: [AdminGuard] },
  { path: "semesters/:id", component: SemesterGetByIdComponent, canActivate: [AuthGuard] },
  // Students' paths
  { path: "students", component: StudentComponent, canActivate: [AuthGuard] },
  { path: "students/create", component: StudentCreateComponent, canActivate: [AdminGuard] },
  { path: "students/update/:id", component: StudentUpdateComponent, canActivate: [AdminGuard] },
  { path: "students/:id", component: StudentGetByIdComponent, canActivate: [AuthGuard] },
  // Subjects' paths
  { path: "subjects", component: SubjectComponent, canActivate: [AuthGuard] },
  { path: "subjects/create", component: SubjectCreateComponent, canActivate: [AdminGuard] },
  { path: "subjects/update/:id", component: SubjectUpdateComponent, canActivate: [AdminGuard] },
  // Error path
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
