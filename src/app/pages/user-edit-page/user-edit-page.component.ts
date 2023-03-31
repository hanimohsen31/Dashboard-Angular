import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit-page',
  template: `
  <app-navbar></app-navbar>
  <main class="d-flex">
    <app-sidebar></app-sidebar>
    <div style="width: 100%">
    <app-user-edit></app-user-edit>
      <app-footer></app-footer>
    </div>
  </main>
`,
})
export class UserEditPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
