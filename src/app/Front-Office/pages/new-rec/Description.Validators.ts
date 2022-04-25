import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export class DescriptionValidators{
    static DescConditionallyRequiredValidator(formControl: AbstractControl) {
        console.log("works");
        const s = formControl.get('sousCateg').value;
        console.log(s);
        if (!formControl.parent) {
          return null;
        }
        
        if (formControl.parent.get('sousCateg').value) {
            console.log("works here");
          return Validators.required(formControl); 
          
        }
        return null;
      }
}