import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'


export default class SearchRoute extends Route {


  // SEARCH QUERY PARAMS
    queryParams = {
      buyRent: {
        refreshModel: true
      },
      categories: {
        refreshModel: true
      },
      minPrice: {
        refreshModel : true
      },
      maxPrice: {
        refreshModel : true
      },
      regions: {
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
      },
      page: {
        refreshModel: true
      }
    }

    convertRegion(items) {
    let itemList;
      if(!items){
      return []
      }
      itemList = items.split(","); 
      let newList = []

      itemList.forEach(element => {
        switch (element) {
          case '1': 
            newList.push(20341)
            break;
  
          case '2':
            newList.push(20705)
            break;
  
          case '3':
            newList.push(20706,20346,20347)
            break;
  
          case '4': 
            newList.push(51498)
            break;
          
          case '5':
            newList.push(20347,20346,20345,20344,20343,20342)
            break;
          }
        }
      );
      return newList
    }


  
    async model(param) { 
        let purposeID = param.buyRent
        let categoryList = param.categories
        let regionList = this.convertRegion(param.regions)
        let minBedrooms = param.minBed
        let minBathrooms = param.minBath
        let minArea = param.minArea
        let order = param.order 
        let minPrice = param.minPrice 
        let maxPrice = param.maxPrice 
        let page = param.page


        let controller = this.controllerFor('search');
        controller.set('currentlyLoading', true);
        const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page": ${ page || 0 },"Language":"en-gb","RowsPerPage":20,"CategoryIDList":[${ categoryList || "" }], "PriceRange": [${ minPrice || 0 }, ${ maxPrice || 1000000000 }] ,"RegionIDList": [${ regionList || "" }],"PurposeStatusIDList": [${ purposeID || 1 }], "MinRooms": ${minBedrooms || null}, "MinBathRooms":${minBathrooms || null}, "AreaRange": [${minArea || 0}, 1000], "OrderByFields":["${order || ""}"] }`)
        const data = await response.data.d.EstateList
        const meta = await response.data.d.QueryInfo
        console.log(response)
        await controller.set('currentlyLoading', false);
        return {data, meta}
      }
}


// "PriceRange":["${param.minPrice}", "${param.maxPrice}"}],