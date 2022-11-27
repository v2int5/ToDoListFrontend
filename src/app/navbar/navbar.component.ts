import {Component} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {faMagnifyingGlass, faGear, faArrowRightFromBracket, faUsers, faHouse} from "@fortawesome/free-solid-svg-icons";
import {faUser, faBell} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faUser = faUser;
  faMagnifyingGlass = faMagnifyingGlass;
  faSettings = faGear;
  faLogout = faArrowRightFromBracket;
  faFriends = faUsers;
  faHome = faHouse;
  faBell = faBell;
  //TODO: put icons in a single list


  userMenuVisible = false;
  notificationMenuVisible = false;
  //TODO: close elements when clicking outside a window

  searchValue = "";
  searchForm: FormGroup = new FormGroup({
    search: new FormControl("")
  });

  constructor(private authService: AuthenticationService, private router: Router) {

  }


  ngOnInit(): void {

  }



  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  isLoggedIn(){
    return this.authService.isUserLoggedIn();
  }

  searchTasks() {
    console.log(this.searchForm.get("search")?.value);
    this.searchForm.setValue({"search" : ""})
  }


  toggleUserDropdownMenu() {

    if(this.notificationMenuVisible){
      this.notificationMenuVisible = false;
    }
    this.userMenuVisible = !this.userMenuVisible;
  }

  toggleNotificationDropdownMenu() {
    if(this.userMenuVisible){
      this.userMenuVisible = false;
    }
    this.notificationMenuVisible = !this.notificationMenuVisible;
  }

}
