export const getDataByQueryParams = (data, queryObj) => {

    const { continent, country, is_open_to_public } = queryObj
  
    if (continent) {
      data = data.filter( destination => 
        destination.continent.toLowerCase() === continent.toLowerCase() 
      )
    }
  
    if (country) {
      data = data.filter( destination => 
        destination.country.toLowerCase() === country.toLowerCase() 
      )
    }
  
    if (is_open_to_public ) {
      data = data.filter( destination => 
        {
          console.log(destination.is_open_to_public, is_open_to_public )
          //in terminal you can see two colors yellow and white 
          //two colors means maybe we are comparing different data types
          console.log(typeof destination.is_open_to_public, typeof is_open_to_public )
          return String(destination.is_open_to_public)  === is_open_to_public 
        }
      )
    }
  
    return data
  } 