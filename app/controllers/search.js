import Controller from '@ember/controller';


export default class SearchController extends Controller {
    
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions", "minBed", "maxBed", "property", "minBath", "maxBath", "area"]

    buyRent = 1;

    minPrice = "0";
    maxPrice = "9999999";

    regions = "1,2,3,4,5"

    minBed =  "0";
    maxBed = "20"

    property = '1,2,3,4,5,6,7'

    area = '0'


    


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
