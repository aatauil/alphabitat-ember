import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class SearchController extends Controller {
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions", "minBed", "maxBed", "category", "minBath", "maxBath", "area"]

    //TRACKED
    @tracked buyRent
    @tracked minPrice
    @tracked maxPrice
    @tracked regions
    @tracked minBed
    @tracked maxBed
    @tracked category
    @tracked area

    // ACTIONS
    @action updateParam(elem, id){
        this[elem]= id
    }
    
    //GETTER
    get myQuery(){

        let obj = new Object();

        obj.buyRent = this.buyRent
        obj.minPrice = this.minPrice
        obj.maxPrice = this.maxPrice
        obj.regions = this.regions

        return obj
    }
}
