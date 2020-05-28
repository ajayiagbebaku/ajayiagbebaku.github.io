var name = prompt("Please enter your first name");
alert("Hi" + " " + name + ", "+"" + "let's play!");

alert(name + ", " +"Telstrat is booked with installs. Drennan, Marc and Rachelle need these done.");
alert("To resolve this you will have to pick a number 1 through 10. If you pick the same number the generator does...");
alert("YOU HAVE TO DO ALL THE INSTALLS!")
alert("Good Luck :)")

var installNumber = prompt("Pick a number 1 through 10");
var randomNumber = Math.round(Math.random()*10);
console.log(installNumber);
console.log(randomNumber);

if (installNumber === randomNumber){
  alert("You're assigned all the installs. Marc, Drennan and Rachelle are aware. Thanks for playing");
} else{
  alert("No installs for you. You're safe!..For now");
}
