import { Component, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;
}
