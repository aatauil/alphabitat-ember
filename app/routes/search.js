import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'alphabitat-ember/config/environment'


export default class SearchRoute extends Route {
  queryParams = {
    buyRent: {
      refreshModel: true
    }
  };
  
    async model(param) { 
      console.log(param)

        let regionParam = param.regions.split(",") 

        let regionList = new Array
        
        regionParam.forEach(element => {
         switch (element) {
            case '1': 
              regionList.push(20341)
              break;

            case '2':
              regionList.push(20705)
              break;

            case '3':
              regionList.push(20706,20346,20347)
              break;

            case '4': 
              regionList.push(51498)
              break;
            
            case '5':
              regionList.push(20347,20346,20345,20344,20343,20342)
              break;
              
         }
        });
        console.log(regionList)
        
        const response = await axios.get(`${ENV.APP.API_URL}{"ClientId":"${ENV.APP.API_TOKEN}","Page":0,"RowsPerPage":20,"Language":"en-gb","PurposeIDList": [${param.buyRent}], "PriceRange":["${param.minPrice}", "${param.maxPrice}"}], "RegionIDList": [${regionList}] }`)
        const data = await response.data.d.EstateList
        await console.log(data)
        return data
      }
}
