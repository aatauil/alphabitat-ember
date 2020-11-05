import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'

export default class HomeRoute extends Route {
    async model() {
      const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"RowsPerPage":6,"Language":"en-gb","displayStatusIdList":3}`)
      const data = await response.data.d.EstateList
      return data
    }
}
