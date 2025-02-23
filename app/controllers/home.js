import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import axios from 'axios';

export default class HomeController extends Controller {
  @service intl;
  @tracked isError = false;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  get estates(){
    return axios.get(`/.netlify/functions/estate-request?params={"ClientId":"API_TOKEN","Page":0,"RowsPerPage":6,"Language":"${this.currentLang}","displayStatusIdList":[3]}`)
      .then(responds => responds.data.d.EstateList)
  }

  @action
    handleError(){
      this.isError = true;
    }
}

