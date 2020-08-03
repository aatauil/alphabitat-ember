import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment' 

export default class PropertyRoute extends Route {
    async model(param) {

        let estateID = param.estateID
        const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"Language":"en-gb", "EstateID":${estateID}, "ShowDetails":true}`)
        const data = await response.data.d.EstateList
        const detailsArray = data[0].Details

        console.log(data)

        let general = detailsArray.filter(details => {
          let generalIDList = [374, 31, 32, 573, 52, 465]

            if (generalIDList.indexOf(details.DetailId) !== -1){
              return true
            }
          }
        )

        let interior = detailsArray.filter(details => {
          let interiorIDList = [94, 88, 96]

            if (interiorIDList.indexOf(details.DetailId) !== -1){
              return true
            }
          }
        )


        let surface = detailsArray.filter(details => {
          let surfaceIDList = [1028, 73, 117, 118, 119]

          if (surfaceIDList.indexOf(details.DetailId) !== -1){
            console.log(details.DetailId)
            return true
          }
        })

        let energy = detailsArray.filter(details => {
          let energyIDList = [1307]

          if (energyIDList.indexOf(details.DetailId) !== -1){
            return true
          }
        }
        )

        let environment= detailsArray.filter(details => {
          let envIDList = [925, 1180, 150, 151, 152, 158]

          if (envIDList.indexOf(details.DetailId) !== -1){
            return true
          }
        }
        )



        return {data , general, interior, energy, surface, environment}
      }
}
