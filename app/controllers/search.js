import Controller from '@ember/controller';

export default class SearchController extends Controller {
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions"]

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

        return obj
    }
}
