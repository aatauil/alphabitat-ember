import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


// MANAGES THE OPEN/CLOSED STATE OF EACH DROPDOWN ELEMENT=============
class DropDownClass {
    @tracked purpose;
    @tracked price;
    @tracked region;

    constructor(){
        this.purpose = false;
        this.price = false;
        this.region = false;
    }
    
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
      if(this.price || this.purpose || this.region){
        this.price = false;
        this.purpose = false;
        this.region = false ;
      }

    }
}

// MANAGES PURPOSE DROPDOWN STATE=====================================
class PurposeClass {

    @tracked buyRent;

    constructor(){
        this.buyRent = 1;
    }
}

// MANAGES PRICE DROPDOWN STATE========================================
class PriceClass {

    @tracked minBudget;
    @tracked maxBudget;
    @tracked minOpenState;
    @tracked maxOpenState;
    @tracked rentList = [ "500", "750", "1 000", "1 250", "1 500", "1 750", "2 000", "2 250", "2 500", "2 750", "3 000", "3 250", "3 500", "3 750"]
    @tracked buyList = ["100 000", "150 000", "200 000", "250 000", "300 000", "400 000", "450 000", "500 000", "550 000", "600 000", "650 000", "700 000"]

    constructor(){
        this.minBudget = "";
        this.maxBudget = "";
        this.minOpenState = false;
        this.maxOpenState = false;
    }

    // PRICE LOGIC
    @action updateMinBudget(value){
        this.minBudget = value;
        this.minOpenState = false;
        this.checkPrice( "maxBudget")

    }

    @action toggleOpenState(elem){
      this[elem] = !this[elem]
    }

    @action updateMaxBudget(value){
      
        this.maxBudget = value;
        this.maxOpenState = false;

        this.checkPrice("minBudget")
    }

    @action resetBudget(){
      this.minBudget = ''
      this.maxBudget = ''
    }

    

    checkPrice(right){
        let parsedMin = this.minBudget ? parseInt(this.minBudget.replace(/ /g, '')) : 0
        let parsedMax = this.maxBudget ? parseInt(this.maxBudget.replace(/ /g, '')) : 100000000
        if(parsedMax  < parsedMin ){
            this[right] = ''
        }
    }
    
}

// MANAGES REGION DROPDOWN STATE=======================================
class RegionClass {

    @tracked list;
    
    constructor(){
        this.list = [];
    }

    @action regionLogic(event){
      let state = event.target.checked
      let elem = event.target.value
      
      if(state == true){
        this.list.push(elem)
      } else{
        const index = this.list.indexOf(elem);
        if(index != -1){
            this.list.splice(index, 1);
        }
      }
    }

}

// =====================================================================


export default class HomeQuickSearchComponent extends Component {

    // Dropdown Open/Closed State Handler
    @tracked Dropdown = new DropDownClass();

    // Individual dropdown element handlers
    @tracked Purpose = new PurposeClass();
    @tracked Price = new PriceClass();
    @tracked Region = new RegionClass();

}