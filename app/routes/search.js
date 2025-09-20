import Route from '@ember/routing/route';
import axios from 'axios';
import { inject as service } from '@ember/service';

export default class SearchRoute extends Route {

  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale');
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
      refreshModel: true
    },
    maxPrice: {
      refreshModel: true
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
  };

  convertRegion(items) {
    let itemList;
    if (!items) {
      return [];
    }
    itemList = items.split(",");
    let newList = [];

    itemList.forEach(element => {
      switch (element) {
        case '1':
          newList.push(20341);
          break;
        case '2':
          newList.push(20705);
          break;
        case '3':
          newList.push(20706, 20346, 20347);
          break;
        case '4':
          newList.push(51498);
          break;
        case '5':
          newList.push(20347, 20346, 20345, 20344, 20343, 20342);
          break;
      }
    });
    return newList;
  }

  async model(param) {
    // Ensure filter is always defined
    let filter = {};
    let page;

    // Convert parameters to proper filter object
    if (param.categories) {
      const categoryIds = param.categories.split(',').map(id => parseInt(id.trim()));
      filter.CategoryIds = categoryIds;
    }
    if (param.buyRent) {
      filter.PurposeStatusIds = [param.buyRent];
    }
    if (param.regions && typeof param.regions === 'string') {
      filter.RegionIds = this.convertRegion(param.regions);
    }
    if (param.minPrice || param.maxPrice) {
      filter.PriceRange = {
        Min: param.minPrice ? parseInt(param.minPrice) : 0,
        Max: param.maxPrice ? parseInt(param.maxPrice) : 9999999
      };
    }
    if (param.minBed) {
      filter.MinRooms = parseInt(param.minBed);
    }
    if (param.minBath) {
      filter.MinBathRooms = parseInt(param.minBath);
    }
    if (param.minArea) {
      filter.AreaRange = {
        Min: parseInt(param.minArea),
        Max: 1000
      };
    }

    // Set default display status to show online estates
    if (!filter.DisplayStatusIds) {
      filter.DisplayStatusIds = [2]; // Online status
    }

    if (param.page != 0) {
      page = param.page - 1;
    } else {
      page = param.page;
    }

    // Create proper API request body
    // Map allowed sort options to API fields and directions
    let sortField = "PutOnlineDateTime";
    let ascending = false;

    if (param.order) {
      // Only allow specific fields and directions
      // Example: "Price_ASC" or "Price_DESC"
      const allowedSorts = {
        "PRICE_ASC": { Field: "Price", Ascending: true },
        "PRICE_DESC": { Field: "Price", Ascending: false },
        "PUTONLINEDATETIME_ASC": { Field: "PutOnlineDateTime", Ascending: true },
        "PUTONLINEDATETIME_DESC": { Field: "PutOnlineDateTime", Ascending: false }
      };
      const sortKey = param.order.replace(" ", "_").toUpperCase();
      if (allowedSorts[sortKey]) {
        sortField = allowedSorts[sortKey].Field;
        ascending = allowedSorts[sortKey].Ascending;
      }
    }

    const body = {
      Filter: filter,
      Field: {
        excluded: [
          "longDescription"
        ]
      },
      Page: {
        Limit: 6,
        Offset: page * 6
      },
      Sort: [{
        Field: sortField,
        Ascending: ascending
      }]
    };

    let controller = this.controllerFor('search');
    controller.set('currentlyLoading', true);
    const response = await axios.post(`/.netlify/functions/estate-request`, body);
    const data = await response.data.estates;
    const meta = await response.data;
    await controller.set('currentlyLoading', false);
    return { data, meta };
  }
}
