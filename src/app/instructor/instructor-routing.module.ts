import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "../login/admin.guard";
import { AuthGuard } from "../login/auth.guard";
import { InstructorComponent } from "./instructor.component";
import { InstructorCreateComponent } from "./instructor.create/instructor.create.component";
import { InstructorGetByIdComponent } from "./instructor.get-by-id/instructor.get-by-id.component";
import { InstructorUpdateComponent } from "./instructor.update/instructor.update.component";
import { InstructorGetAllComponent } from "./instructor.get-all/instructor.get-all.component";

const routes: Routes = [
    {
        path: "",
        component: InstructorComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", component: InstructorGetAllComponent, canActivate: [AuthGuard] },
            { path: "create", component: InstructorCreateComponent, canActivate: [AdminGuard] },
            { path: "update/:id", component: InstructorUpdateComponent, canActivate: [AdminGuard] },
            { path: ":id", component: InstructorGetByIdComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: "**", component: InstructorComponent }
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class InstructorRoutingModule { }
