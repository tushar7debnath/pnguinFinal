import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ProjectService } from '../firebase-project.service';
import { StorageService } from '../firebase-storage.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  project: FirebaseObjectObservable<any>;
  title: string = 'download';
  path: string;
  name: string;
  version: string;
  statusSelector: FirebaseListObservable<any>;
  uploadedFile: File;
  submitted: boolean = false;
  constructor(private ps: ProjectService, private ss: StorageService) {

this.statusSelector = this.ps.getstatusPath();
  }
  download() {

    this.ss.downloadFile(this.path);
  }

  sub(project: any) {
    this.project = project;
    this.project.subscribe(prjkt => {this.path = prjkt.path; this.name = prjkt.name; this.version = prjkt.currentVersion; } );
  }

  update( newName: string, desc: string, status: string) {
    let newPath = this.path.replace(this.name, newName);
    this.ss.moveFile(this.path, newPath);
    this.project.update({name: newName, description: desc, path: newPath, status: status} );
  }
  handleUpload(fileInput: any): void {
    this.uploadedFile = fileInput.target.files[0];
  }

  updateVersion() {
    this.submitted = true;
    let ver: number = parseInt(this.version, 10);
    let vers: string = ver.toString();
    let newvers = (ver + 1).toString();
    this.path = this.path.replace(vers , newvers);
    console.log(ver);
    console.log(newvers);
    this.ss.updateVersion(this.project, this.uploadedFile, this.path, newvers);




  }

  ngOnInit() {
    this.ps.getDetail().then(project => this.sub(project));


  }

}
