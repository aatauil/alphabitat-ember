import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SearchFilterComponent extends Component {
    @tracked bedrooms = 1
    @tracked bathrooms = 1

    @tracked minBed = false;
    @tracked maxBed = false;

    @tracked minBath = false;
    @tracked maxBath = false;

    @action addBed(){

        this.minBed = false

        if (this.bedrooms < 8){
        this.bedrooms++
        }

        if (this.bedrooms == 8){
            this.maxBed = true;
        }
        


    }

    @action subBed(){

        this.maxBed = false

        if (this.bedrooms > 0){
        this.bedrooms--

        }
        
        if (this.bedrooms == 0){
            this.minBed = true;
        }
    }

    @action addBath(){

        this.minBath = false

        if (this.bathrooms < 8){
        this.bathrooms++
        }

        if (this.bathrooms == 8){
            this.maxBath = true;
        }
        


    }

    @action subBath(){

        this.maxBath = false

        if (this.bathrooms > 0){
        this.bathrooms--

        }
        
        if (this.bathrooms == 0){
            this.minBath = true;
        }
    }


    @action returnFalse(){
        return true
    }
}
