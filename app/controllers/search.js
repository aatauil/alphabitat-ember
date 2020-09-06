import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';



export default class SearchController extends Controller {
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions"];

    //TRACKED
    @tracked buyRent = 1
    @tracked minPrice = ""
    @tracked maxPrice = ""
    @tracked regions = ""


    // ACTIONS
    @action updateParam(elem, id){
        this[elem]= id;

    }
    
    //GETTER
    get myQuery(){

        let obj = new Object();

        obj.buyRent = this.buyRent;
        obj.minPrice = this.minPrice;
        obj.maxPrice = this.maxPrice;
        obj.regions = this.regions

        return obj
    }
}
