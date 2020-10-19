import Component from '@glimmer/component';
import {tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
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
}