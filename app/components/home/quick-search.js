import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


// MANAGES THE OPEN/CLOSED STATE OF EACH DROPDOWN ELEMENT=========
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
        this.price = false;
        this.purpose = false;
        this.region = false ;
    }
}




// MANAGES PURPOSE DROPDOWN STATE===========================
class PurposeClass {
    @tracked purposeState;
    @tracked radioForSale;
    @tracked radioForRent;
    @tracked buyRent;

    constructor(){
        this.purposeState = "For sale";
        this.radioForSale = true;
        this.radioForRent = false;
        this.buyRent = 1;
    }

    @action setPurpose(element){
        this.updateState(element);
        this.purposeState = element;
    }

    
    updateState(element){
        if(element == "For sale"){
            this.radioForSale = true;
            this.radioForRent = false;
            this.buyRent = 1;
        }

        if(element == "For rent"){
            this.radioForSale = false;
            this.radioForRent = true;
            this.buyRent = 2;
        }
    }
}




// MANAGES PRICE DROPDOWN STATE============================
class PriceClass {

    @tracked minBudget;
    @tracked maxBudget;

    constructor(){
        this.minBudget = 0;
        this.maxBudget = 9999999;
    }

    // PRICE LOGIC
    @action updateMinBudget(event){

        if(event.target.value > this.maxBudget){
            event.preventDefault();
            console.log("1")
            this.maxBudget = 9999999
        }
        console.log("min => " + this.minBudget)
        console.log("max => " + this.maxBudget)

        this.minBudget = event.target.value;

    }

    @action updateMaxBudget(event){
        console.log("min => " + this.minBudget)
        console.log("max => " + this.maxBudget)
        this.maxBudget = event.target.value;

        if(event.target.value < this.minBudget){
            console.log("2")
            this.minBudget = 0
        }
    }
    
}




// MANAGES REGION DROPDOWN STATE===========================
class RegionClass {

    @tracked cbRegionAll;
    @tracked cbBrux;
    @tracked cbFlem;
    @tracked cbWall;
    @tracked cbFlan;
    @tracked cbOther;
    @tracked regionList;
    
    constructor(){
        this.cbRegionAll = false;
        this.cbBrux = false;
        this.cbFlem = false;
        this.cbWall = false;
        this.cbFlan = false;
        this.cbOther = false;
        this.regionList = [];
    }
    
    @action regionAllLogic(){

        if (!this.cbBrux || !this.cbFlem || !this.cbWall || !this.cbFlan || !this.cbOther){
        this.cbRegionAll = false;
        }

        if (this.cbBrux && this.cbFlem && this.cbWall && this.cbFlan && this.cbOther){
            this.cbRegionAll = true;
            this.checkAllRegion();
        }   
    }

    @action verifyRegion(element, event){
        this.updateState(element, event.target.checked, event.target.value);
    }

    checkAllRegion(){
        this.cbBrux = true;
        this.cbFlem = true;
        this.cbWall = true;
        this.cbFlan = true;
        this.cbOther = true;
    }

    unCheckAllRegion(){
        this.cbBrux = false;
        this.cbFlem = false;
        this.cbWall = false;
        this.cbFlan = false;
        this.cbOther = false;
    }

    regionArray(state, value){
        if(state == true ){
            this.addRegion(value);
        } else if (state == false){
            this.removeRegion(value);
        }
    }

    addRegion(value){
        let split = value.split(",");
        this.regionList.push(split);
        console.log("regionlist added =" + this.regionList);
    }

    removeRegion(value){
        const index = this.regionList.indexOf(value);
        if(index != -1){
            this.regionList.splice(index, 1);
        }
        console.log("regionlist spliced =" + this.regionList)
    }

    addAllRegion(){
        this.regionList = ["1", "2", "3", "4", "5"];
    }

    removeAllRegion(){
        this.regionList = [];
    }

    updateState(element, state, value){
        if (element == "cbRegionAll"){
            this.cbRegionAll = state;
            if (this.cbRegionAll == true) {
                this.addAllRegion();
                this.checkAllRegion();
            } else {
                this.removeAllRegion();
                this.unCheckAllRegion();
            }
        }

        if (element == "cbBrux"){
            this.cbBrux = state;
            this.regionArray(state, value);
            this.regionAllLogic();
        }

        if (element == "cbFlem"){
            this.cbFlem = state;
            this.regionArray(state, value);
            this.regionAllLogic();
        }

        if (element == "cbWall"){
            this.cbWall = state;;
            this.regionArray(state, value);;
            this.regionAllLogic();;
        }

        if (element == "cbFlan"){
            this.cbFlan = state;
            this.regionArray(state, value);
            this.regionAllLogic();
        }

        if (element == "cbOther"){
            this.cbOther = state;
            this.regionArray(state, value);
            this.regionAllLogic();
        }
    }
}

// =====================================================================


export default class HomeQuickSearchComponent extends Component {

    // Dropdown Open/Closed State Handler
    @tracked Dropdown = new DropDownClass()

    // Individual dropdown element handlers
    @tracked Purpose = new PurposeClass()
    @tracked Price = new PriceClass()
    @tracked Region = new RegionClass()

}