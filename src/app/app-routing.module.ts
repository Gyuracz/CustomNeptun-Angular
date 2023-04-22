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

const routes: Routes = [
  // Default path
  { path: "", redirectTo: "", pathMatch: "full" },
  // Instructors' paths
  { path: "instructors", component: InstructorComponent },
  { path: "instructors/create", component: InstructorCreateComponent },
  { path: "instructors/:id", component: InstructorGetByIdComponent },
  // Semesters' paths
  { path: "semesters", component: SemesterComponent },
  { path: "semesters/create", component: SemesterCreateComponent },
  { path: "semesters/:id", component: SemesterGetByIdComponent },
  // Students' paths
  { path: "students", component: StudentComponent },
  { path: "students/create", component: StudentCreateComponent },
  { path: "students/:id", component: StudentGetByIdComponent },
  // Subjects' paths
  { path: "subjects", component: SubjectComponent },
  { path: "subjects/create", component: SubjectCreateComponent },
  // Error path
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
