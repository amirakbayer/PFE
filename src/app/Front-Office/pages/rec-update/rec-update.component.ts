
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild ,ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProgressComponent } from './progress/progress.component';
import { RecServiceService } from '../../reclamation/rec-service.service';



@Component({
  selector: 'app-rec-update',
  templateUrl: './rec-update.component.html',
  styleUrls: ['./rec-update.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecUpdateComponent implements OnInit, AfterViewInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  
  id;
  rec;
  assistants;
  private sub: any;
  
  constructor(private route: ActivatedRoute,private router: Router,private _formBuilder: FormBuilder,private recService: RecServiceService) { }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      
       //In a real app: dispatch action to load the details here.
      
   });
   this.firstFormGroup = this._formBuilder.group({
    firstCtrl: new FormControl('',Validators.required),
  });
  


this.rec=this.recService.getRecDet(this.id);
this.assistants=[{id:'1',name:'john Smith'},] ///here we put the api to get assistants
  }
  get firstCtrl(){
    return this.firstFormGroup.get('firstCtrl');
  }
  
  
  
  ngAfterViewInit() {}
  
}


