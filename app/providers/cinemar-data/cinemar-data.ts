import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//let serverURL = 'http://cinemar.myxscan.net/api/Movie/';
//let serverURL = '/api/Movie/'; // Json web api
let serverURL = 'data/';

@Injectable()
export class CinemarData {

    data: any;
    apidata: any;
    errormsg: string;

    constructor(
        private http: Http
    ) {
        this.http = http;
    }

    load(apidata) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise((resolve, reject) => {
            this.http.get(serverURL+apidata).map(response => response.json())
            .subscribe(
                result => {
                    resolve(result);
                },
                error => {
                    Promise.reject(new Error("my error msg"))
                    .catch(error => {
                        return this.errormsg = "Error404";
                    });
                }
            );
        });
    }

    getLeftsidemenu() {
        return this.load('leftsidemenu.json').then(data => {
            console.log(data.leftsidemenu.submenu);
            return data.leftsidemenu.submenu;
        });
    }

}
