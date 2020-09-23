import Modifier from 'ember-modifier';
import { action } from '@ember/object';

export default class HideOnScrollModifier extends Modifier {

  height = null

  didInstall() {
    this.height = this.element.offsetHeight
    var prevScroll = 0
    
    if (window.innerWidth < 640){
      window.addEventListener("scroll", () => {
      
        this.scrollManager(prevScroll, this.height)
            prevScroll = window.pageYOffset
           
      })
    }


  }

  @action scrollManager(prevScrollPos, elementHeight){

    if (prevScrollPos  > window.pageYOffset ) {
      this.element.style.transform = `none`
    } else {
      this.element.style.transform =  `translateY(-${elementHeight}px)`
    }

  }
}
