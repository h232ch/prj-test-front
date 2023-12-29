import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  user: User;
  private authSub: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(res => {
      if (res) {
        this.user = res;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
