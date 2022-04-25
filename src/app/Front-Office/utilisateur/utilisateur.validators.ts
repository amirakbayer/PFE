import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UtilisateurValidators{
    static matrExists(control : AbstractControl): Promise<ValidationErrors|null>{
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                if (control.value ==='5')
                    resolve({matrExists: true});
                else
                    resolve(null);    
            },2000);
        });
    }
}