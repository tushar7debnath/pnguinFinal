import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
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
  constructor(private ps: ProjectService, private ss: StorageService) {


  }
  download() {

    this.ss.downloadFile(this.path);
  }

  sub(project: any) {
    this.project = project;
    this.project.subscribe(prjkt => this.path = prjkt.path);
  }

  update( name: string, desc: string) {

    this.project.update({name: name, description: desc} );
  }
  ngOnInit() {
    this.ps.getDetail().then(project => this.sub(project));


  }

}
