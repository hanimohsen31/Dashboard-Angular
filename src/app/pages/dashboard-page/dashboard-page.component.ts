import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  template: `
    <app-navbar></app-navbar>
    <main class="d-flex">
      <app-sidebar></app-sidebar>
      <div style="width: 100%">
        <app-dashboard></app-dashboard>
        <app-footer></app-footer>
      </div>
    </main>
  `,
})
export class DashboardPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
