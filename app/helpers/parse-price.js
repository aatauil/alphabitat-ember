import { helper } from '@ember/component/helper';

export default helper(function parsePrice([price]) {
    return (
        price.replace(
        /(\d{1,3})?(\d{3})(\.\d{2})/,
        " $1 $2"
        )
    )
});
