import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SearchResultsComponent extends Component {


    // Gets Value from event target & sends refetch request to controller
    @action invokeRefetch(elem, e){
        this.args.refetch(elem, e.target.value);
    }

}
