import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function typeChecker(property) {
  if(property[0].Type == "yes/no"){
    if(property[0].Value == "1") {
      return htmlSafe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="rgba(65,195,87,1)" /></svg>')
    } else {
      return htmlSafe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(218,55,55,1)" /></svg>')
    }
  } else if(property[0].Type == "length") {
    return property[0].Value + "m"
  } else if(property[0].Type == "surface") {
    return property[0].Value + "m²"
  } else  {
    return property[0].Value
  }
});

// if(property[0].Value == "1") {
//   return htmlSafe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="rgba(65,195,87,1)" /></svg>')
// } else {
//   return htmlSafe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(218,55,55,1)" /></svg>')
// }
