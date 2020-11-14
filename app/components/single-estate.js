import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SingleEstateComponent extends Component {
  @service intl;
  
  get propertyType(){
    let transformed;
    switch (this.args.item.CategoryId) {
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
