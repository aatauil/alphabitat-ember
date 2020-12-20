import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking'
import { inject as service } from '@ember/service';

class Navigation {

  @tracked resultCount
  @tracked currentPage;
  @tracked maxPage;
  @tracked pages;
  @tracked list = []

  constructor(context){
    this.context = context
    this.resultCount = this.context.meta.RowCount
    this.currentPage = this.context.query.page || 1
    this.maxPage = Math.ceil(this.context.meta.RowCount / 10)
    this.calculateList()
  }

  @action refetch(val){
    if(val != (this.maxPage + 1) || val != 0){
      this.context.refetch("page", val)
    }
  }

  calculateList(){
    for(let i = 0; i < this.maxPage; i++){
      this.list.push(i + 1)

    }
  }
}

export default class SearchResultsComponent extends Component {
    @service intl;

    @tracked order = decodeURIComponent(this.args.query.order) || "";
    @tracked selectedOrder = this.order

    @tracked orderList = [
      { name: this.intl.t('search.sort.relevance'), value: "" },
      { name: this.intl.t('search.sort.lowest'), value: "Price ASC" },
      { name: this.intl.t('search.sort.highest'), value: "Price DESC" },
      { name: this.intl.t('search.sort.rooms'), value: "Rooms DESC" },
      { name: this.intl.t('search.sort.area'), value: "Area DESC" },
    ]


    @tracked Navigation = new Navigation(this.args)
    // Gets Value from event target & sends refetch request to controller
    @action invokeRefetch(elem, e){

        this.selectedOrder = e.value
        this.args.refetch(elem, e.value);


    }

}
