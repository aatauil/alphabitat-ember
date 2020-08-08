import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// console.log("params= " +  param.regions)
// let regionList

// (function() {
//   console.log('IIFE')
//   regionList = [];

//   let regionArray = regionBeforeParse.split(","); 
//   console.log("REGIONARRAY= "+ regionArray)

//   regionArray.forEach(element => {
//     switch (element) {
//       case '1': 
//         regionList.push(20341)
//         break;

//       case '2':
//         regionList.push(20705)
//         break;

//       case '3':
//         regionList.push(20706,20346,20347)
//         break;

//       case '4': 
//         regionList.push(51498)
//         break;
      
//       case '5':
//         regionList.push(20347,20346,20345,20344,20343,20342)
//         break;
//       }
//     }
//   );
// })();

// console.log(regionList)
// // RegionLogic


export default class SearchController extends Controller {
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions", "minBed", "category", "minBath", "area"]

    //TRACKED
    @tracked buyRent
    @tracked minPrice
    @tracked maxPrice
    @tracked regions
    @tracked minBed
    @tracked minBath
    @tracked category
    @tracked area

    // ACTIONS
    @action updateParam(elem, id){
        this[elem]= id
        console.log(elem, id)
    }
    
    //GETTER
    get myQuery(){

        let obj = new Object();

        obj.buyRent = this.buyRent
        obj.minPrice = this.minPrice
        obj.maxPrice = this.maxPrice
        obj.minBed = this.minBed
        obj.regions = this.regions
        obj.category = this.category
        obj.minBath = this.minBath

        return obj
    }
}
