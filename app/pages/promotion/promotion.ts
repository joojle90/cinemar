import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/promotion/promotion.html',
})
export class PromotionPage {
    promotionlist: string[];
    slideconf: any;

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.slideconf = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };
        this.loadpromotionlist();
    }

    loadpromotionlist() {
        return this.cinemardata.getMovielist().then(data => {
            let thepromotion = data.filter(datapromo =>
                 datapromo.discount > 0 && datapromo.status === "active");

            this.promotionlist = thepromotion.sort((a,b) => {
                return b.discount > a.discount;
            });
        })
    }

    bookticket(getmovieitems) {
        console.log(getmovieitems);
        this.navCtrl.push(BookticketPage, {
            movieid: getmovieitems.movieid,
            movieimage: getmovieitems.image_land,
            movienames: getmovieitems.moviename,
            moviediscount: getmovieitems.discount
        });
    }

    watchtrailer(movieitems, moviedetails) {
        let showa = movieitems.showtime.split(" ");
        let theshow = new Date (showa[2], monthname.indexOf(showa[1].toLowerCase()), showa[0]);

        this.navCtrl.push(MoviedetailsPage, {
            movieid: movieitems.movieid,
            image: movieitems.image_land,
            showtimes: movieitems.showtime,
            movienames: movieitems.moviename,
            likes: movieitems.like,
            moviedetails: moviedetails,
            discount: movieitems.discount,
            comingshow: theshow > new Date() ?  1 : 0
        });
    }

}
