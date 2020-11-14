import { helper } from '@ember/component/helper';

export default helper(function toNum([param]) {
  if (param){
    let processed = param.replace(/ /g, '')
    return parseInt(processed);
  } else {
    return parseInt(param)
  }
  
});
