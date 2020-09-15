import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';



export default class SearchController extends Controller {
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions", "minBath", "minBed", "categories", "minArea"];

    //TRACKED
    @tracked buyRent = 1
    @tracked minPrice = ""
    @tracked maxPrice = ""
    @tracked regions = ""
    @tracked minBath = 0
    @tracked minBed = 0
    @tracked categories
    @tracked minArea = 0


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
        obj.regions =  this.regions
        obj.minBath = this.minBath
        obj.minBed = this.minBed
        obj.categories = this.categories
        obj.minArea = this.minArea


        return obj
    }
}
