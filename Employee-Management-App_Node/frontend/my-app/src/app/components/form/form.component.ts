import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  show: boolean = false;

  constructor(private service:UserService) { }
  faSearch = faSearch;
  faSignOutAlt = faSignOutAlt;
  

  readData:any;

  ngOnInit(): void {
    this.service.getAllData().subscribe((res)=> {
      console.log(res,"res==>");
      this.service = res.data;
      this.readData = res.Users
      
    })
    
  }

}
