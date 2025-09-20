import { helper } from '@ember/component/helper';

export default helper(function parsePrice([price]) {
  if (typeof price !== 'number') {
    return '';
  }
  // Format without decimals and use spaces as thousand separator
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
});
