import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment' 
import { inject as service } from '@ember/service';

export default class PropertyRoute extends Route {
  @service intl;

  get currentLang() {
    return this.intl.get('primaryLocale')
  }

  async model(param) {

      let estateID = param.estateID
      const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"Language":"${this.currentLang}", "EstateID":${estateID}, "ShowDetails":true}`)
      const data = await response.data.d.EstateList
      const detailsArray = data[0].Details
      console.log(data)

      // console.log(data)

    // TITLE
    let title = detailsArray.filter(details => {
      let titleIDList = [1244]

      if(titleIDList.indexOf(details.DetailId) !== -1){
        return true
      }
    })

    console.log(title)


    // GENERAL LIST
      let general = detailsArray.filter(details => {
        let generalIDList = [374, 31, 32, 573, 52, 465]

          if (generalIDList.indexOf(details.DetailId) !== -1){
            return true
          }
        }
      )

      // INTERIOR LIST
      let interior = detailsArray.filter(details => {
        let interiorIDList = [94, 88, 96]

          if (interiorIDList.indexOf(details.DetailId) !== -1){
            return true
          }
        }
      )

      // SURFACE LIST
      let surface = detailsArray.filter(details => {
        let surfaceIDList = [1028, 73, 117, 118, 119]

        if (surfaceIDList.indexOf(details.DetailId) !== -1){
          return true
        }
      })

      // ENERGY LIST
      let energy = detailsArray.filter(details => {
        let energyIDList = [1307]

        if (energyIDList.indexOf(details.DetailId) !== -1){
          return true
        }
      }
      )

      //ENVIRONMENT LIST
      let environment= detailsArray.filter(details => {
        let envIDList = [925, 1180, 150, 151, 152, 158]

        if (envIDList.indexOf(details.DetailId) !== -1){
          return true
        }
      }
      )
      // COORDINATES LIST
      let coordinates = detailsArray.filter(details => {
        let gpsIDList = [1211]

        if (gpsIDList.indexOf(details.DetailId) !== -1){
          return true
        }
      })

      // LEAFLET COORDINATED
      var commaToPoint = (val) => {
        return val.replace(",", ".");
      }

      let gps = new Object()
      gps.Longitude = commaToPoint(coordinates[0].Subdetails[0].Value)
      gps.Latitude = commaToPoint(coordinates[0].Subdetails[1].Value)
      gps.List = new Array(commaToPoint(coordinates[0].Subdetails[0].Value), commaToPoint(coordinates[0].Subdetails[1].Value))

      console.log(gps)

      return {data , general, title, interior, energy, surface, environment, gps}
  }
}
