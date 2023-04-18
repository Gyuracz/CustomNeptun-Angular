import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Materials
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { InstructorComponent } from './instructor/instructor.component';
import { SubjectComponent } from './subject/subject.component';
import { SemesterComponent } from './semester/semester.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructorComponent,
    SubjectComponent,
    SemesterComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Material modules
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
