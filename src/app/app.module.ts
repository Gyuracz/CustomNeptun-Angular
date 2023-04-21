import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

import { DbService } from './db.service';

// Import Materials
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { InstructorComponent } from './instructor/instructor.component';
import { SubjectComponent } from './subject/subject.component';
import { SemesterComponent } from './semester/semester.component';
import { StudentComponent } from './student/student.component';
import { InstructorGetByIdComponent } from './instructor/instructor.get-by-id/instructor.get-by-id.component';
import { StudentGetByIdComponent } from './student/student.get-by-id/student.get-by-id.component';
import { SemesterGetByIdComponent } from './semester/semester.get-by-id/semester.get-by-id.component';
import { SubjectCreateComponent } from './subject/subject.create/subject.create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SemesterCreateComponent } from './semester/semester.create/semester.create.component';
import { StudentCreateComponent } from './student/student.create/student.create.component';
import { InstructorCreateComponent } from './instructor/instructor.create/instructor.create.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructorComponent,
    SubjectComponent,
    SemesterComponent,
    StudentComponent,
    InstructorGetByIdComponent,
    StudentGetByIdComponent,
    SemesterGetByIdComponent,
    SubjectCreateComponent,
    SemesterCreateComponent,
    StudentCreateComponent,
    InstructorCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(DbService),
    HttpClientModule,
    ReactiveFormsModule,

    // Material modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
