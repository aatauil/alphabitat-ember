import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  get estates(){
    return fetch(`/.netlify/functions/estate-request?params={"ClientId":"API_TOKEN","Page":0,"RowsPerPage":6,"Language":"${this.currentLang}","displayStatusIdList":3}`)
      .then(responds => responds.json())
      .then(data => data.d.EstateList)
    }
}

