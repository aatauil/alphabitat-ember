import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// MANAGES PURPOSE STATE==========================
class PurposeClass{

    // LOGIC HAPPENS INSIDE .HBS

    constructor(){

    }
}

// MANAGES OPTIONS STATE==========================
class OptionsClass{
    
    @tracked garage = false;
    @tracked garden = false;
    @tracked furnished = false;
    constructor(){
        this.garage;
        this.garden;
        this.furnished;
    }
}

// MANAGES AREA STATE=============================
class AreaClass{
    @tracked minArea

    constructor(val){
        this.minArea = val || 0;
    }
}

// MANAGES BATH STATE=============================
class BathClass{
    @tracked bathrooms;
    @tracked minBath;
    @tracked maxBath;

    constructor(val){
        this.bathrooms = val || 0;
        this.minBath = false;
        this.maxBath = false;
    }

    @action increment(){
        this.minBath = false;
        if (this.bathrooms < 8){
        this.bathrooms++;
        }

        if (this.bathrooms == 8){
            this.maxBath = true;
        }
    }

    @action decrement(){
        this.maxBath = false
        if (this.bathrooms > 0){
        this.bathrooms--;
        }

        if (this.bathrooms == 0){
            this.minBath = true;
        }
    }
}

// MANAGES BED STATE==============================
class BedClass{
    @tracked bedrooms;
    @tracked minBed;
    @tracked maxBed;

    constructor(val){
        this.bedrooms = val || 0;
        this.minBed = false;
        this.maxBed = false;
    }

    @action increment(){
        this.minBed = false;
        if (this.bedrooms < 8){
        this.bedrooms++;
        }

        if (this.bedrooms == 8){
            this.maxBed = true;
        }
    }

    @action decrement(){
        this.maxBed = false;
        if (this.bedrooms > 0){
        this.bedrooms--;
        }

        if (this.bedrooms == 0){
            this.minBed = true;
        }
    }
}

// MANAGES CATEGORY LIST STATE====================
class CategoryClass{
    @tracked categoryList;

    constructor(val){
        this.categoryList = new Array;
    }

    @action updateList(val, e){
        let checkedState = e.target.checked;

        if(checkedState){
            this.addItem(val);
        } else if (!checkedState) {
            this.removeItem(val);
        }
    }

    addItem(val){
        if(this.categoryList.indexOf(val) == -1){
            this.categoryList.push(val);
            console.log("item added to list");
        }
    }

    removeItem(val){
        let index = this.categoryList.indexOf(val)
        if(this.categoryList.indexOf(val) != -1){
            this.categoryList.splice(index, 1);
            console.log("item removed to list");
        }
    }
}

// MANAGES REGION LIST STATE======================
class RegionClass{
    @tracked regionList
    @tracked cbBxl = this.checkRegion("1") || false;
    @tracked cbFlem = this.checkRegion("2") || false;
    @tracked cbWall = this.checkRegion("3") || false;
    @tracked cbFlan = this.checkRegion("4") || false;
    @tracked cbOther = this.checkRegion("5") || false;
    
    constructor(){
        this.regionList = new Array;
    }

    @action updateList(val, e){
        let checkedState = e.target.checked;

        if(checkedState){
            this.addItem(val);
        } else if (!checkedState) {
            this.removeItem(val);
        }
    }

    addItem(val){
        if(this.regionList.indexOf(val) == -1){
            this.regionList.push(val);
            console.log("item added to list");
        }
    }

    removeItem(val){
        let index = this.regionList.indexOf(val)
        if(this.regionList.indexOf(val) != -1){
            this.regionList.splice(index, 1);
            console.log("item removed to list");
        }
    }
}

class MobileFilterClass{

    
    @tracked filterState = true;

    constructor(){
        this.filterState;
    }

    @action toggleFilter(){
        this.filterState = !this.filterState
        let body = document.querySelector('body');
        if(!this.filterState){
            console.log("enter");
            body.classList.add("overflow-hidden");
        } else {
            body.classList.remove("overflow-hidden");
        }
    }
}

export default class SearchFilterComponent extends Component {


    // FILTER COMPONENTS

    @tracked execute = false 

    @tracked Purpose = new PurposeClass();

    @tracked Category = new CategoryClass(this.args.query.category);

    @tracked Region = new RegionClass();

    @tracked Bed = new BedClass(this.args.query.minBed);

    @tracked Bath = new BathClass(this.args.query.minBath);

    @tracked Area = new AreaClass(this.args.query.minArea);

    @tracked Options = new OptionsClass();

    @tracked Region = new RegionClass();


    // UTILITY CLASSES

    @tracked MobileFilter = new MobileFilterClass();


    // TRIGGERS MODEL REFETCH SEE ROUTE/SEARCH
    @action invokeRefetch(elem, e){
        this.args.refetch(elem, e.target.value); 
    }

    @action debug(){
        console.log("changed");
    }



    // checkRegion(id){

        // let exists = this.regionList.indexOf(id)
        // if (exists == -1){
        //     console.log("false")
        //     return false
        // } else {
        //     console.log("true")
        //     return true
        // }
        
    // }

        
    // BATHROOM LOGIC

    
    // Shared Logic

    // @action updateState(element){

    //     console.log(element)

    //     // Radio
    //     if(element == "For sale"){
    //         console.log(1)
    //         this.radioForSale = true
    //         this.radioForRent = false
    //         this.buyRent = 1
    //         this.minPrice = "0"
    //         this.maxPrice = "9999999"
    //     }

    //     if(element == "For rent"){
    //         console.log(2)
    //         this.radioForRent = true
    //         this.radioForSale = false
    //         this.buyRent = 2
    //         this.minPrice = "0"
    //         this.maxPrice = "9999999"
    //     }
    // }

    // FILTER MOBILE




    
    

}
