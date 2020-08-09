import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SearchResultsComponent extends Component {

    @action invokeRefetch(elem, e){
        this.args.refetch(elem, e.target.value)
    }

}
