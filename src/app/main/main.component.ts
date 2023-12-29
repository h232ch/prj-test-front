import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  user: User;
  message: string;
  authServiceSub: Subscription;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.onMessage();
  }

  onMessage() {
    this.authServiceSub = this.authService.user.subscribe(res => {
      this.user = res;

      if (this.user) {
        this.message = "Welcome " + this.user.email + "!";
      } else {
        this.message = "Welcome guest!"
      }
    })
  }

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }
}
