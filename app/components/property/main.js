import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PropertyMainComponent extends Component {
    @service('favorites') favorites;

    @action
    addRemove(id){
        this.favorites.addRemove(id)
    }

    @action
    showList(){
        this.favorites.showList()
    }

    favoritesList = JSON.parse(window.localStorage.getItem('favorites')) || []
    
    addRemove(id){

        let itemIndex = this.favoritesList.indexOf(id)

        if(itemIndex == -1){

            // Item does not exist in array, item will be added
            this.favoritesList.push(id)
            console.log("item has been added")

        } else {
            // Item does exist in array, item will be removed

            this.favoritesList.splice(itemIndex, 1)
            console.log("item has been removed")
        }

        window.localStorage.setItem("favorites" , JSON.stringify(this.favoritesList))

    }
    
}
