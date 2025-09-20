import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SingleEstateComponent extends Component {
  @service intl;
  
  get propertyType(){
    let transformed;
    switch (this.args.item.category.id) {
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
    switch (this.args.item.purpose.id) {
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
