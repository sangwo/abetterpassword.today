$(document).ready(function() {
  var DEFAULT_LENGTH = 8;
  var DEFAULT_HAS_DIGITS = true;
  var DEFAULT_HAS_LOWERCASE_LETTERS = true;
  var DEFAULT_HAS_UPPERCASE_LETTERS = true;
  var DEFAULT_HAS_SPACES = false;
  var DEFAULT_HAS_SPECIAL_CHARS = false;
  var DEFAULT_MIN_NUM_DIGITS = 1;
  var DEFAULT_MIN_NUM_LOWERCASE_LETTERS = 1;
  var DEFAULT_MIN_NUM_UPPERCASE_LETTERS = 1;
  
  var inputs = {
    length: $('input[name="length"]'),
    useDigitsCheckbox: $('input[name="use_digits"]'),
    useLowercaseLettersCheckbox: $('input[name="use_lowercase_letters"]'),
    useUppercaseLettersCheckbox: $('input[name="use_uppercase_letters"]'),
    minNumDigits: $('input[name="min_num_digits"]'),
    minNumLowercaseLetters: $('input[name="min_num_lowercase_letters"]'),
    minNumUppercaseLetters: $('input[name="min_num_uppercase_letters"]')
  }

  function setDefaults() {
    inputs.length.val(DEFAULT_LENGTH);
    inputs.useDigitsCheckbox.prop("checked", DEFAULT_HAS_DIGITS);
    inputs.useLowercaseLettersCheckbox.prop("checked", DEFAULT_HAS_LOWERCASE_LETTERS);
    inputs.useUppercaseLettersCheckbox.prop("checked", DEFAULT_HAS_LOWERCASE_LETTERS);
    inputs.minNumDigits.val(DEFAULT_MIN_NUM_DIGITS);
    inputs.minNumLowercaseLetters.val(DEFAULT_MIN_NUM_LOWERCASE_LETTERS);
    inputs.minNumUppercaseLetters.val(DEFAULT_MIN_NUM_UPPERCASE_LETTERS);
  }

  function setPasswordFromSettings() {
    var length = parseInt(inputs.length.val());
    var hasDigits = inputs.useDigitsCheckbox.prop("checked");
    var hasLowercaseLetters = inputs.useLowercaseLettersCheckbox.prop("checked");
    var hasUppercaseLetters = inputs.useUppercaseLettersCheckbox.prop("checked");
    var hasSpaces = $('input[name="use_spaces"]').prop("checked");
    var hasSpecialChars = $('input[name="use_special_chars"]').prop("checked");
    // minimum numbers
    if(inputs.minNumDigits.prop("disabled")) {
      var minNumDigits = 0;  
    } else {  
      var minNumDigits = parseInt(inputs.minNumDigits.val());
    }

    if(inputs.minNumLowercaseLetters.prop("disabled")) {
      var minNumLowercaseLetters = 0;  
    } else {  
      var minNumLowercaseLetters = parseInt(inputs.minNumLowercaseLetters.val());
    }

    if(inputs.minNumUppercaseLetters.prop("disabled")) {
      var minNumUppercaseLetters = 0;  
    } else {  
      var minNumUppercaseLetters = parseInt(inputs.minNumUppercaseLetters.val());
    }

    $('#generated-password').text(
      generatePassword(
	length || DEFAULT_LENGTH,
	hasDigits,
	hasLowercaseLetters,
	hasUppercaseLetters,
	hasSpaces,
	hasSpecialChars,
	minNumDigits,
	minNumLowercaseLetters,
	minNumUppercaseLetters
      )
    );
  }

  // check if digits/lowercase/uppercase checkboxes are checked, if not checked, disable min inputs
  function addEventHandlers() {
    inputs.useDigitsCheckbox.on('blur', function() {
      if(!$(this).prop("checked")) {
	inputs.minNumDigits.prop("disabled", true);  
      } else {
	inputs.minNumDigits.prop("disabled", false);  
      }
    });

    inputs.useLowercaseLettersCheckbox.on('blur', function() {
      if(!$(this).prop("checked")) {
	inputs.minNumLowercaseLetters.prop("disabled", true);  
      } else {
	inputs.minNumLowercaseLetters.prop("disabled", false);  
      }	
    });

    inputs.useUppercaseLettersCheckbox.on('blur', function() {
      if(!$(this).prop("checked")) {
	inputs.minNumUppercaseLetters.prop("disabled", true);  
      } else {
	inputs.minNumUppercaseLetters.prop("disabled", false);  
      }
    });

    // select all min num inputs
    var minNumInputs = inputs.minNumDigits
      .add(inputs.minNumLowercaseLetters)
      .add(inputs.minNumUppercaseLetters);

    // on blur, if input is empty, make it into 0
    minNumInputs.on('blur', function() {
      if($(this).val() == '') {
	$(this).val(0);  
      }
    });

    // when user clicks button, generate password
    $('#generate-password-button').on('click', setPasswordFromSettings);
  }

  setDefaults();
  
  // generate password by default on page load
  setPasswordFromSettings();

  addEventHandlers();
});
