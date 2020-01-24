let num = 266219;
let numStr = String(num);
let multiplier = numStr[0];

for(var i = 1; i < numStr.length; i++){
    console.log(multiplier *= +numStr[i]);
}

multiplier = String(multiplier ** 3); 
console.log('Число: ', multiplier.substring(0, 2));

