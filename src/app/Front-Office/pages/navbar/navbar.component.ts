import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
role
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
this.role=localStorage.getItem('role');
//console.log(this.role);
  }

  disconnect(){
    
    localStorage.clear();
    
  }
  

}
