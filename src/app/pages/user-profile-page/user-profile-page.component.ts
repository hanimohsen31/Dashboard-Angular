import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  template: ` <app-navbar></app-navbar>
    <main class="d-flex">
      <app-sidebar></app-sidebar>
      <div style="width: 100%">
        <app-user-profile></app-user-profile>
        <app-footer></app-footer>
      </div>
    </main>`,
})
export class UserProfilePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
