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
                case 4:
                transformed = 'Office'
                break;
                case 5:
                    transformed = 'Store'
                    break;
                case 6:
                    transformed = 'Industrial'
                    break;
                case 7:
                    transformed = 'Garage/parking'
                    break;
                default:
                    break;
            }

            return transformed
});
