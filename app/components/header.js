import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HeaderComponent extends Component {
  @service intl;

  @action setLang(lang){

    this.intl.set('locale', lang)

  }
}
