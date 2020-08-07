import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


// class BedClass{
//     @tracked minBed;
//     @tracked maxBed;

//     constructor(){
//         this.minBed
//         this.maxBed
//     }
// }

// MANAGES CATEGORY LIST STATE===========================
    class CategoryClass{
        @tracked categoryList

        constructor(){
            this.categoryList = new Array
        }

        @action updateList(val, e){
            let checkedState = e.target.checked

            if(checkedState){
                this.addItem(val)
            } else if (!checkedState) {
                this.removeItem(val)
            }
        }

        addItem(val){
            if(this.categoryList.indexOf(val) == -1){
                this.categoryList.push(val)
                console.log("item added to list")
            }
        }

        removeItem(val){
            let index = this.categoryList.indexOf(val)
            if(this.categoryList.indexOf(val) != -1){
                this.categoryList.splice(index, 1)
                console.log("item removed to list")
            }
        }
    }

    // MANAGES REGION LIST STATE===========================
    class RegionClass{
        @tracked regionList
        
        constructor(){
            this.regionList = new Array
        }

        @action updateList(val, e){
            let checkedState = e.target.checked

            if(checkedState){
                this.addItem(val)
            } else if (!checkedState) {
                this.removeItem(val)
            }
        }

        addItem(val){
            if(this.regionList.indexOf(val) == -1){
                this.regionList.push(val)
                console.log("item added to list")
            }
        }

        removeItem(val){
            let index = this.regionList.indexOf(val)
            if(this.regionList.indexOf(val) != -1){
                this.regionList.splice(index, 1)
                console.log("item removed to list")
            }
        }
    }

export default class SearchFilterComponent extends Component {
    
    @tracked Category = new CategoryClass()
    @tracked Region = new RegionClass()

    @tracked garage = false;
    @tracked garden = false;
    @tracked furnished = false;

    @tracked cbBxl = this.checkRegion("1") || false
    @tracked cbFlem = this.checkRegion("2") || false
    @tracked cbWall = this.checkRegion("3") || false
    @tracked cbFlan = this.checkRegion("4") || false
    @tracked cbOther = this.checkRegion("5") || false
    @tracked filterState = true

    
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
    
    @action invokeRefetch(elem, e){
        this.args.refetch(elem, e.target.value)
    }


    checkRegion(id){

        // let exists = this.regionList.indexOf(id)
        // if (exists == -1){
        //     console.log("false")
        //     return false
        // } else {
        //     console.log("true")
        //     return true
        // }
        
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

    // FILTER MOBILE



    @action toggleFilter(){
        this.filterState = !this.filterState
    }
    
    

}
