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

        } else {
            // Item does exist in array, item will be removed
            this.active = false
            this.favoritesList.splice(itemIndex, 1)
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
  @service intl;

  @tracked Favorite = new FavoritesClass(
      this.args.estate.id, 
      JSON.parse(window.localStorage.getItem('favorites'))
    )

  get propertyType(){
    let transformed;
    switch (this.args.estate.CategoryId) {
      case 1:
          transformed = this.intl.t('types.houses');
          break;
      case 2:
          transformed = this.intl.t('types.flats')
          break;
      case 3:
          transformed = "Villa"
          break;
      case 4:
          transformed = this.intl.t('types.offices')
          break;
      case 5:
          transformed = this.intl.t('types.stores')
          break;
      case 6:
          transformed = this.intl.t('types.industrial')
          break;
      case 7:
          transformed = this.intl.t('types.garages')
          break;
      default:
          break;
  }

  return transformed
  }

}
