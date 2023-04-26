import { NgModule } from "@angular/core";
import { SemesterComponent } from "./semester.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SemesterRoutingModule } from "./semester-routing.module";
import { SemesterService } from "./semester.service";
import { SemesterCreateComponent } from "./semester.create/semester.create.component";
import { SemesterGetByIdComponent } from "./semester.get-by-id/semester.get-by-id.component";
import { SemesterUpdateComponent } from "./semester.update/semester.update.component";
import { SharedPipesModule } from "../shared-pipes.module";
import { SemesterGetAllComponent } from './semester.get-all/semester.get-all.component';

@NgModule({
    declarations: [
      SemesterComponent,
      SemesterCreateComponent,
      SemesterGetByIdComponent,
      SemesterUpdateComponent,
      SemesterGetAllComponent
    ],
    imports: [
      SemesterRoutingModule,
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
      SemesterService
    ]
})
export class SemesterModule { }
