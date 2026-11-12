
//Javascript for the fhiapi.html//

const baseUrl = 'https://statistikk-data.fhi.no/api/open/v1/msis/Table/733/'; 
//From codesamples https://github.com/folkehelseinstituttet/Fhi.Statistikk.OpenAPI/blob/main/Code_samples/React/fhi-open-api-client/src/api.js
//Deklarerer hvilken tabell som skal brukes

const query = {

  "dimensions": [
    {
      "code": "Agens",
      "filter": "all",
      "values": ["*"
      ]
    },
    {
      "code": "xPrøveåruke",
      "filter": "item",
      "values": [
        ""
      ]
    },
    {
      "code": "Geo",
      "filter": "item",
      "values": [
        "0"
      ]
    },
    {
      "code": "Aldersgruppe",
      "filter": "item",
      "values": [
        "Alle"
      ]
    },
    {
      "code": "MEASURE_TYPE",
      "filter": "item",
      "values": [
        "Antall_positive"
      ]
    }
  ],
  "response": {
    "format": "json-stat2",
    "maxRowCount": 50000
  }
};

// denne gir https://statistikk-data.fhi.no/api/open/v1/msis/Table/733/query', slik som i swagger
fetch(baseUrl + "query", { method: 'GET' })
  .then(response => response.json())
  .then(data => {console.log('apidata:', data);
  const uke = data.dimensions[1].values;
  const sisteVerdi = [...uke].sort().at(-1) //Første forsøk fungerte ikke. Sjekket i dag om uken hadde oppdatert seg, men arrayet returnete ikke
  //ukene i kronologisk rekkefølge. Så kunne ikke bruke opprinnelig logikk. Brukte AI til å hjelpe meg med en string sort. Denne gir en ny sortert array der 
  //jeg gjenbruker litt av koden fra første forsøk. Ser ut som dette fungerer fint.
   //const sisteVerdi = data.dimensions[1].values.at(-1); //.at(-1) henter den siste verdien i arrayet. 
   //Brukte JSON pathfinder for å finne dimensions[1].values for lese array fra json
   
   console.log('Siste uke', sisteVerdi);//vises i consol loggen (f12) at riktig uke er hentet
   query.dimensions[1].values[0] = sisteVerdi; //JSON path finder for å finne ut dimensions[1].values[0]. Legger
   //sisteVerdi som value

//denne gir https://statistikk-data.fhi.no/api/open/v1/msis/Table/733/data' som i swagger
    fetch(baseUrl + "data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( query) //Module 6.2 og https://github.com/folkehelseinstituttet/Fhi.Statistikk.OpenAPI/blob/main/Code_samples/React/fhi-open-api-client/src/api.js
        })
        .then(response => response.json())
        .then(data => {console.log('Rådata', data);
            const maxVerdi = Math.max(...data.value); //Finner max verdien i array https://code.mu/en/javascript/manual/math/Math.max/ 
            //håper å kunne bruke denne i y aksen i grafen
            console.log('MaxVerdi: ', maxVerdi); //for å se hva den returnerer

             Highcharts.chart('overview', {
        chart: { type: 'column' },
        title: { text: 'Number of positive tests per pathogen week '+sisteVerdi},
        xAxis: {
          title: { text: 'Pathogen' },
          categories: data.dimension.Agens.category.index,
          labels: { rotation: -45 }
        },
        yAxis: {
          title: { text: 'Number of positive tests' },
          min: 0,
          max: maxVerdi
        },
        accessibility: { enabled: true },
        series: [{
          name: 'Number of positive tests per pathogen week '+sisteVerdi,
          data: data.value
        }]
      });
    });
  })
  
.catch(err => {
    console.error('Failed to fetch data:', err);
  });


//Javascript for the diseaseinformation.html//

document.getElementById("adenovirus").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  "Adenovirus is a respiratory disease that can cause disease in both humans and animals. It can cause soar trought, fever, and conjunctivitis. Source: NHI,2026" 
});

document.getElementById("bordtellapertussis").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  "Bordtella pertussis (also known as whooping cough) is highly contagious and spreads via respiratory droplets. It causes severe cough, and can last 2-3 months or more. The infection is dangerous for small children, and is therefore included in the child vaccination program. Source: FHI,2026  "
});
 

document.getElementById("chlamydiapneumoniae").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  "Chlamydia pneumoniae is a bacterial infection that spreads trough respiratory droplet, and often give moderate cold symptoms. But it can develop to more severe infections like  "
});  
 

document.getElementById("influensavirusa").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
});

document.getElementById("influensavirusb").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
});   

document.getElementById("metapneumovirus").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
}); 

document.getElementById("mycoplasma").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
}); 

document.getElementById("parainfluensavirus").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
}); 

document.getElementById("sarscovid").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
}); 

document.getElementById("rhinovirus").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
}); 

document.getElementById("rsvirus").addEventListener("click", function(){
  document.getElementById("informationbox").textContent = 
  " Legg til tekst "
}); 