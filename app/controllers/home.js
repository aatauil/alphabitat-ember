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

  get estates() {
    const body = {
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
        Limit: "6"
      },
      Sort: [{
        Field: "putOnlineDateTime",
        Ascending: false
      }]
    };

    return axios.post(
      '/.netlify/functions/estate-request',
      body,
    ).then(responds => responds.data.estates);
  }

  @action
    handleError(){
      this.isError = true;
    }
}

