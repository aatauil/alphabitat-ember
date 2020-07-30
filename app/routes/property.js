import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment' 

export default class PropertyRoute extends Route {
    async model(param) {

        let estateID = param.estateID
        const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"Language":"en-gb", "EstateID":${estateID}, "ShowDetails":true}`)
        const data = await response.data.d.EstateList
        const detailsArray = data[0].Details

        let interior = detailsArray.filter((details) => details.Type == "interior")
        let exterior = detailsArray.filter((details) => details.Type == "exterior")
        let communication = detailsArray.filter((details) => details.Type == "communication")
        return {data , interior, exterior, communication}
      }
}
