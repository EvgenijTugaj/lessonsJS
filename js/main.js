let num = 266219;
let multiplier = num.toString()[0];

for(var i = 1; i < num.toString().length; i++){
    console.log(multiplier *= +num.toString()[i]);
}

multiplier **= 3;
console.log('Число: ', multiplier.toString().substring(0, 2));
