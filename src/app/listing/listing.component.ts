import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { ProjectService } from '../firebase-project.service';
import { StorageService } from '../firebase-storage.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {



  Project: FirebaseListObservable<any[]>;
  platformPath: FirebaseListObservable<any>;
  lobPath: FirebaseListObservable<any>;



  constructor(private ps: ProjectService, public router: Router, private ss: StorageService) {

    this.Project = this.ps.getProjects();
    this.platformPath = this.ps.getPlatformPath();





  }

  filterPL(item: any, st1: string, st2?: string) {
    if (st2) {
      return item.filter(it => (it.platform === st1 && it.lob === st2));
    } else {


      if (st1 === 'platform') {
        return this.Project = this.ps.getProjects();
      } else {

        return item.filter(it => (it.platform === st1));
      }

    }

  }

  filterThis(st: string, st2?: string) {
    this.Project = this.Project
      .map(items => this.filterPL(items, st, st2)
      ) as FirebaseListObservable<any[]>;

  }


  viewDetail(pid: string) {

    this.ps.setPID(pid);

    this.router.navigate(['/detail']);


  }
  postPlatformSelection(pf: string) {
    this.Project = this.ps.getProjects();
    this.lobPath = this.ps.getLobPath(pf);
    this.filterThis(pf);
  }
  postLobSelection(pf: string, lp: string) {
    this.Project = this.ps.getProjects();
    this.filterThis(pf, lp);
  }
  searchIT(itm: any, q: string) {

    return itm.filter(it => (it.name.toLowerCase().startsWith(q)));
  }


  search(query: string) {
    this.Project = this.ps.getProjects();
    this.Project = this.Project
      .map(items => this.searchIT(items, query)
      ) as FirebaseListObservable<any[]>;

  }

  reset() {
    this.Project = this.ps.getProjects();
  }

  ngOnInit() {
  }

}
