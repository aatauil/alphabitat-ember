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

     // Button content Region
    @tracked cbRegionAll = false
    @tracked cbBrux = false
    @tracked cbFlem = false
    @tracked cbWall = false
    @tracked cbFlan = false
    @tracked cbOther = false

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
    

    // ---------------------------------------------------------------------------------------------------

    // REGION LOGIC

    @action verifyRegion(element, event){
        console.log("region logic:")
        
        this.updateState(element, event.target.checked)

        if(element == "cbRegionAll" && this.cbRegionAll == true){
            this.checkAllRegion(event)
        } else {
            this.regionAllLogic()
        }
    }


    regionAllLogic(){

        if (!this.cbBrux || !this.cbFlem || !this.cbWall || !this.cbFlan || !this.cbOther){
        this.cbRegionAll = false
        console.log('1')
    }

    if (this.cbBrux && this.cbFlem && this.cbWall && this.cbFlan && this.cbOther){
        this.cbRegionAll = true
        this.checkAllRegion()
        console.log('2')
        }   
    }

    checkAllRegion(){
        this.cbBrux = true;
        this.cbFlem = true;
        this.cbWall = true;
        this.cbFlan = true;
        this.cbOther = true;
    }


    // PRICE LOGIC

    @action updateMinBudget(event){
        console.log(event.target.value)
        this.minBudget = event.target.value
    }


    // Shared Logic

    updateState(element, state){
        console.log(element)

        // Radio

        if(element == "For sale"){
            this.radioForSale = true
            this.radioForRent = false
        }

        if(element == "For rent"){
            this.radioForRent = true
            this.radioForSale = false
        }

        // Dropdown

        if (element == "cbRegionAll"){
            this.cbRegionAll = state
        }

        if (element == "cbBrux"){
            this.cbBrux = state
        }

        if (element == "cbFlem"){
            this.cbFlem = state
        }

        if (element == "cbWall"){
            this.cbWall = state
        }

        if (element == "cbFlan"){
            this.cbFlan = state
        }

        if (element == "cbOther"){
            this.cbOther = state
        }
    }

}