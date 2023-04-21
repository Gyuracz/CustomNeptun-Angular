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
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "instructors", component: InstructorComponent },
  { path: "instructors/:id", component: InstructorGetByIdComponent },
  { path: "instructors/create", component: InstructorCreateComponent },
  { path: "semesters", component: SemesterComponent },
  { path: "semesters/:id", component: SemesterGetByIdComponent },
  { path: "semesters/create", component: SemesterCreateComponent },
  { path: "students", component: StudentComponent },
  { path: "students/:id", component: StudentGetByIdComponent },
  { path: "students/create", component: StudentCreateComponent },
  { path: "subjects", component: SubjectComponent },
  { path: "subjects/create", component: SubjectCreateComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
