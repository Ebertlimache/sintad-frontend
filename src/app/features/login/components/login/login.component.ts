import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoginError: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    
    try {
      const { email, password } = this.loginForm.value;
      const response = await firstValueFrom(this.authService.login(email, password));
      localStorage.setItem('token', response.token);
      this.router.navigate(['/inicio']);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      if(error.status == 500){
        this.showLoginError = true;
      }
    }
  }
}