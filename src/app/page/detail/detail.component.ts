import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  resep: any = {};
  listBahan: any = [];

  constructor(
    private route: ActivatedRoute,
    private fire: AngularFirestore
  ) {
    this.getData(route.snapshot.queryParams.id);
  }

  ngOnInit(): void {
  }

  getData(id: string) {
    this.fire.collection('resep').doc(id).get().subscribe((resp) => {
      this.resep = resp.data();
      this.listBahan = this.resep['bahan'];
    })
  }

}
