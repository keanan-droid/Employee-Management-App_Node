import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;

  constructor(private service:UserService, private router:Router) { }
  errormsg:any;
  title = 'Please create a new account';

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  userLogin() {
    if(this.userForm.valid) {
      this.service.signin(this.userForm.value).subscribe((res)=> {
        const user = res.msg == 'welcome user'
        if (user) {
          this.userForm.reset();
          this.router.navigate(['home']);
        }
      })
    }else {
      this.errormsg = 'All fields are required';
      
    }
    
  };

}
