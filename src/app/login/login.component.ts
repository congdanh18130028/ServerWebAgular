import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  form!: FormGroup ;


  submit() {
    if (this.form.valid) {
      let username = this.form.controls['email'].value;
      let password = this.form.controls['password'].value;
      this.authService.login(username, password).subscribe(data => {
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['/home']);
        
      });
  
      
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  constructor(private authService: AuthService, 
              private formBuilder : FormBuilder, 
              private router : Router,
              private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }


}
