import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectCreateComponent } from './subject.create/subject.create.component';
import { AuthGuard } from '../login/auth.guard';
import { AdminGuard } from '../login/admin.guard';
import { SubjectUpdateComponent } from './subject.update/subject.update.component';
import { SubjectGetAllComponent } from './subject.get-all/subject.get-all.component';
import { SubjectComponent } from './subject.component';

const routes: Routes = [
    {
        path: "",
        component: SubjectComponent,
        canActivate: [AuthGuard],
        children: [
            { path: "", component: SubjectGetAllComponent, canActivate: [AuthGuard] },
            { path: "create", component: SubjectCreateComponent, canActivate: [AdminGuard] },
            { path: "update/:id", component: SubjectUpdateComponent, canActivate: [AdminGuard] }
        ]
    },
    { path: "**", component: SubjectComponent }
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SubjectRoutingModule { }
