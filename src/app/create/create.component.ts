import { Component, OnInit } from '@angular/core';
import { StorageService } from '../firebase-storage.service';
import { ProjectService } from '../firebase-project.service';
import { FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  uploadedFile: File;
  projectPath: FirebaseListObservable<any>;
  platformPath: FirebaseListObservable<any>;
  lobPath: FirebaseListObservable<any>;
  statusPath: FirebaseListObservable<any>;
  tags: string;

  public time;
  isCompleted: boolean = true;

  constructor(public ss: StorageService, private ps: ProjectService) {

    this.platformPath = this.ps.getPlatformPath();
    this.statusPath = this.ps.getstatusPath();
    this.time = this.ps.getTime();


  }

  postPlatformSelection(pf: string) {
    console.log('pps' + pf);
    this.lobPath = this.ps.getLobPath(pf);
  }

  handleUpload(fileInput: any): void {
    this.uploadedFile = fileInput.target.files[0];
  }

  submit(nam: string, desc: string, platform: string, lob: string, status: string) {
    console.log(nam);

    this.ss.uploadFile(this.uploadedFile, nam, desc, platform, lob, status);
    this.isCompleted = false;

  }

  ngOnInit() {
    this.platformPath = this.ps.getPlatformPath();
  }

}
