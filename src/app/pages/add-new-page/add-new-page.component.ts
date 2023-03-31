import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-page',
  template: ` <app-navbar></app-navbar>
    <main class="d-flex">
      <app-sidebar></app-sidebar>
      <div style="width: 100%">
        <app-register></app-register>
        <app-footer></app-footer>
      </div>
    </main>`,
})
export class AddNewPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
