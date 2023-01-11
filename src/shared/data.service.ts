import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { CarParts } from 'src/model/car_parts';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  constructor(private afs: AngularFirestore) {}

  listHouseLogs(houseId: String, selectedMonth: number, selectedYear: number){

    let start = new Date(selectedYear+'-'+selectedMonth+'-01');
    var month = selectedMonth
    var year = selectedYear

    if (selectedMonth == 12){
      month = 1
      console.log(year)
      year = Number(selectedYear) + 1
      console.log(year)
    }else {
      month = selectedMonth + 1
      year = selectedYear
    }
    let end = new Date(year+'-'+(month)+'-01');

    return (this.afs.collection('/houseLogs', ref => ref.
    where('date', '>', start).
    where('date', '<', end).
    where('houseId', '==', houseId).orderBy('date', 'desc')).snapshotChanges())
  }

  listAllHouses(){
    return this.afs.collection('/houses').snapshotChanges();
  }

  addHouseLogs(houseLogs: any) {
    return this.afs.collection('/houseLogs').doc(houseLogs.id).set(houseLogs);
  }


  // async listAllHouses(): Promise<any>{
  //   // return this.afs.collection('/houses').snapshotChanges();
  //   let response : any;

  //   const ref = doc(this.firestore, '/houses');
  //   const docSnap = await getDoc(ref);


  //   if(docSnap.data()){
  //     response = docSnap.data();
  // } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  // }
  // //return docData(ref, { idField: 'id' }) as Observable<any>;
  // if(response){
  //     //console.log(response)
  //     return response;
  //   } else {
  //     console.log("No records with ladder Id found")
  //     return null
  // }

  // }


  addHouse(house: any) {
    house.id = this.afs.createId();
    return this.afs.collection('/houses').doc(house.id).set(house);
  }

  updateParts(carParts: CarParts) {
    carParts.id = carParts.id;
    return this.afs.collection('/carParts').doc(carParts.id).set(carParts);
  }

  addParts(carParts: CarParts) {
    carParts.id = this.afs.createId();
    return this.afs.collection('/carParts').doc(carParts.id).set(carParts);
  }

  deleteParts(carParts: CarParts) {
    console.log('/carParts/' + carParts.id);
    return this.afs.doc('/carParts/' + carParts.id).delete();
  }

  deleteHouseTasks(carParts: CarParts) {
    console.log('/houseTasks/' + carParts.id);
    return this.afs.doc('/houseTasks/' + carParts.id).delete();
  }

  getAllParts() {
    return this.afs.collection('/carParts').snapshotChanges();
  }

  getHouseTasks() {
    return this.afs.collection('/houseTasks').snapshotChanges();
  }
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth) {}

  signin(email: string, password: string): Promise<any> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch((e) => {
        return e;
      });
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
