import { Component, OnInit, Input } from '@angular/core';
import { RecServiceService } from '../rec-service.service';
import { reclam } from '../reclam';

@Component({
  selector: 'full',
  templateUrl: './full.component.html',
  //template: '',
  styleUrls: ['./full.component.css'],
  //inputs: ['ident']
})
export class FullComponent implements OnInit {
  ident! : string;
  //rec! : reclam;
  //R0= new reclam("0","000","en attente","01/01/2000","00",1);
  constructor(private service:RecServiceService) { 
    console.log("I'm in full component");

  }
  
  ngOnInit(): void {


    //if(this.service.IdExists(this.ident)){
     // this.rec=<reclam> this.service.getRecDet(this.ident);
    //} else {
      //this.rec=this.R0;
    //}
    
    //console.log(this.rec);
  }


}
