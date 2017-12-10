const inquirer=require('inquirer');
const BasicCard=require("./BasicCard.js");
const ClozeCard=require("./ClozeCard");
const library=require("./cardCollection.json");

const fs=require('fs');

MainMenu();


function AskAgain()
{
	inquirer.prompt([{
type:"input",
message:"Do you want to create another card?",
choices:["Yes","No"],
name:"anotherCard"
	}]).then(function(data){
           if(data.anotherCard==="Yes")
               CreateCard();
           else
           	MainMenu();});//end then

}






function CreateBasicCard()
{

inquirer.prompt([
{
	type:"input",
	message:"Please Enter your question(Front Portion) of your card.",
	name:"front"
},
{
	type:"input",
	message:"Please fill the back of your card.",
	name:"back"
}
]).then(function(data){
  var card= {front:data.front,back:data.back};
  library.push(card);
  fs.writeFileSync("cardCollection.json",JSON.stringify(library,null,2));
  AskAgain();
});
	
};

function CreateClozeCard()
{
        inquirer.prompt([
                        {
	                    type:"input",
	                    message:"Please Enter your question(Front Portion) of your card.Full text",
	                    name:"text"
                        },
                        {
	                    type:"input",
	                    message:"Please enter Cloze phrase.",
	                    name:"cloze"
                        }
                       ]).then(function(data)
                              {
  	                           var obj= {text:data.text,cloze:data.cloze};
  
                               if(obj.text.indexOf(obj.cloze)!=-1)
                                 {
	                              library.push(obj);
	                              fs.writeFileSync("cardCollection.json",JSON.stringify(library,null,2));
                                 }
                                 AskAgain();
                               });

};




function CreateCard()
{
inquirer.prompt([
{
	type:"list",
	message:"What type of flashcard do you want to create?",
	choices:["Basic Card","Cloze Card"],
	name:"cardType"
}
]).then(function(data){
var FlashType=data.cardType;

if(FlashType==="Basic Card")
{
 CreateBasicCard();
}

else if(FlashType==="Cloze Card")
{
	CreateClozeCard();
}

});//end outer then
};//end of function
function MainMenu()
{
	inquirer.prompt([{
		              type: "list",
		              message:"Do you want to make a new card ,view existing ones or play?",
		              choices:["Play","Create","ShowCards"],
	                  name:"MenuOption"
	                }]).then(function(data){
	                  	if(data.MenuOption==="Create")
	                  		CreateCard();
	                  	else if(data.MenuOption==="Play")
	                  		Play();
	                  	else if(data.MenuOption==="ShowCards")
	                  		ShowCards();
	                  });
};


function Play()
{
	var newDeck = library.slice(0,library.length-1);
	
	
      var getIndex = Math.floor(Math.random() * (library.length - 1));
      var question = newDeck[getIndex];
      var AskQuestion;
      var cardType;
      var drawnCard="";
      if(question.front!==undefined)
      {
          cardType="BasicCard";
          drawnCard=BasicCard(question.front,question.back);
          AskQuestion=drawnCard.front;
      }
      if(question.text!==undefined)
      {
      	cardType="ClozeCard";
      	drawnCard = new ClozeCard(question.text, question.cloze)	//drawnCard becomes a new instance of ClozeCard constuctor with its text and cloze passed in
        AskQuestion= drawnCard.clozeRemoved();	
      }

      inquirer.prompt([
      	               {type:"input",
                       message:AskQuestion,
                       name:"answer"
                       }
                       ]
                       ).then(
                       function(data)
                       {
                       	if(cardType==="BasicCard")
                          { if(data.answer===drawnCard.back)
                         	console.log("you are correct");
                          if(data.answer!==drawnCard.back)
                         	console.log("Oops Better luck next time the correct answer is "+drawnCard.back);
                           }
                        if(cardType==="ClozeCard")
                          { if(data.answer===drawnCard.cloze)
                         	console.log("you are correct");
                          if(data.answer!==drawnCard.cloze)
                         	console.log("Oops Better luck next time the correct answer is "+drawnCard.cloze);
                          }
                          MainMenu();
                       }
                       );
  
}



function ShowCards()
{
	for(var a=0;a<library.length;a++)
	{
		if(library[a].front!=undefined)
			{
				console.log("Basic Card");
				console.log("Front: "+library[a].front);
				console.log("Back: " + library[a].back + ".");

            }
            	if(library[a].text!=undefined)
			{
				console.log("Cloze Card");
				console.log("Text: "+library[a].text);
				console.log("Cloze Text: " + library[a].cloze + ".");

            }
	}

}


