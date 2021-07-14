import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listResep: any = [];

  constructor(
    public fire: AngularFirestore,
  ) {
    this.getResep();
  }

  ngOnInit(): void {
  }

  getResep() {
    return this.fire.collection('resep', ref => ref.orderBy('created_at')).snapshotChanges().subscribe((resp) => {
      this.listResep = resp;
      console.log(this.listResep)
    });
  }

}
