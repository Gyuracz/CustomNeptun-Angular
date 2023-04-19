import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InstructorComponent } from './instructor/instructor.component';
import { SemesterComponent } from './semester/semester.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  {path: "", redirectTo: "", pathMatch: "full"},
  {path: "instructors", component: InstructorComponent},
  {path: "semesters", component: SemesterComponent},
  {path: "students", component: StudentComponent},
  {path: "subjects", component: SubjectComponent},
  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }