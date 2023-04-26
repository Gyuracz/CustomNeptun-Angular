import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { AuthGuard } from '../login/auth.guard';
import { AdminGuard } from '../login/admin.guard';
import { StudentCreateComponent } from './student.create/student.create.component';
import { StudentUpdateComponent } from './student.update/student.update.component';
import { StudentGetByIdComponent } from './student.get-by-id/student.get-by-id.component';
import { StudentGetAllComponent } from './student.get-all/student.get-all.component';

const routes: Routes = [
    {
        path: "",
        component: StudentComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", component: StudentGetAllComponent, canActivate: [AuthGuard] },
            { path: "create", component: StudentCreateComponent, canActivate: [AdminGuard] },
            { path: "update/:id", component: StudentUpdateComponent, canActivate: [AdminGuard] },
            { path: ":id", component: StudentGetByIdComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: "**", component: StudentComponent }
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class StudentRoutingModule { }
