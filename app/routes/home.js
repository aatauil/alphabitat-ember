import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {

  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }
}
