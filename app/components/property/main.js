import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


class FavoritesClass{

    @service('favorites') favorites;
    @tracked propertyID
    @tracked favoritesList
    @tracked active

    constructor(id, list){
        this.propertyID = id
        this.favoritesList = list || []
        this.active = this.checkActive()
    }

    @action addRemove(id){

        let itemIndex = this.favoritesList.indexOf(this.propertyID)
        if(itemIndex == -1){
            // Item does not exist in array, item will be added
            this.active = true
            this.favoritesList.push(id)
            console.log("item has been added")

        } else {
            // Item does exist in array, item will be removed
            this.active = false
            this.favoritesList.splice(itemIndex, 1)
            console.log("item has been removed")
        }

        window.localStorage.setItem("favorites" , JSON.stringify(this.favoritesList))

    }

    checkActive(){
        let itemIndex = this.favoritesList.indexOf(this.propertyID)

        if(itemIndex == -1){
            return false
        } else {
            return true
        }
    }


    
}

export default class PropertyMainComponent extends Component {


    @tracked Favorite = new FavoritesClass(this.args.estate.EstateID, JSON.parse(window.localStorage.getItem('favorites')))


    @action
    addRemove(id){
        this.favorites.addRemove(id)
    }

    @action
    showList(){
        console.log(this.args.estate.EstateID)
    }


    // ACTIONS 
  


    // FUNCTIONS

    
}
