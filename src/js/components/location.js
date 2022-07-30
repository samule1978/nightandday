"use strict";

import { is } from "../util/other.js";
import {
	qs,
	qsa,
	createElement,
	getCssPropertyValue,
	setCssPropertyValue,
} from "../util/dom.js";

export class Location {
    constructor() {
    }

    user = {
        //latitude: 53.447557659428696, longitude: -2.3362268435891997, // M41 9RH
        latitude: 53.80220864935608, longitude: -1.54692648549744, // Leeds City Museum
        //latitude: 51.55662172914348, longitude: -0.09133232644769686, // Uddins
        //latitude: 55.834739391284764, longitude: -4.2110778654626175, // Glasgow Tesco Extra
    };
    
    practices = [
        ["Manchester", 53.43398514435455, -2.229062513585324],
        ["Leeds", 53.76605323468461, -1.5574778124538127]
    ];

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            (Math.cos(this.deg2rad(lat1)) ** 2) *
            (Math.sin(dLon / 2) ** 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    closestCity = this.practices.sort((c1, c2) => {
        const [, lat1, lon1] = c1;
        const [, lat2, lon2] = c2;
        
        return this.getDistanceFromLatLonInKm(this.user.latitude, this.user.longitude, lat1, lon1) - this.getDistanceFromLatLonInKm(this.user.latitude, this.user.longitude, lat2, lon2);
        
        // Default        
        //return this.getDistanceFromLatLonInKm(0, 0, lat1, lon1) - this.getDistanceFromLatLonInKm(0, 0, lat2, lon2);
    });


    init() {
        /*
        https://thewebdev.info/2022/01/09/how-to-find-the-location-closest-location-in-lat-long-that-is-closes-to-the-given-lat-long-position-with-javascript/
        
        https://stackoverflow.com/questions/51819224/how-to-find-nearest-location-using-latitude-and-longitude-from-a-json-data
        */

        qs("[sg78-practice-source]").textContent = "Static";
        qs("[sg78-practice-location]").textContent = this.closestCity[0];

        qs("[sg78-practice-location]").addEventListener('pointerup', (e) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    alert(position.coords.latitude);
                    alert(position.coords.longitude);
            
                    this.user.latitude = position.coords.latitude;
                    this.user.longitude = position.coords.longitude;
            
                    qs("[sg78-practice-source]").textContent = "Dynamic";
                    qs("[sg78-practice-location]").textContent = this.closestCity[0];
                });    
            }        
                
        });

    }
}