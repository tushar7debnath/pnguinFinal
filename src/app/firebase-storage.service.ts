import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from './firebase-project.service';
import * as dropbox from 'dropbox';


@Injectable()
export class StorageService {


  dbx = new dropbox({ accessToken: 'tEPWkvjaNnAAAAAAAAAE0Si3NQX5ovf3Twl28ZEQYLuy10yxr03Kff15UHTFiXEI' });

  constructor(public router: Router, private ps: ProjectService) {

  }

  routeTo(response: any, nam: string, desc: string, platform: string, lob: string, status ) {


    this.router.navigate(['/listing']);
    let path: string = response.path_lower;
    this.ps.createProject(nam, desc, platform, lob, status, path );

  }


  uploadFile(file: File, nam: string, desc: string,  platform: string, lob: string, status: string) {

  this.dbx.filesUpload({ path: '/' + platform + '/' + lob + '/' +  nam + 'v1' + '.sketch', contents: file })
    .then(response => this.routeTo(response, nam , desc, platform, lob , status))
      .catch(function (error) { console.error(error); });
    return false;
  }

  moveFile(oldPath: string, newPath: string) {

    this.dbx.filesMove({from_path: oldPath, to_path: newPath, allow_shared_folder: true, autorename: true})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  downloadFile(projectPath: string) {


    this.dbx.filesGetTemporaryLink({path: projectPath})
    .then(link => window.open(link.link));

  }


}
