import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {

  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  async model() {
    const response = await axios.post(`/.netlify/functions/estate-request?params={"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"RowsPerPage":6,"Language":"${this.currentLang}","displayStatusIdList":3}`)
    const data = await response.data.d.EstateList
    return data
  }
}
