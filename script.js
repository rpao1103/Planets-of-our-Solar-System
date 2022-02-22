const url = "https://raw.githubusercontent.com/rpao1103/Planets-of-our-Solar-System/main/Planets%20of%20our%20Solar%20System%20(2).csv";


const density = getColumn(url,3);
const diameter = getColumn(url,2);
const planetName = getColumn(url,1);
const planetURL = getColumn(url, 15);
const lengthOfDay = getColumn(url,6);
const gravity = getColumn(url, 4);


//A function that prints the url of the planet's image inputted by the user. 
// param - selectedPlanet {string} - a string that will be the planet name inputted by the user. 
//return urlToPrint {string} - a url of a picture of the plant selected by the user.
function getURL(selectedPlanet){
  selectedPlanet = selectedPlanet.toLowerCase();
  var urlToPrint = [];
  for (var i in planetName){
    if (selectedPlanet == planetName[i].toLowerCase()){
      urlToPrint.push(planetURL[i]); 
      return urlToPrint;
    }
    }
    return "Please try again and enter a valid planet name.";
}



//A function that finds the biggest (widest and heaviest) planet based on diameter and density. 
//return biggestPlanetName {string} - returns the name of the biggest planet. 
function getBiggestPlanet(){
  var maxPlanetSize = 0; 
  var bigPlanetSizes = []; 
  var biggestPlanetName = ""; 
  for (var i = 0; i < planetName.length; i++){
    maxPlanetSize = Number(density[i]) + Number(diameter[i]);
    bigPlanetSizes.push(maxPlanetSize);
  }
  for (var i = 0; i < bigPlanetSizes.length; i++){
    if (bigPlanetSizes[i] > maxPlanetSize){
      maxPlanetSize = bigPlanetSizes[i];
      biggestPlanetName = planetName[i];
    }
  }
  return biggestPlanetName;
}




//A function that finds the smallest (lightest and skinniest) planet based on diameter and density.
//return smallestPlanetName {string} - returns the name of the smallest planet. 
function getSmallestPlanet(){
  var minPlanetSize = 0;
  var smallPlanetSizes = [];
  var smallestPlanetName = "";

  for (var i = 0; i < planetName.length; i++){
    minPlanetSize = Number(density[i]) + Number(diameter[i]);
    smallPlanetSizes.push(minPlanetSize);
  }
  minPlanetSize = smallPlanetSizes[0];
  for (var i = 0; i < smallPlanetSizes.length; i++){
    if (smallPlanetSizes[i] < minPlanetSize){
      minPlanetSize = smallPlanetSizes[i];
      smallestPlanetName = planetName[i];
    }
  }
  return smallestPlanetName;
}



//A function that finds the average day length of all the planets combined. This is used to give a sense of the average day length in our solar system. 
// return avgDayVal {number} - Returns the average day length of all the planets combined.
function findAvgDay(){
  var sum = 0;
  for (var i = 0; i < lengthOfDay.length; i++){
    sum += Number(lengthOfDay[i]);
  }
  var avgDayVal = sum / lengthOfDay.length;
  return avgDayVal; 
}



//A function that finds what you would weigh on a planet of your choice. 
// param - weight {number} - the desiered weight inputted by the user.
// param - planet {string} - the chosen planet that the user wants to know how much they would weigh on it. 
//return finalWeight {number} - the weight of an object or human on a certain planet of choice in pounds. 
function getYourPlanetWeight(weight, planet){
  planet = planet.toLowerCase();
  var planetGravityVal = 0;
  var finalWeight = 0;
  for (var i in planetName){
    if (planet == planetName[i].toLowerCase()){
      planetGravityVal = gravity[i];
    }
  }
  if(planetGravityVal == 0){ 
    return "No planet found. Please check to make sure the parameters are valid. Enter a valid planet name and a positive weight value. "
  }
  if (!(weight > 0)){
    return "No planet found. Please check to make sure the parameters are valid. Enter a valid planet name and a positive weight value. "
  }
  finalWeight = Number((planetGravityVal/9.8) * weight);
  return finalWeight;
} 







function getColumn(url, columnNumber){
  var column = [];
  var table = [];
  var request = new XMLHttpRequest();  
  request.open("GET", url, false);   
  request.send(null);  
  var csvData = new Array();
  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    csvData.push(jsonObject[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
  }
  table = csvData;
  column = getCol(table, columnNumber);
  return column;
}

//returns the specified column from a 2D Array
function getCol(matrix, col){
       var column = [];
       for(var i=1; i<matrix.length-1; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }
