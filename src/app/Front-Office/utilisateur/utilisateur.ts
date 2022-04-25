export class utilisateur{
    private id: string;
private matr : string;
private mdp: string;
private nom: string;
private prenom : string;
private num_tel: number;
private email : string;
private id_role : string;
private id_lieu :string;
  constructor( Id: string,matr : string,mdp: string,nom: string,prenom : string,num_tel: number,email : string, id_role: string, id_lieu: string) {
    this.id=Id;
    this.matr=matr;
    this.mdp=mdp;
    this.nom=nom;
    this.prenom=prenom;
    this.num_tel=num_tel;
    this.email=email;
    this.id_role=id_role;
    this.id_lieu=id_lieu;
   }
get Id(){
  return this.id
}
get Matr(){
  return this.matr;
}
get Mdp(){
  return this.mdp;
}
get Id_role(){
  return this.id_role;
}
get Id_lieu(){
  return this.id_lieu;
}
get Nom(){
  return this.nom;
}
get Prenom(){
  return this.prenom;
}
get Num_tel(){
  return this.num_tel;
}
get Email(){
  return this.email;
}
}


