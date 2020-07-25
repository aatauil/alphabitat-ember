import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeroComponent extends Component {
    // Open state of dropdowns
    @tracked purpose = false;
    @tracked price = false;
    @tracked region = false;

    // Button content Purpose
    @tracked purposeState = "For sale"
    @tracked radioForSale = true;
    @tracked radioForRent = false;

    @tracked buyRent = 1;

     // Button content Region
    @tracked cbRegionAll = false
    @tracked cbBrux = false
    @tracked cbFlem = false
    @tracked cbWall = false
    @tracked cbFlan = false
    @tracked cbOther = false

    @tracked regionList = [];

    // Button select price

    @tracked minBudget = 0 
    @tracked maxBudget = 9999999


    // Dropdown open state logic

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

    // Closes all dropdowns

    @action toggleAll(){
        this.price = false;
        this.purpose = false ;
        this.region = false ;
    }

    // PURPOSE LOGIC

    @action setPurpose(element){
        this.updateState(element)
        this.purposeState = element
    }

    regionAllLogic(){

        if (!this.cbBrux || !this.cbFlem || !this.cbWall || !this.cbFlan || !this.cbOther){
        this.cbRegionAll = false
        
    }

    if (this.cbBrux && this.cbFlem && this.cbWall && this.cbFlan && this.cbOther){
        this.cbRegionAll = true
        this.checkAllRegion()
        
        }   
    }
    

    // ---------------------------------------------------------------------------------------------------

    // REGION LOGIC

    @action verifyRegion(element, event){
 
        this.updateState(element, event.target.checked, event.target.value)

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
            this.addRegion(value)
        } else if (state == false){
            this.removeRegion(value)
        }
        
    }

    addRegion(value){
        let split = value.split(",")
        this.regionList.push(split)
        console.log("regionlist added =" + this.regionList)
    }

    removeRegion(value){
        const index = this.regionList.indexOf(value);
        if(index != -1){
            this.regionList.splice(index, 1)
         
        }
        console.log("regionlist spliced =" + this.regionList)
    }

    addAllRegion(){
        this.regionList = ["1", "2", "3", "4", "5"]
    }

    removeAllRegion(){
        this.regionList = []
    }



    // PRICE LOGIC

    @action updateMinBudget(event){
      
        this.minBudget = event.target.value
    }

    @action updateMaxBudget(event){
    
        this.maxBudget = event.target.value
    }


    // Shared Logic

    updateState(element, state, value){

        // Radio

        if(element == "For sale"){
            this.radioForSale = true
            this.radioForRent = false
            this.buyRent = 1
        }

        if(element == "For rent"){
            this.radioForRent = true
            this.radioForSale = false
            this.buyRent = 2
        }

        // Dropdown

        if (element == "cbRegionAll"){
            this.cbRegionAll = state
            if (this.cbRegionAll == true) {
                this.addAllRegion()
                this.checkAllRegion()
            } else {
                this.removeAllRegion()
                this.unCheckAllRegion()
            }
        }

        if (element == "cbBrux"){
            this.cbBrux = state
            this.regionArray(state, value)
            this.regionAllLogic()
        }

        if (element == "cbFlem"){
            this.cbFlem = state
            this.regionArray(state, value)
            this.regionAllLogic()
        }

        if (element == "cbWall"){
            this.cbWall = state
            this.regionArray(state, value)
            this.regionAllLogic()
        }

        if (element == "cbFlan"){
            this.cbFlan = state
            this.regionArray(state, value)
            this.regionAllLogic()
        }

        if (element == "cbOther"){
            this.cbOther = state
            this.regionArray(state, value)
            this.regionAllLogic()
        }
        
    }

}