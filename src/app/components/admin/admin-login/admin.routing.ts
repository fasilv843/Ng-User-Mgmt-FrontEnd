import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminLoginComponent } from "./admin-login.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { UsersListComponent } from "../users-list/users-list.component";
import { EditUserComponent } from "../edit-user/edit-user.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { AdminAuthGuardComponent } from "src/app/guards/admin.auth.guard";
import { AdminLoginGuard } from "src/app/guards/admin.login.guard";

const routes: Routes = [
    {
        path:'admin', 
        component: AdminLoginComponent,
        canActivate: [AdminLoginGuard]
    },
    {
        path: 'admin',
        children: [
            {
                path:'dashboard', 
                component: DashboardComponent,
                canActivate: [AdminAuthGuardComponent]
            },
            {
                path: 'usersList', 
                component: UsersListComponent,
                canActivate: [AdminAuthGuardComponent]

            },
            {
                path: 'editUser/:id', 
                component: EditUserComponent,
                canActivate: [AdminAuthGuardComponent]

            },
            {
                path: 'createUser', 
                component:CreateUserComponent ,
                canActivate: [AdminAuthGuardComponent]

            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
  
export class AdminRoutingModule {}