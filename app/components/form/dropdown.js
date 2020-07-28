import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormDropdownComponent extends Component {

    @tracked openStateMin = true
    @tracked openStateMax = false
    @tracked list = ['100', '200', '300', '400', '500', '600']
    @tracked minValue
    @tracked maxValue



    @action toggleMin(){
     
        this.openStateMin = !this.openStateMin
        this.openStateMax = false

    }

    @action toggleMax(){
     
        this.openStateMax = !this.openStateMax
        this.openStateMin = false
     
    }

    @action toggleAll(){
        this.openStateMax = false
        this.openStateMin = false
        console.log("toggle all")
    }

    @action selectMin(item){
        this.openStateMin = false
        this.openStateMax = false
        this.minValue = item
    }

    @action selectMax(item){
        this.openStateMin = false
        this.openStateMax = false
        this.maxValue = item
    }
}
