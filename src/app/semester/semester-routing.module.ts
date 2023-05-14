import { NgModule } from "@angular/core";
import { SemesterComponent } from "./semester.component";
import { AuthGuard } from "../login/auth.guard";
import { SemesterUpdateComponent } from "./semester.update/semester.update.component";
import { SemesterGetByIdComponent } from "./semester.get-by-id/semester.get-by-id.component";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "../login/admin.guard";
import { SemesterGetAllComponent } from "./semester.get-all/semester.get-all.component";
import { SemesterCreateComponent } from "./semester.create/semester.create.component";

const routes: Routes = [
    {
        path: "",
        component: SemesterComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", component: SemesterGetAllComponent, canActivate: [AuthGuard] },
            { path: "create", component: SemesterCreateComponent, canActivate: [AdminGuard] },
            { path: "update/:id", component: SemesterUpdateComponent, canActivate: [AdminGuard] },
            { path: ":id", component: SemesterGetByIdComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: "**", component: SemesterComponent }
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SemesterRoutingModule { }
