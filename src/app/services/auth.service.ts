import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment.prod";
import { FlashMessagesService } from "angular2-flash-messages";

const BACKEND_URL = environment.backendUrl + "/users/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private role: string;

  constructor(
    private http: HttpClient,
    public flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    name: string,
    username: string,
    email: string,
    password: string,
    bio: string
  ) {
    const authData = {name, username, email, password, bio};

    return this.http.post<{ response: any }>(BACKEND_URL + "signup", authData);
  }


  adminSignup(
    name: string,
    username: string,
    email: string,
    password: string,
    bio: string
  ) {
    
    const authData = {name, username, email, password, bio};

    return this.http.post<{ response: any }>(BACKEND_URL + "admin-signup", authData);
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<{ response: any }>(BACKEND_URL + "login", authData)
      .subscribe((data) => {
        const token = data.response.token;
        this.token = token;
        if(data.response.success) {
          if (token) {
            const role = data.response.role;
            this.role = role;
            const expiresInDuration = data.response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = data.response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId, role);
            this.flashMessagesService.show(data.response.msg, {
              cssClass: "alert-success",
              timeout: 3000,
            });
            console.log(role);
            if(role === 'admin') {
              this.router.navigate(["/admin/dashboard"]);
            } else {
              this.router.navigate(["/account/home"]);
            }
          }
        }
      }, err=> {
          this.flashMessagesService.show('Email or password are incorrect!!', {
            cssClass: "alert-danger",
            timeout: 3000,
          });
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.flashMessagesService.show("Logged out !!", {
      cssClass: "alert-success",
      timeout: 3000,
    });
    this.router.navigate(["/account/login"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      role: role
    };
  }

  getAuthProfile() {
    return this.http.get<{ response: any }>(BACKEND_URL + "profile");
  }

  getUserProfile(username: string) {
    return this.http.get<{ user: any }>(BACKEND_URL + username);
  }

  getUsers() {
    return this.http.get<{ users: any[] }>(BACKEND_URL + "all-users");
  }

  findUserById(id) {
    return this.http.get<{response: any}>(BACKEND_URL + id);
  }

  findUserByUsername(username: string) {
    return this.http.get<{response: any}>(BACKEND_URL + 'user/' + username);
  }
}
