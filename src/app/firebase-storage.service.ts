import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './firebase-project.service';
import { FirebaseObjectObservable } from 'angularfire2';
import * as dropbox from 'dropbox';


@Injectable()
export class StorageService {

  // configure Dropbox Object with access token
  dbx = new dropbox({ accessToken: 'rFe9OLGwWmAAAAAAAAAIOmT-CA3P-VAJsIelVVxPNpPikalReScI81URWr3FXWtU' });

  constructor(public router: Router, private ps: ProjectService) {}

  // Upload File Sequence

  routeTo(response: any, nam: string, desc: string, platform: string, lob: string, status: string ) {

    let path: string = response.path_lower; // set value of Path to be called during createProject()
    this.ps.createProject(nam, desc, platform, lob, status, path ); // Initiate Create Project from Firebase-project Service
    this.router.navigate(['/listing']); // navigate to listing page

  }


  uploadFile(file: File, nam: string, desc: string,  platform: string, lob: string, status: string) {



  // start upload sequence

  this.dbx.filesUpload({ path: '/' + platform + '/' + lob + '/' +  nam + '/' + nam + '_v1' + '.sketch', contents: file })
  // call routeTo for routing to listing and also creating project in firebase
    .then(response => this.routeTo(response, nam , desc, platform, lob , status))
    .catch(function (error) { console.error(error); });
  }



  // move file sequence

  moveFile(oldPath: string, newPath: string) {
   
    this.dbx.filesMove({from_path: oldPath, to_path: newPath, allow_shared_folder: true, autorename: true})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }



// download file sequence

  downloadFile(projectPath: string) {


    this.dbx.filesGetTemporaryLink({path: projectPath})
    .then(link => window.open(link.link));

  }

updateVersion(prj: FirebaseObjectObservable<any> , file: File, filePath: string, version: string ) {

 this.dbx.filesUpload({ path: filePath , contents: file })
 .then(res => {this.ps.updateProject(prj, filePath, version); console.log(res); this.router.navigate(['/listing']); })
  .catch(err => console.log(err));
 ;

  }


}
