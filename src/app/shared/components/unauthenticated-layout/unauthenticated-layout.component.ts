import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-unauthenticated-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './unauthenticated-layout.component.html',
  styleUrl: './unauthenticated-layout.component.css'
})
export class UnauthenticatedLayoutComponent {

}
