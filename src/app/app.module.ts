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
import {MatCardModule} from '@angular/material/card';
import { InstructorComponent } from './instructor/instructor.component';
import { SubjectComponent } from './subject/subject.component';
import { SemesterComponent } from './semester/semester.component';
import { StudentComponent } from './student/student.component';
import { InstructorGetByIdComponent } from './instructor/instructor.get-by-id/instructor.get-by-id.component';
import { StudentGetByIdComponent } from './student/student.get-by-id/student.get-by-id.component';
import { SemesterGetByIdComponent } from './semester/semester.get-by-id/semester.get-by-id.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructorComponent,
    SubjectComponent,
    SemesterComponent,
    StudentComponent,
    InstructorGetByIdComponent,
    StudentGetByIdComponent,
    SemesterGetByIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(DbService),
    HttpClientModule,

    // Material modules
    MatButtonModule,
    MatCardModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
