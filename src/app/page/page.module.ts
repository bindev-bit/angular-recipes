import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarComponent } from './components/sidebar/sidebar.component';


const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    PageComponent,
    HomeComponent,
    DetailComponent,
    ContactComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    FlexLayoutModule
  ]
})
export class PageModule { }
