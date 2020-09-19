import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking'

export default class SearchResultsComponent extends Component {

    @tracked selectedOrder;
    @tracked order = decodeURIComponent(this.args.query.order) || "";
    @tracked orderList = [
      { name: "Relevance", value: "" },
      { name: "Lowest price first", value: "Price ASC" },
      { name: "Highest price first", value: "Price DESC" },
      { name: "Most rooms", value: "Rooms DESC" },
      { name: "Largest Area", value: "Area DESC" },
      "something"
    ]

    // Gets Value from event target & sends refetch request to controller
    @action invokeRefetch(elem, e){
        this.selectedOrder = e.highlighted
        this.args.refetch(elem, e.value);

    }

}
