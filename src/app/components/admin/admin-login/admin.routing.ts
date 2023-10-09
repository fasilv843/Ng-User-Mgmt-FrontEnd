import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminLoginComponent } from "./admin-login.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { UsersListComponent } from "../users-list/users-list.component";
import { EditUserComponent } from "../edit-user/edit-user.component";
import { CreateUserComponent } from "../create-user/create-user.component";

const routes: Routes = [
    {path:'admin', component: AdminLoginComponent},
    {
        path: 'admin',
        children: [
            {path:'dashboard', component: DashboardComponent},
            {path: 'usersList', component: UsersListComponent},
            {path: 'editUser/:id', component: EditUserComponent},
            {path: 'createUser', component:CreateUserComponent }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
  
export class AdminRoutingModule {}