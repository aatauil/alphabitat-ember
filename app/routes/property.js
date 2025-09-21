import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class PropertyRoute extends Route {
  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  async model(param) {

      let id = param.id
      const body = {
        Filter: {
          EstateIds: [parseInt(id)],
          DisplayStatusIds: [2], // Online status
        },
        Field: {
          excluded: [
            "comments"
          ]
        },
        Page: {
          Limit: 1,
          Offset: 0
        }
      };
      
      const response = await axios.post(`/.netlify/functions/estate-request`, body)
      const data = await response.data.estates
      const detailsArray = data[0].details

    // TITLE
    let title = detailsArray.filter(details => {
      let titleIDList = [1914]

      if(titleIDList.indexOf(details.id) !== -1){
        return true
      }
    })

    // GENERAL LIST
      let general = detailsArray.filter(details => {
        let generalIDList = [15, 20, 2, 55, 301, 372, 585]

          if (generalIDList.indexOf(details.id) !== -1){
            return true
          }
        }
      )

      // INTERIOR LIST
      let interior = detailsArray.filter(details => {
        let interiorIDList = [1596]

          if (interiorIDList.indexOf(details.id) !== -1){
            return true
          }
        }
      )

      // SURFACE LIST
      let surface = detailsArray.filter(details => {
        let surfaceIDList = []

        if (surfaceIDList.indexOf(details.id) !== -1){
          return true
        }
      })

      // ENERGY LIST
      let energy = detailsArray.filter(details => {
        let energyIDList = [2090, 2089, 2056]

        if (energyIDList.indexOf(details.id) !== -1){
          return true
        }
      }
      )

      //ENVIRONMENT LIST
      let environment= detailsArray.filter(details => {
        let envIDList = [795]

        if (envIDList.indexOf(details.id) !== -1){
          return true
        }
      })

      const address = new Object()
      address.street = data[0].address
      address.city = data[0].city
      address.zip = data[0].zip
      address.number = data[0].number

      // COORDINATES OBJECTS
      let longitude = detailsArray.find(details => details.id === 1849)?.value;
      let latitude = detailsArray.find(details => details.id === 1850)?.value;


      let gps = new Object()
      gps.Longitude = longitude
      gps.Latitude = latitude
      gps.List = new Array(longitude, latitude)

      console.log(title)
      return {data , general, title, interior, energy, surface, environment, gps, address}
  }
}
