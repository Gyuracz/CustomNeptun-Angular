import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubjectComponent } from './subject.component';
import { SubjectCreateComponent } from './subject.create/subject.create.component';
import { SubjectUpdateComponent } from './subject.update/subject.update.component';
import { SubjectService } from './subject.service';
import { SubjectRoutingModule } from './subject-routing.module';
import { SharedPipesModule } from '../shared-pipes.module';
import { SubjectGetAllComponent } from './subject.get-all/subject.get-all.component';

@NgModule({
  declarations: [
    SubjectComponent,
    SubjectCreateComponent,
    SubjectUpdateComponent,
    SubjectGetAllComponent
  ],
  imports: [
    SubjectRoutingModule,
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
    SubjectService
  ]
})
export class SubjectModule { }
