import Route from '@ember/routing/route';
import axios from 'axios';
import { inject as service } from '@ember/service';

export default class FavoritesRoute extends Route {
  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  async model() {
      let favoritesList = window.localStorage.getItem("favorites")

      if(window.localStorage.getItem('favorites') && window.localStorage.getItem('favorites') != "[]"){
        const body = {
          Filter: {
            EstateIds: favoritesList
          },
          Field: {
            included: [
              "address",
              "bathrooms",
              "pictures",
              "area",
              "city",
              "currency",
              "price",
              "rooms",
              "purposeId",
              "categoryId"
            ]
          },
          Page: {
            Limit: 20,
            Offset: 0
          },
        };
    
        const response = await axios.post(`/.netlify/functions/estate-request`, body);
        const data = await response.data.estates;
        return data
      } else {
        return false
      }
  }

}
