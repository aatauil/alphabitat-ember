import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavBarComponent extends Component {

  // TRACKED
  @tracked menuOpenState = false;

  //ACTIONS
  @action toggleMenu(){
      this.menuOpenState = !this.menuOpenState
  }

  @action closeMenu(){
    this.menuOpenState = false
  }
}