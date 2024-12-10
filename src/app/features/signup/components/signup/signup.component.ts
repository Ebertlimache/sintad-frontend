import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', Validators.required]
    });
  }

  async signup() {
    if (this.signupForm.invalid) {
      return;
    }
    
    const { email, password, fullName } = this.signupForm.value;
    try {
      const response = await firstValueFrom(this.authService.signup(email, password, fullName));
      console.log('Registro exitoso:', response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  }
}