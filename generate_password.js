var DIGITS = '0123456789';
var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
var SPECIAL_LETTERS = '!@#%';

var CHAR_TYPE_DIGIT = 'digit';
var CHAR_TYPE_LOWERCASE_LETTER = 'lowercase_letter';
var CHAR_TYPE_UPPERCASE_LETTER = 'uppercase_letter';
var CHAR_TYPE_SPACE = 'space';
var CHAR_TYPE_SPECIAL = 'special';

function choice(choices) {
  var num = Math.floor(Math.random() * (choices.length))
  return choices[num]
}

function weightedChoice(choices, weights, num) {
  num = num || Math.random() * sum_array(weights);
  
  var cumulativeWeights = 0;
  for(var i = 0; i < choices.length; i++) {
    if(num >= cumulativeWeights && num < cumulativeWeights + weights[i]) {
      return choices[i];
    }
    
    cumulativeWeights += weights[i];
  }
}

function sum_array(nums) {
  var sum = 0;
  for(var i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}

function generatePassword(
  length,
  hasDigits,
  hasLowercaseLetters,
  hasUppercaseLetters,
  hasSpaces,
  hasSpecialChars,
  minNumDigits,
  minNumLowercaseLetters,
  minNumUppercaseLetters
) {
  // when hasSpaces or hasSpecialChars is true, set their minimum number to 1
  var minNumSpaces = Number(hasSpaces);
  var minNumSpecialChars = Number(hasSpecialChars);

  // Errors
  if(!(hasDigits || hasLowercaseLetters || hasUppercaseLetters || hasSpaces || hasSpecialChars)) {
     throw "Password should contain digits/letters/spaces/special characters";
  }
 
  if(minNumDigits + minNumLowercaseLetters + minNumUppercaseLetters + minNumSpaces + minNumSpecialChars > length) {
    throw "Password minimum requirements exceed the given length";
  }

  var password = '';
  // generate password that is not in minimum requirements
  for(var i = 0; i < length - (minNumDigits + minNumLowercaseLetters + minNumUppercaseLetters + minNumSpaces + minNumSpecialChars); i++) {
    var charType = pickCharType(hasDigits, hasLowercaseLetters, hasUppercaseLetters, hasSpaces, hasSpecialChars);
    password += generateRandomChar(charType);
  }
    
  // generate password in minimum digits
  for(var i = 0; i < minNumDigits; i++) {
    var randomDigit = generateRandomDigit();
    var randomIndex = Math.floor(Math.random() * password.length);
    password = password.slice(0, randomIndex) + randomDigit + password.slice(randomIndex, password.length);
  }
    
  // generate password in minimum lowercase letters
  for(var i = 0; i < minNumLowercaseLetters; i++) {
    var randomLowercaseLetter = generateRandomLowercaseLetter();
    var randomIndex = Math.floor(Math.random() * password.length);
    password = password.slice(0, randomIndex) + randomLowercaseLetter + password.slice(randomIndex, password.length);
  }
    
  // generate password in minimum uppercase letters
  for(var i = 0; i < minNumUppercaseLetters; i++) {
    var randomUppercaseLetter = generateRandomUppercaseLetter();
    var randomIndex = Math.floor(Math.random() * password.length);
    password = password.slice(0, randomIndex) + randomUppercaseLetter + password.slice(randomIndex, password.length);
  }

  // generate password in minimum spaces
  for(var i = 0; i < minNumSpaces; i++) {
    var randomIndex = Math.floor(Math.random() * password.length);
    password = password.slice(0, randomIndex) + ' ' + password.slice(randomIndex, password.length); 
  }

  // generate password in minimum special characters
  for(var i = 0; i < minNumSpecialChars; i++) {
    var randomSpecialChars = generateRandomSpecialChars();
    var randomIndex = Math.floor(Math.random() * password.length);  
    password = password.slice(0, randomIndex) + randomSpecialChars + password.slice(randomIndex, password.length); 
  }
    
  return password;
}

function generateRandomChar(charType) {
  if(charType === CHAR_TYPE_DIGIT) {
    return generateRandomDigit();
  }
  
  if(charType === CHAR_TYPE_LOWERCASE_LETTER) {
    return generateRandomLowercaseLetter();
  }
  
  if(charType === CHAR_TYPE_UPPERCASE_LETTER) {
    return generateRandomUppercaseLetter();
  }
  
  if(charType === CHAR_TYPE_SPACE) {
    return ' ';
  }
  
  if(charType === CHAR_TYPE_SPECIAL) {
    return choice(SPECIAL_LETTERS);
  }
}

function pickCharType(
  hasDigits,
  hasLowercaseLetters,
  hasUppercaseLetters,
  hasSpaces,
  hasSpecialChars
) {
  var charTypes = [];
  var weights = [];
  
  if(hasDigits) {
    charTypes.push(CHAR_TYPE_DIGIT);
    weights.push(DIGITS.length);
  }
  
  if(hasLowercaseLetters) {
    charTypes.push(CHAR_TYPE_LOWERCASE_LETTER);
    weights.push(LETTERS.length);
  }
    
  if(hasUppercaseLetters) {
    charTypes.push(CHAR_TYPE_UPPERCASE_LETTER);
    weights.push(LETTERS.length);
  }
    
  if(hasSpaces) {
    charTypes.push(CHAR_TYPE_SPACE);
    weights.push(1);
  }
    
  if(hasSpecialChars) {
    charTypes.push(CHAR_TYPE_SPECIAL);
    weights.push(SPECIAL_LETTERS.length);
  }
    
  return weightedChoice(charTypes, weights);
}

function generateRandomDigit() {
  return choice(DIGITS);
}

function generateRandomLowercaseLetter() {
  return choice(LETTERS);
}

function generateRandomUppercaseLetter() {
  return choice(LETTERS.toUpperCase());
}

function generateRandomSpecialChars() {
  return choice(SPECIAL_LETTERS);  
}
