import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import getOwner from "ember-owner/get";

export default class HeaderComponent extends Component {
  @service intl;
  @service router;

  @action setLang(lang){

    this.intl.set('locale', lang)
    localStorage.setItem("userLanguage", lang);
    const currentRouteInstance = getOwner(this).lookup(`route:${this.router.currentRouteName}`);
    currentRouteInstance.refresh();

  }
  
  get currentLang() {
    return this.intl.get('primaryLocale')
  }
}
