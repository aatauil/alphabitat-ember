import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class SearchController extends Controller {
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions", "minBed", "maxBed", "property", "minBath", "maxBath", "area"]

    //TRACKED
    @tracked buyRent = 1;
    @tracked minPrice = "0";
    @tracked maxPrice = "9999999";
    @tracked regions = "1,2,3,4,5"
    @tracked minBed =  "0";
    @tracked maxBed = "20"
    @tracked property = '1,2,3,4,5,6,7'
    @tracked area = '0'

    // ACTIONS
    @action updateBuyRent(id){
        this.buyRent = id
    }
    
    //GETTER
    get myQuery(){

        let obj = new Object();
        if (this.buyRent == 1){
            obj.sale = true
            obj.rent = false
        }

        if (this.buyRent == 2){
            obj.rent = true
            obj.sale = false
        }
        
        obj.minPrice = this.minPrice
        obj.maxPrice = this.maxPrice
        obj.regions = this.regions
        obj.minBed = this.minBed
        obj.maxBed = this.maxBed
        obj.property = this.property
        obj.area = this.area

        return obj
    }
}
