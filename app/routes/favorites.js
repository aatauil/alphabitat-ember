import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'
import { inject as service } from '@ember/service';

export default class FavoritesRoute extends Route {
  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  async model() {
      let favoritesList = window.localStorage.getItem("favorites")
      console.log(window.localStorage.getItem('favorites') != "[]")

      if(window.localStorage.getItem('favorites') && window.localStorage.getItem('favorites') != "[]"){
          const response = await axios.get(`/.netlify/functions/estate-request?params={"ClientId":"API_TOKEN","Language":"${this.currentLang}","Page":0,"RemoveRowLimit":true, "EstateIDList": ${favoritesList}}`)
          const data = await response.data.d.EstateList
          // console.log(data)
          return data
      } else {
          return false
      }
  }

}
