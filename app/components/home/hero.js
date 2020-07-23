import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeroComponent extends Component {
    // Open state of dropdowns
    @tracked purpose = false;
    @tracked price = false;
    @tracked region = false;

    // Button content Purpose
    @tracked cbPurposeAll = false;
    @tracked cbForSale = false;
    @tracked cbForRent = false;
    @tracked cbSold = false;
    @tracked cbRented = false;

     // Button content Region
    @tracked cbRegionAll = false
    @tracked cbBrux = false
    @tracked cbFlem = false
    @tracked cbWall = false
    @tracked cbFlan = false
    @tracked cbOther = false


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
    // logic to only keep 1 dropdown open at a time and close the other 2

    // Main Logic function

    @action verifyPurpose(element, event){
        
        this.updateState(element, event.target.checked)

        if(element == "cbPurposeAll" && this.cbPurposeAll == true){
            this.checkAllPurpose(event)
        } else {
            this.purposeAllLogic()
        }
    }


    // side functions 

    purposeAllLogic(){

         if (!this.cbForSale|| !this.cbForRent || !this.cbSold || !this.cbRented){
            this.cbPurposeAll = false

        }

        if (this.cbForSale && this.cbForRent && this.cbSold && this.cbRented){
            this.cbPurposeAll = true
            this.checkAllPurpose()

        }
    }

    checkAllPurpose(){
            this.cbForSale = true;
            this.cbForRent = true;
            this.cbSold = true;
            this.cbRented = true
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

    // Shared Logic

    updateState(element, state){

        if (element == "cbPurposeAll"){
            this.cbPurposeAll = state
        }

        if (element == "cbForSale"){
            this.cbForSale = state

        }

        if (element == "cbForRent"){
            this.cbForRent = state

        }

        if (element == "cbRented"){
            this.cbRented = state

        }

        if (element == "cbSold"){
            this.cbSold = state

        }

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