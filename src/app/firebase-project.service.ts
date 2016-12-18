import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class ProjectService {



    private platformPath: FirebaseListObservable<any[]>;
    private lobPath: FirebaseListObservable<any[]>;
    private flowPath: FirebaseListObservable<any[]>;
    private statusPath: FirebaseListObservable<any[]>;
    private uid: string;
    private Project: FirebaseListObservable<any[]>;
    private userProjects: FirebaseListObservable<any[]>;
    private pid: string;
    private userName: string;
    public time;

    constructor(public af: AngularFire) {
        this.af.auth.subscribe(auth => {
            this.uid = auth.uid;
            this.userName = auth.google.displayName;
            this.getuserProjectPath(auth.uid);
        });
        this.Project = this.af.database.list('/Project');
        this.platformPath = this.af.database.list('/platform/');
        this.statusPath = this.af.database.list('/status/');



    }

    // filter Project logic

    filterBy(platform: string) {
        return this.Project = this.af.database.list('/Project', {
            query: {
                orderByChild: 'platform',
                equalTo: platform,
            }
        });
    }

    // create Project logic

    getuserProjectPath(uid: string) {

        this.userProjects = this.af.database.list('/userProject/' + uid);
    }
    getPlatformPath(): FirebaseListObservable<any[]> {
        return this.platformPath;

    }
    getLobPath(platform: string): FirebaseListObservable<any[]> {

        return this.lobPath = this.af.database.list('/platform/' + platform + '/');

    }
    getFlowPath(): FirebaseListObservable<any[]> {
        return this.flowPath = this.af.database.list('/tag');

    }
    getstatusPath(): FirebaseListObservable<any[]> {
        return this.statusPath;

    }
    getTime() {
        return this.time;

    }

    getProjects(): FirebaseListObservable<any[]> {
        return this.Project;

    }


    // Details page logic

    getDetail(): Promise<FirebaseObjectObservable<any>> {

        return Promise.resolve(this.af.database.object('/Project/' + this.pid + '/'));

    }

    setPID(pid: string) {
        this.pid = pid;


    }


    createProject(nam: string, desc: string, platform: string, lob: string, status: string, path: string) {

        this.Project.push({
            name: nam,
            description: desc,
            lob: lob,
            platform: platform,
            createdOn: this.time = Date.now(),
            creator: this.uid,
            creatorName: this.userName,
            status: status,
            currentVersion: '1',
            path: path,

        });


    }

    updateProject(prj: FirebaseObjectObservable<any>, path: string, version: string ) {
        

        prj.update({path: path, currentVersion: version});
    }

}


