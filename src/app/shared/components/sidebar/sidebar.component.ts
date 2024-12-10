import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) { }
  isSidebarOpen = false;
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Cambia el estado de la propiedad
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
