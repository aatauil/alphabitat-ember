import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// MANAGES PURPOSE STATE==========================
class PurposeClass{

    // LOGIC HAPPENS INSIDE .HBS
    @tracked buyRent;

    constructor(context){
      this.buyRent = context.buyRent || 1
    }

}

class PriceClass{
  @tracked minBudget;
  @tracked maxBudget;
  @tracked minOpenState;
  @tracked maxOpenState;
  @tracked rentList = [ "500", "750", "1 000", "1 250", "1 500", "1 750", "2 000", "2 250", "2 500", "2 750", "3 000", "3 250", "3 500", "3 750"]
  @tracked buyList = ["100 000", "150 000", "200 000", "250 000", "300 000", "400 000", "450 000", "500 000", "550 000", "600 000", "650 000", "700 000"]

  constructor(context){
      this.context = context
      this.minBudget = context.query.minPrice || "";
      this.maxBudget = context.query.maxPrice || "";
      this.minOpenState = false;
      this.maxOpenState = false;
  }


  // PRICE LOGIC
  @action updateMinBudget(value){
      this.minBudget = value;
      this.minOpenState = false;
      this.checkPrice( "maxBudget")
      this.refetchEstate()

  }

  @action toggleOpenState(elem){
    this[elem] = !this[elem]
  }

  @action updateMaxBudget(value){
    
      this.maxBudget = value;
      this.maxOpenState = false;
      this.checkPrice("minBudget")
      this.refetchEstate()
  }

  @action resetBudget(){
    this.minBudget = ''
    this.maxBudget = ''
    this.context.refetch("minPrice", "")
    this.context.refetch("maxPrice", "")
  }

  checkPrice(right){
    let parsedMin = this.minBudget ? parseInt(this.minBudget.replace(/ /g, '')) : ""
    let parsedMax = this.maxBudget ? parseInt(this.maxBudget.replace(/ /g, '')) : ""
    if(parsedMax  < parsedMin ){
        this[right] = ''
    }
  }

  refetchEstate(){
    this.context.refetch("minPrice", this.minBudget ? parseInt(this.minBudget.replace(/ /g, '')) : "")
    this.context.refetch("maxPrice", this.maxBudget ? parseInt(this.maxBudget.replace(/ /g, '')) : "")
  }
}

// MANAGES REGION LIST STATE======================
class RegionClass{
  
  @tracked list = []
  
  constructor(context){
      this.context = context   
      this.list = context.query.regions.split(",")
      console.log(this.list)
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

    this.context.refetch('regions', this.list.toString())


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
  @tracked list = []

  constructor(context){
    this.context = context   
    this.list = context.query.categories ? context.query.categories.split(",") : []
}

  @action updateList(event){
      let checkedState = event.target.checked;
      let elem = event.target.value

      if(checkedState){
          this.addItem(elem);
      } else if (!checkedState) {
          this.removeItem(elem);
      }

      this.context.refetch('categories', this.list)
  }

  addItem(val){
      if(this.list.indexOf(val) == -1){
          this.list.push(val);

      }
  }

  removeItem(val){
      let index = this.list.indexOf(val)
      if(this.list.indexOf(val) != -1){
          this.list.splice(index, 1);
      }
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

    @tracked Purpose = new PurposeClass(this.args.query);
    @tracked Price = new PriceClass(this.args)
    @tracked Region = new RegionClass(this.args);
    @tracked Bath = new BathClass(this.args.query.minBath);
    @tracked Bed = new BedClass(this.args.query.minBed);
    @tracked Category = new CategoryClass(this.args);
    @tracked Area = new AreaClass(this.args.query.minArea);

//     @tracked Options = new OptionsClass();
  @action reset(){
    this.Purpose.buyRent = 1
    this.args.refetch('buyRent', 1)
    this.Price.maxBudget = ""
    this.args.refetch('maxPrice', "")
    this.Price.minBudget = ""
    this.args.refetch('minPrice', "")
    this.Area.minArea = 0
    this.args.refetch('minArea', 0)
    this.Bath.bathrooms = 0
    this.args.refetch('minBath', 0)
    this.Bed.bedrooms = 0
    this.args.refetch('minBed', 0)
    this.Region.list = []
    this.args.refetch('regions', "")
    this.Category.list = []
    this.args.refetch('categories', null)
  }

//     // UTILITY CLASSES

    @tracked MobileFilter = new MobileFilterClass();


//     // TRIGGERS MODEL REFETCH SEE ROUTE/SEARCH
//     @action invokeRefetch(elem, e){
//         this.args.refetch(elem, e.target.value); 
//     }

//     @action debug(){
//         console.log("changed");
//     }



//     // checkRegion(id){

//         // let exists = this.regionList.indexOf(id)
//         // if (exists == -1){
//         //     console.log("false")
//         //     return false
//         // } else {
//         //     console.log("true")
//         //     return true
//         // }
        
//     // }

        
//     // BATHROOM LOGIC

    
//     // Shared Logic

//     // @action updateState(element){

//     //     console.log(element)

//     //     // Radio
//     //     if(element == "For sale"){
//     //         console.log(1)
//     //         this.radioForSale = true
//     //         this.radioForRent = false
//     //         this.buyRent = 1
//     //         this.minPrice = "0"
//     //         this.maxPrice = "9999999"
//     //     }

//     //     if(element == "For rent"){
//     //         console.log(2)
//     //         this.radioForRent = true
//     //         this.radioForSale = false
//     //         this.buyRent = 2
//     //         this.minPrice = "0"
//     //         this.maxPrice = "9999999"
//     //     }
//     // }

//     // FILTER MOBILE




    
    

}
