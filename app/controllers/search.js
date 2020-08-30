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
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions", "minBed", "category", "minBath", "minArea", "order"];

    //TRACKED
    @tracked buyRent = 1
    @tracked minPrice = 0
    @tracked maxPrice = 9999999
    @tracked regions = ""
    @tracked minBed = 0
    @tracked minBath = 0
    @tracked category = ""
    @tracked minArea = 0
    @tracked order = ""

    // ACTIONS
    @action updateParam(elem, id){
        this[elem]= id;
        console.log(elem, id);
    }
    
    //GETTER
    get myQuery(){

        let obj = new Object();

        obj.buyRent = this.buyRent;
        obj.minPrice = this.minPrice;
        obj.maxPrice = this.maxPrice;
        obj.minBed = this.minBed;
        obj.regions = this.regions;
        obj.category = this.category;
        obj.minBath = this.minBath;
        obj.order = this.order

        return obj
    }
}
