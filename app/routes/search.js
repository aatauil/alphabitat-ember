import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'


export default class SearchRoute extends Route {


  // SEARCH QUERY PARAMS
    queryParams = {
      buyRent: {
        refreshModel: true
      },
      category: {
        refreshModel: true
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


        
        const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"Language":"en-gb","PurposeIDList": [${ purposeID || 1 }],"CategoryIDList":[${ categoryList || "" }], "RegionIDList": [${ regionList || "" }], "MinRooms": ${minBedrooms || null}, "MinBathRooms":${minBathrooms || null}, "AreaRange": [${minArea || 0}, 1000], "OrderByFields":["${order || ""}"] }`)
        const data = await response.data.d.EstateList
        await console.log(data)
        return data
      }
}


// "PriceRange":["${param.minPrice}", "${param.maxPrice}"}],