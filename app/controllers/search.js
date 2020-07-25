import Controller from '@ember/controller';

export default class SearchController extends Controller {
    queryParams= ['buyRent', 'minPrice', "maxPrice", "regions"]
}
