import Route from '@ember/routing/route';
import axios from 'axios';
import { inject as service } from '@ember/service';


export default class SearchRoute extends Route {

  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

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
    let paramsList = [];
    let page;

    if(param.categories) paramsList.push(`"CategoryIDList":[${ param.categories }]`);
    if(param.buyRent) paramsList.push(`"PurposeStatusIDList": [${ param.buyRent }]`);
    if(param.regions) paramsList.push(`"RegionIDList": [${ this.convertRegion(param.regions) }]`);
    if(param.minPrice || param.maxPrice) paramsList.push(`"PriceRange": [${ param.minPrice || 0 }, ${ param.maxPrice || 1000000000 }]`);
    if(param.minBed) paramsList.push(`"MinRooms": ${param.minBed}`);
    if(param.minBath) paramsList.push(`"MinBathRooms":${param.minBath}`);
    if(param.minArea) paramsList.push(`"AreaRange": [${param.minArea}, 1000]`);
    if(param.order) paramsList.push(`"OrderByFields":["${param.order}"]`);


    if( param.page != 0){
      page = param.page - 1
    } else {
      page = param.page
    }

    let controller = this.controllerFor('search');
    controller.set('currentlyLoading', true);
    const response = await axios.get(`/.netlify/functions/estate-request?params={"ClientId":"API_TOKEN","Page": ${ page || 0 },"Language":"${this.currentLang}","RowsPerPage":10, ${paramsList.join()} }`)
    const data = await response.data.d.EstateList
    const meta = await response.data.d.QueryInfo
    await controller.set('currentlyLoading', false);
    return {data, meta}
  }
}

