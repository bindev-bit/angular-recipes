import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('navbar') navbar: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    if (this.navbar.nativeElement.classList[3] == null) {
      this.navbar.nativeElement.classList.add('collapse');
    } else {
      this.navbar.nativeElement.classList.remove('collapse');
    }
  }


}
