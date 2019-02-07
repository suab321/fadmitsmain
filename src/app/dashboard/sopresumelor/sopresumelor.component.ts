import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sopresumelor',
  templateUrl: './sopresumelor.component.html',
  styleUrls: ['./sopresumelor.component.css']
})
export class SopresumelorComponent implements OnInit {
  public file;
  public Sopresponse;
  public Lorresponse;
  public Resumeresponse;
  public isuploadedsop: boolean = true;
  public isuploadedresume: boolean = true;
  public isuploadedlor: boolean = true;
  public response;
  public isdocumentupload:boolean=false
  public details = {
    soplink: '',
    lorlink: '',
    resumelink: '',
    S_ID: '',
    Name:''
  }


  constructor(private service: CommonService) { }

  ngOnInit() {
  }
  filechange(e) {
    this.file = e.target.files[0];
    console.log(this.file);
  }
  uploadsop() {
    if (this.file === undefined) {
      alert("Field cant be empty");
      return;
    }
    this.service.geturlofFile(this.file).subscribe(res => {
      this.Sopresponse = res.split('**')[0];
      console.log(this.Sopresponse)
      this.isuploadedsop = false
      this.file = null;
    })
  }
  uploadlor() {
    if (this.file === undefined) {
      alert("Field cant be empty");
      return;
    }
    this.service.geturlofFile(this.file).subscribe(res => {
      this.Lorresponse = res.split('**')[0];
      console.log(this.Lorresponse)
      this.isuploadedlor = false
      this.file = null;
    })
  }
  uploadresume() {
    if (this.file === undefined) {
      alert("Field cant be empty");
      return;
    }
    this.service.geturlofFile(this.file).subscribe(res => {
      this.Resumeresponse = res.split('**')[0];
      console.log(this.Resumeresponse)
      this.isuploadedresume = false
      this.file = null;
    })
  }
  uploadfiles() {
    if(this.Lorresponse===undefined&&this.Resumeresponse===undefined)
    {
      if(this.Sopresponse===undefined){
      alert("At leastOne field must be set");
      return;
    }
    else{
      this.details.resumelink = "NA"
      this.details.lorlink = "NA"
      this.details.soplink = this.Sopresponse
      this.details.S_ID = localStorage.getItem('id');
      this.details.Name=localStorage.getItem('name')
      this.service.sendfileUrl(this.details).subscribe(res => {
      this.response = res;
      this.isdocumentupload=true;
      alert("Uploaded Successfully!");
      console.log(this.response);
    })
    }
  }
  else if(this.Sopresponse===undefined&&this.Resumeresponse===undefined){
    if(this.Lorresponse===undefined){
      alert("At least one file must be present");
    }
    else{
      this.details.soplink = "NA"
      this.details.resumelink = "NA"
      this.details.lorlink = this.Lorresponse
      this.details.S_ID = localStorage.getItem('id');
      this.details.Name=localStorage.getItem('name')
      this.service.sendfileUrl(this.details).subscribe(res => {
      this.response = res;
      this.isdocumentupload=true;
      alert("Uploaded Successfully!");
      console.log(this.response);
    })
  }
  }
  else if(this.Sopresponse===undefined&&this.Lorresponse===undefined){
    if(this.Resumeresponse===undefined){
      alert("At least one file must be present");
    }
    else{
      this.details.soplink = "NA"
      this.details.lorlink = "NA"
      this.details.resumelink = this.Resumeresponse
      this.details.S_ID = localStorage.getItem('id');
      this.details.Name=localStorage.getItem('name')
      this.service.sendfileUrl(this.details).subscribe(res => {
      this.response = res;
      this.isdocumentupload=true;
      alert("Uploaded Successfully!");
      console.log(this.response);
    })
  }
  }
  else{
      this.details.soplink = this.Sopresponse
      this.details.lorlink = this.Lorresponse
      this.details.resumelink = this.Resumeresponse
      this.details.S_ID = localStorage.getItem('id');
      this.details.Name=localStorage.getItem('name')
      this.service.sendfileUrl(this.details).subscribe(res => {
      this.response = res;
      this.isdocumentupload=true;
      alert("Uploaded Successfully!");
      console.log(this.response);
    })
  }
  }
}
