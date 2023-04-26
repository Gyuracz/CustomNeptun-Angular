import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { InstructorRoutingModule } from "./instructor-routing.module";
import { InstructorComponent } from "./instructor.component";
import { InstructorCreateComponent } from "./instructor.create/instructor.create.component";
import { InstructorGetByIdComponent } from "./instructor.get-by-id/instructor.get-by-id.component";
import { InstructorService } from "./instructor.service";
import { InstructorUpdateComponent } from "./instructor.update/instructor.update.component";
import { SharedPipesModule } from "../shared-pipes.module";
import { InstructorGetAllComponent } from './instructor.get-all/instructor.get-all.component';

@NgModule({
    declarations: [
      InstructorComponent,
      InstructorCreateComponent,
      InstructorGetByIdComponent,
      InstructorUpdateComponent,
      InstructorGetAllComponent
    ],
    imports: [
      InstructorRoutingModule,
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
      InstructorService
    ]
})
export class InstructorModule { }
