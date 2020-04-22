import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuElements: {name: string, path: string, icon: string}[] = [
    {name: 'Home', path: 'home', icon: 'home'},
    {name: 'My Dashboard', path: '', icon: 'dashboard'},
    {name: 'My Table', path: 'my-table', icon: 'table-chart'},
    {name: 'Dialog', path: 'app-my-dialog', icon: 'tab'},
    {name: 'Problems', path: 'problems', icon: 'report-problem'}
  ];

  constructor(private breakpointObserver: BreakpointObserver, private router : Router, private authenticationService: AuthenticationService) {}

  routeIsActive(routePath: string) {
    return this.router.url == routePath ? 'routerLinkActive="active"' : '';
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
