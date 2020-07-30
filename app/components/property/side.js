import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PropertySideComponent extends Component {

    @tracked dcptState = false;
    @tracked intState = true;

    @action toggleDcptState(){
        this.dcptState = !this.dcptState
    }


    @action toggleIntState(){
        this.intState = !this.intState
    }
}
