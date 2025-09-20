import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


class FavoritesClass{

    @tracked propertyID
    @tracked isActive;

    constructor(id, list){
        this.propertyID = id
        this.favoritesList = JSON.parse(list) || []
        this.isActive = this.favoritesList.indexOf(this.propertyID) == -1 ? false : true
    }

    @action addRemove(id){

        let itemIndex = this.favoritesList.indexOf(this.propertyID)
        if(itemIndex == -1){
            // Item does not exist in array, item will be added
            this.favoritesList.push(id)
            this.isActive = true

        } else {
            // Item does exist in array, item will be removed
            this.favoritesList.splice(itemIndex, 1)
            this.isActive = false
        }

        window.localStorage.setItem("favorites" , JSON.stringify(this.favoritesList))

    }

}

export default class PropertyMainComponent extends Component {
  @service intl;

  @tracked iconOptions = L.icon({
    iconUrl: '/assets/pixel/pin.png',

    iconSize:     [40, 40], // size of the icon // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -50] // point from which the popup should open relative to the iconAnchor
});

  @tracked Favorite = new FavoritesClass(
      this.args.estate.EstateID,
      window.localStorage.getItem('favorites')
    )


    get propertyType(){
        let transformed;
        switch (this.args.estate.category.id) {
            case 1:
                transformed = this.intl.t('type.house');
                break;
            case 2:
                transformed = this.intl.t('type.flat')
                break;
            case 3:
                transformed = "Villa"
                break;
            case 4:
                transformed = this.intl.t('type.office')
                break;
            case 5:
                transformed = this.intl.t('type.store')
                break;
            case 6:
                transformed = this.intl.t('type.industrial')
                break;
            case 7:
                transformed = this.intl.t('type.garage')
                break;
            default:
                break;
            }
            return transformed
        }

        get purposeType(){
        let transformed;
        switch (this.args.estate.purpose.id) {
            case 1:
                transformed = this.intl.t('nav.sale');
                break;
            case 2:
                transformed = this.intl.t('nav.rent')
                break;
            default:
                break;
            }
            return transformed ? transformed.toLowerCase() : transformed
        }
}
