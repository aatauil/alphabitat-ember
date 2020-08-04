import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'

export default class FavoritesRoute extends Route {

    async model() {
        let favoritesList = window.localStorage.getItem("favorites")
        console.log(window.localStorage.getItem('favorites') != "[]")

        if(window.localStorage.getItem('favorites') && window.localStorage.getItem('favorites') != "[]"){
            const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Language":"en-gb","Page":0,"RemoveRowLimit":true, "EstateIDList": ${favoritesList}}`)
            const data = await response.data.d.EstateList
            console.log(data)
            return data
        } else {
            return false
        }

      
        
      }

}
