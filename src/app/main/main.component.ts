import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User;
  message: string;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.onMessage();
  }

  onMessage() {
    this.authService.user.subscribe(res => {
      this.user = res;

      if (this.user) {
        this.message = "Welcome " + this.user.email + "!";
      } else {
        this.message = "Welcome guest!"
      }

    })

  }

}
