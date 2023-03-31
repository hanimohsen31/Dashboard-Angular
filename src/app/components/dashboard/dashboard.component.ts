import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [
    {
      header: 'Landing page',
      title: 'Build a responsive landing page',
      desc: ' Create a landing page that looks great on desktop, tablet, and mobile devices.',
      status: 'active',
    },
    {
      header: 'Authentication',
      title: 'Implement user authentication',
      desc: ' Add user authentication to your web application using a popular authentication library like Firebase or Auth0.',
      status: 'bending',
    },
    {
      header: 'REST API',
      title: 'Create a REST API',
      desc: 'Build a REST API using a framework like Express.js and connect it to a database like MongoDB.',
      status: 'bending',
    },
    {
      header: 'Chat application',
      title: 'Develop a chat application',
      desc: 'Build a real-time chat application using a technology like Socket.io or Firebase Realtime Database.',
      status: 'active',
    },
    {
      header: 'Cloud provider',
      title: 'Deploy your application to a cloud provider',
      desc: 'Deploy your web application to a cloud provider like AWS, Google Cloud, or Heroku.',
      status: 'active',
    },
    {
      header: 'Optimizations',
      title: 'Optimize your website for speed',
      desc: 'Use tools like PageSpeed Insights and Lighthouse to optimize your website for fast loading times.',
      status: 'bending',
    },
    {
      header: 'Internationalization',
      title: 'Implement internationalization',
      desc: 'Add support for multiple languages to your web application using a library like i18next.',
      status: 'bending',
    },
    {
      header: 'Navigation menu',
      title: 'Create a responsive navigation menu',
      desc: 'Build a navigation menu that changes based on the users device screen size.',
      status: 'active',
    },
    {
      header: 'Validation',
      title: 'Build a custom form validation library',
      desc: 'Create a custom library for form validation using JavaScript.',
      status: 'bending',
    },
    {
      header: 'Dashboard',
      title: 'Develop a dashboard',
      desc: 'Build a dashboard that displays key metrics and data for your web application.',
      status: 'active',
    },
    {
      header: 'Server-Side',
      title: 'Implement server-side rendering',
      desc: 'Use a technology like Next.js to implement server-side rendering in your web application.',
      status: 'bending',
    },
    {
      header: 'Machine learning model',
      title: 'Build a machine learning model',
      desc: 'Develop a machine learning model using a tool like TensorFlow or PyTorch.',
      status: 'active',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
