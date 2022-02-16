/*global fetch document FormData*/

let dinoData;
//function to assign fetched data from dino.json file to dinoData variable
function assignDinoData(da){
    dinoData = da.Dinos;
}

//fetching data from json using fetch api
fetch('./dino.json').then(response => response.json()).then(data => assignDinoData(data))

let humanObj = {}
//function to create a human object containing data collected from form
function createHuman(hname,feet,inches,weight,diet){
    const human = {
    hname : hname,
    height : (Number(feet)+(Number(inches)/12)).toFixed(2),
    weight : weight,
    diet : diet,
    }
    return human;
}

//creating Dinosaurs classs
class Dinosaurs{
    constructor(d){
        this.dinoSpecies = d.species;
        this.dinoHeight = d.height;
        this.dinoWeight = d.weight;
        this.dinoDiet = d.diet;
        this.dinoFact = d.fact;
        this.dinoPeriod = d.when;
        this.dinoLocation = d.where;
    }
//function to compare human and dinosaur height
    compareHeight(humanObj){
        let times_height = (Number(this.dinoHeight)/Number(humanObj.height)).toFixed(2);
        return `My height is ${times_height} times your height.`

    }

//function to compare human and dinosaur weight
    compareWeight(humanObj){
        let times_weight = (Number(this.dinoWeight)/Number(humanObj.weight)).toFixed(2);
        return `My weight is ${times_weight} times your weight.`
    }      


//function to compare human and dinosaur food    
    compareFood(humanObj){
        return `I am ${this.dinoDiet} and you are ${humanObj.diet}`
    }

//function to get a random fact from Dinosaur object
    giveRandomFact(){
        let randomNum = Math.floor(Math.random()*6);
        let randomFact = "";
        switch (randomNum) {
            case 0:
                randomFact = this.compareHeight(humanObj);
              break;
            case 1:
                randomFact = this.compareWeight(humanObj);
              break;
            case 2:
                randomFact = this.compareFood(humanObj);
              break;
            case 3:
                randomFact = this.dinoFact;
              break;
            case 4:
                randomFact = `I lived in ${this.dinoPeriod} era.`;
              break;
            case 5:
                randomFact = `I lived in ${this.dinoLocation}.`;
              break;
        }
        return randomFact;

    }

}

//function to create Dinosaur Object
function createDinoObject(data){
    let obj = new Dinosaurs(data);
    let factToDisplay = ""
    if(obj.dinoSpecies==="Pigeon"){
        factToDisplay = obj.dinoFact;
    }
    else{
        factToDisplay = obj.giveRandomFact();
    }
    let dataDiv = `<div class="card">
    <h3>
        ${obj.dinoSpecies}
    </h3>
    <p>Fact:  ${factToDisplay}</p>
    </div>`
    return dataDiv
    
}

//function to create the grid to be displayed
function createGridElements(compare_form){
    compare_form.style.display = "none";
    let formData = new FormData(compare_form)
    
    let grid_ele = document.getElementById('grid');
    humanObj = createHuman(formData.get('name'),formData.get('feet'),formData.get('inches'),formData.get('weight'),formData.get('diet'));

    for(let i=0,j=0;i<9;i++){
        let image_name = ""
        let returnedDataDiv={}
        if(i==4){
            image_name = `images/human.png`;
            returnedDataDiv = `<div class="card">
            <h3>
                ${humanObj.hname}
            </h3>
            </div>`
            
            
        }
        else{
            image_name = `images/${dinoData[j].species.toLowerCase()}.png`;
            returnedDataDiv = createDinoObject(dinoData[j]);
            j++;        
        }
    
        
        let dataDiv = document.createElement('div');
        dataDiv.innerHTML = returnedDataDiv;
        let item = document.createElement('div');
        item.classList.add('grid-item');        
        item.style.backgroundImage = `url("${image_name}")`;
        item.style.backgroundSize = "300px 300px"
        item.style.height = "300px";
        item.appendChild(dataDiv);
        grid_ele.appendChild(item);
    }
    
}

//getting form element to extract data
let compare_form = document.getElementById("dino-compare");
//getting submit button of form to add an event listener to it
let compare_me_btn = document.getElementById('btn');
//adding event listener to the button
compare_me_btn.addEventListener('click',function(){createGridElements(compare_form)}); 