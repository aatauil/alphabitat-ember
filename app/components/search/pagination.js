import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SearchPaginationComponent extends Component {

  @action previousPage(page){
    let previous = page -1
    this.args.nav.context.refetch("page", previous)
  }

  @action nextPage(page){
    let next = page + 1
    this.args.nav.context.refetch("page", next)
  }
}
