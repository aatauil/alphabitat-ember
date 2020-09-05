import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'
import { action } from '@ember/object';


export default class SearchRoute extends Route {


  // SEARCH QUERY PARAMS
    queryParams = {
      buyRent: {
        refreshModel: true
      },
      category: {
        refreshModel: true
      },
      minPrice: {
        refreshModel : true
      },
      maxPrice: {
        refreshModel : true
      },
      region: {
        refreshModel: true
      },
      minBed: {
        refreshModel: true
      },
      minBath: {
        refreshModel: true
      },
      minArea: {
        refreshModel: true
      },
      order: {
        refreshModel: true
      }
    };


  
    async model(param) { 
        let purposeID = param.buyRent
        let categoryList = param.category 
        let regionList = param.regions
        let minBedrooms = param.minBed
        let minBathrooms = param.minBath
        let minArea = param.minArea
        let order = param.order 
        let minPrice = param.minPrice 
        let maxPrice = param.maxPrice 
        console.log(param)

        let controller = this.controllerFor('search');
        controller.set('currentlyLoading', true);
        const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"Language":"en-gb","RowsPerPage":30,"CategoryIDList":[${ categoryList || "" }], "PriceRange": [${ minPrice || 0 }, ${ maxPrice || 1000000000 }] ,"RegionIDList": [${ regionList || "" }],"PurposeIDList": [${ purposeID || 1 }], "MinRooms": ${minBedrooms || null}, "MinBathRooms":${minBathrooms || null}, "AreaRange": [${minArea || 0}, 1000], "OrderByFields":["${order || ""}"] }`)
        const data = await response.data.d.EstateList
        await controller.set('currentlyLoading', false);
        return data
      }
}


// "PriceRange":["${param.minPrice}", "${param.maxPrice}"}],