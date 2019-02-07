import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Response} from '@angular/http';
import { CommonService, LoaderService } from '../services/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class LoginComponent implements OnInit, OnDestroy {
  showPage :boolean =  false;
  response : any;
  details = 
  {
  // "realm": "",
  // "username": "",
  "email": "",
  "password": ""
  // "emailVerified": true
  };
  constructor(private service:CommonService,private commonService : CommonService, private router : Router, private loaderService: LoaderService) {
    this.commonService.showHeadernFooter(false);
   }

   seturl(){
     if(this.router.url==="/login/student")
      localStorage.setItem('loggedIn','student');
    else
      localStorage.setItem('loggedIn','mentor');
   }

   reset(){
     if(this.router.url==="/login/student"){
       if(this.details.email===""){
         alert("Give emailId to reset your password");
         return;
       }
     console.log(this.details.email,"student")
     this.service.reset(this.details.email,"student").subscribe(res=>{
     })
     alert("Verification Link is sent to your EmailId")
    }
    else{
      if(this.details.email===""){
        alert("Give emailId to reset your password");
        return;
      }
     console.log(this.details.email,"mentor")
     this.service.reset(this.details.email,"mentor").subscribe(res=>{
     })
     alert("Verification Link is sent to your EmailId")
    }
   }

  ngOnInit() {
    if(localStorage.getItem('name')!==null)
      this.router.navigateByUrl('/dashboard/university');
    this.loaderService.display(true);
    setTimeout(()=>{
     this.showPage = true
     this.loaderService.display(false);
    },400);
    
  }

  signUp()
  {
    if(this.router.url == '/login/student')
    {
      this.router.navigate(['signup/student']);
    }
    else
    {
      this.router.navigate(['signup/mentor']);
    }
  }

  submit()
  {
    console.log(this.router.url);
    if(this.router.url === '/login/student')
    {
      console.log('this.router.url', this.router.url);
      this.commonService.login(this.details).subscribe((result)=>
      {
       console.log(result);
       this.response  = result;
        localStorage.setItem('loggedIn', 'student');
        localStorage.setItem('name',  this.response.Name );
        localStorage.setItem('email',  this.response.email );
        localStorage.setItem('id', this.response.id);

        this.router.navigate(['/dashboard/university']);
     },err=>{alert("Wrong password")})
    }
    else{
      this.commonService.mentorLogin(this.details).subscribe((result)=>
      {
       console.log(result);
       this.response  = result;
       console.log(this.response.status);
       if(this.response.status===404){
         alert("Wrong credentials");
         return;
       }
        localStorage.setItem('loggedIn', 'mentor');
        localStorage.setItem('id',this.response.id);
        localStorage.setItem('name', this.response.Name);
        this.router.navigate(['/profile']);
        
     },err=>{alert("Wrong credentials")})

    }

  }

  ngOnDestroy(){
    this.commonService.showHeadernFooter(true);
    this.commonService.removejscssfile("style.css", "css");
    this.commonService.removejscssfile("material-icon/css/material-design-iconic-font.min.css", "css");
    
  }
}
