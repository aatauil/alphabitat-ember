import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeroComponent extends Component {
    @tracked purpose = false;
    @tracked price = false;
    @tracked region = false;

    @action togglePurpose(){
        this.purpose = !this.purpose;
        this.price = false;
        this.region = false ;
    }

    @action togglePrice(){
        this.price = !this.price;
        this.purpose = false;
        this.region = false ;
    }

    @action toggleRegion(){
        this.region = !this.region;
        this.price = false;
        this.purpose = false ;
    }

    @action toggleAll(){
        this.price = false;
        this.purpose = false ;
        this.region = false ;
    }

}