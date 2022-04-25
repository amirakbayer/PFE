//import * as internal from "stream";

export class reclam{
    id:string;
    id_reclamant:string;
    id_lieu: string;
    id_etat: number;
    date : string;
    Id_sousCateg : number;
    urg : number;
    desc: string;
    id_affect : string;
  

    constructor(id:string,id_reclamant:string,id_lieu:string,id_etat: number,date: string ,Id_sousCateg : number,urg : number,desc?: string,id_affect? : string){
        this.id=id;
        this.id_reclamant=id_reclamant;
        this.id_lieu=id_lieu;
        this.id_etat=id_etat;
        this.date=date;
        this.Id_sousCateg=Id_sousCateg;
        this.urg=urg;
        this.desc=desc;
        this.id_affect=id_affect;

    }
}