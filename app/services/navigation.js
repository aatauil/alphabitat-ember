import Service from '@ember/service';

export default class NavigationService extends Service {

    openState = false

    toggleState(){
        this.openState = !this.openState
    }
}
