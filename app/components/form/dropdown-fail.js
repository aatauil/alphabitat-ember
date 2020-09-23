import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormDropdownComponent extends Component {

    @tracked openStateMin = false
    @tracked openStateMax = false
    @tracked list = ['100', '200', '300', '400', '500', '600']
    @tracked minValue = "Min"
    @tracked maxValue = "Max"

    get maxList(){
        let position = this.list.indexOf(this.minValue)
        let newArray = this.list.slice(position + 1)
        return newArray ? newArray : this.list
    }

    get minList(){
        let position = this.list.indexOf(this.maxValue)

        const newArray = () => { 
            if (position == -1){
 
                return false
                
            } else {
   
                return this.list.slice(-position)
            }
          
        }

        return newArray() ? newArray() : this.list
    }

    @action toggleMin(){
     
        this.openStateMin = !this.openStateMin
        this.openStateMax = false

    }

    @action toggleMax(){
     
        this.openStateMax = !this.openStateMax
        this.openStateMin = false
     
    }

    @action selectMin(item){
        this.openStateMin = false
        this.openStateMax = false
        this.minValue = item
    }

    @action selectMax(item){
        this.openStateMin = false
        this.openStateMax = false
        this.maxValue = item
    }
}
