
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {

  imgSrc: string = "assets/img/photo.png";
  dataUser: any = {};
  resep: any = {};
  listBahan: string[] = [];
  showTambah: boolean = false;
  selectedImage?: string;
  imgUrl: string = "";
  title: string = "";

  now: number = Date.now();

  @Input() id: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fire: AngularFirestore,
    private storage: AngularFireStorage,
    user: AngularFireAuth,
    private toastService: ToastService,
    private datePipe: DatePipe
  ) {
    user.authState.subscribe(resp => {
      fire.collection('user').ref.where('email', '==', resp!.email).onSnapshot(snapshot => {
        snapshot.forEach(ref => {
          this.dataUser = ref.data();
        })
      })
    })
  }

  ngOnInit(): void {
    this.getData()
  }

  btnTambah() {
    this.showTambah = true;
  }

  btnHapusBahan(id: any) {
    this.listBahan.forEach((element, index) => {
      if (index == id) this.listBahan.splice(index, 1);
    });
  }

  btnBatal() {
    this.showTambah = false;
  }

  getData() {
    if (this.id != null) {
      this.title = "Detail Resep";
      this.fire.collection('resep').doc(this.id).get().subscribe((resp) => {
        this.resep = resp.data();
        this.listBahan = this.resep['bahan'];
        this.imgSrc = this.resep['image_url'];
      })
    } else {
      this.title = "Tambah Resep";
    }
  }

  getImage(url: any) {
    if (url.target.files && url.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (u: any) => this.imgSrc = u.target.result;
      reader.readAsDataURL(url.target.files[0]);
      this.selectedImage! = url.target.files[0];
      this.imgUrl = url.target.files[0]['name'];
    } else {
      this.imgSrc = "assets/img/photo.png";
      this.selectedImage!;
    }
  }

  tambahBahan(arg: any) {
    this.listBahan.push(arg.target.value);
    this.resep['bahan'] = this.listBahan;
    this.showTambah = false;
  }

  tapSimpan() {
    if (this.id == null) {
      this.tambahResep();
    } else {
      this.updateData();
    }
    this.activeModal.close();
  }

  tambahResep() {
    var filePath = `resep/${this.imgUrl.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    var fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => (
        fileRef.getDownloadURL().subscribe((url) => {
          this.resep['image_url'] = url;
          this.resep['created_at'] = this.datePipe.transform(this.now, 'MMM d, y, h:mm:ss a');
          this.resep['author'] = this.dataUser.username;

          this.fire.collection('resep').add(this.resep);
        })
      ))
    ).subscribe()
    this.showSuccess('Data berhasil ditambah');
  }

  updateData() {
    this.fire.collection('resep').doc(this.id).update({
      name: this.resep['name'],
      description: this.resep['description'],
      bahan: this.listBahan,
      cara_pembuatan: this.resep['cara_pembuatan'],
      created_at: this.resep['created_at']
    })
    this.showSuccess('Data berhasil diperbarui');
  }

  showSuccess(msg: string) {
    this.toastService.show(msg, {
      classname: 'bg-success text-light',
      delay: 3000,
      autohide: true,
      headertext: 'Info'
    });
  }

}
