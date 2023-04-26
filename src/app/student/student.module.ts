import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentCreateComponent } from './student.create/student.create.component';
import { StudentGetByIdComponent } from './student.get-by-id/student.get-by-id.component';
import { StudentUpdateComponent } from './student.update/student.update.component';
import { StudentService } from './student.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentRoutingModule } from './student-routing.module';
import { SharedPipesModule } from '../shared-pipes.module';
import { StudentGetAllComponent } from './student.get-all/student.get-all.component';

@NgModule({
    declarations: [
      StudentComponent,
      StudentCreateComponent,
      StudentGetByIdComponent,
      StudentUpdateComponent,
      StudentGetAllComponent
    ],
    imports: [
      StudentRoutingModule,
      CommonModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      SharedPipesModule,
  
      // Material modules
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule
    ],
    providers: [
      StudentService
    ]
})
export class StudentModule { }
