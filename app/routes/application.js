import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;
  
  beforeModel(){
    const englishArray = ["en", "EN",  "en-AU", "en-au", "en-CA", "en-ca", "en-GB" , "en-gb" , "en-US", "en-us"];
    const frenchArray = ["fr", "FR", "fr-BE", "fr-be", "fr-CA", "fr-ca", "fr-FR", "fr-fr", "fr-LU",	"fr-lu", "fr-MC", "fr-mc", "fr-CH", "fr-ch"];
    const dutchArray = ["nl", "NL", "nl-be", "nl-BE"];
    let checkLanguage = navigator.language
    
    if (localStorage.getItem("userLanguage") === null) {
      if (englishArray.indexOf(checkLanguage) != -1){
        localStorage.setItem("userLanguage", `en-GB`);
        this.intl.set("locale", "en-GB")

      } else if (frenchArray.indexOf(checkLanguage) != -1){
        localStorage.setItem("userLanguage", `fr-BE`);
        this.intl.set("locale", "fr-BE")

      } else if (dutchArray.indexOf(checkLanguage) != -1){
        localStorage.setItem("userLanguage", `nl-BE`);
        this.intl.set("locale", "nl-BE")

      } else {
        // if language does not exist in arrays set DEFAULT en-GB
        localStorage.setItem("userLanguage", `en-GB`);

      }
    } else {
      this.intl.set("locale", localStorage.getItem("userLanguage"))
    }
  }
}
