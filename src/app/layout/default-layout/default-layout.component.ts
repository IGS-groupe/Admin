import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { UserService } from 'src/app/services/user.service';

function isOverflown(element: HTMLElement): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public isAdmin = false;

  constructor(private authService: UserService) {
    this.checkAdminStatus();
  }

  ngOnInit(): void {
    
  }

  private async checkAdminStatus(): Promise<void> {
    this.isAdmin = await this.authService.isAdmin();
    console.log(this.isAdmin);
    if (!this.isAdmin) {
      this.navItems = this.navItems.filter(item => item.name !== 'Employee');
      console.log(this.isAdmin);
    }
  }

  onScrollbarUpdate($event: any): void {
    // Additional scrollbar update logic can be placed here.
  }
}