import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt

  constructor(private service:UserService, private router:Router) { }

  errormsg:any;
  title = 'Please create a new account';

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'password2': new FormControl('', Validators.required)
  });

  userSubmit() {
    if(this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.create(this.userForm.value).subscribe((res)=> {
        console.log(res,'res==>');
        this.userForm.reset();
        
        
      })

    }else {
      this.errormsg = 'All fields are required';
      
    }
    
  };

}
