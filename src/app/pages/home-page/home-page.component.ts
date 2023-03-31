import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: ` <app-navbar></app-navbar>
    <main class="d-flex">
      <app-sidebar></app-sidebar>
      <div style="width: 100%">
        <app-home></app-home>
        <app-footer></app-footer>
      </div>
    </main>`,
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
