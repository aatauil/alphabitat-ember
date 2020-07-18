import { helper } from '@ember/component/helper';

export default helper(function categoryConverter([id]) {
  var transformed = null
            switch (id) {
                case 1:
                    transformed = 'House';
                    break;
                case 2:
                   transformed = 'Appartment'
                    break;
                case 3:
                    transformed = 'Villa'
                    break;
                default:
                    break;
            }

            return transformed
});
