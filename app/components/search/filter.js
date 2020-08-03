import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SearchFilterComponent extends Component {
    init(){
        _super()
    }

    @tracked bedrooms = 1
    @tracked bathrooms = 1

    @tracked minBed = false;
    @tracked maxBed = false;

    @tracked minBath = false;
    @tracked maxBath = false;

    @tracked minPrice = this.args.query.minPrice || "0"
    @tracked maxPrice = this.args.query.maxPrice || "9999999"

    @tracked radioForSale = this.args.query.sale || true;
    @tracked radioForRent = this.args.query.rent || false;

    @tracked regionList = this.args.query.regions

    @tracked garage = false;
    @tracked garden = false;
    @tracked furnished = false;

    @tracked cbBxl = this.checkRegion("1") || false
    @tracked cbFlem = this.checkRegion("2") || false
    @tracked cbWall = this.checkRegion("3") || false
    @tracked cbFlan = this.checkRegion("4") || false
    @tracked cbOther = this.checkRegion("5") || false


    

    @action reset(){
        this.get('model').update();
    }
    
    // BEDROOM LOGIC

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
    
    @action debug(){
        console.log(this.cbBxl)
    }


    checkRegion(id){
        let exists = this.regionList.indexOf(id)
        
        if (exists == -1){
            console.log("false")
            return false
        } else {
            console.log("true")
            return true
        }
        
    }

        
    // BATHROOM LOGIC

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

    
    // Shared Logic

    @action updateState(element){
        console.log(element)
        // Radio

        if(element == "For sale"){
            console.log(1)
            this.radioForSale = true
            this.radioForRent = false
            this.buyRent = 1
            this.minPrice = "0"
            this.maxPrice = "9999999"
        }

        if(element == "For rent"){
            console.log(2)
            this.radioForRent = true
            this.radioForSale = false
            this.buyRent = 2
            this.minPrice = "0"
            this.maxPrice = "9999999"
        }
    }
}
