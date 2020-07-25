import React from 'react'
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: "#cc1024",
    multipier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multipier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multipier: 2000,
  },
};

export const sortData = (data) => {
    const sortData = [...data];
    sortData.sort((a, b) => {
        if (a.cases > b.cases)
            return -1;
        else
            return 1;
    });
    return sortData;
};

export const showDataOnMap = (data, casesType = "cases") =>
         data.map((country) => (
           <Circle
             center={[country.countryInfo.lat, country.countryInfo.long]}
             fillOpacity={0.4}
             color={casesTypeColors[casesType].hex}
             fillColor={casesTypeColors[casesType].hex}
             radicus={
               Math.sqrt(country[casesType]) *
               casesTypeColors[casesType].multipier
             }
           >
             <Popup>
                 <h1>hello</h1>
             </Popup>
           </Circle>
         ));