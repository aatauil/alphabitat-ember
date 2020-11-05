import Component from '@glimmer/component';
import {tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NavBarComponent extends Component {
  @service intl;
  @tracked openState = false;

  @action toggleMenu(){
    this.openState = !this.openState 
    let body = document.querySelector('body');
        if(this.openState){
            body.classList.add("overflow-hidden");
        } else {
            body.classList.remove("overflow-hidden");
        }
  }
  
  @action setLang(lang){
    this.intl.set('locale', lang)
  }
  
  get currentLang() {
    return this.intl.get('primaryLocale')
  }
}
