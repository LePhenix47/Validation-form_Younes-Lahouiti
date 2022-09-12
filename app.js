//Part 0 Submitting the form
const form = document.querySelector(".main__form");

const formFieldsValidation = {
  nickname: false,
  email: false,
  password: false,
  confirmPassword: false,
};

let isShakingAnimationOn = false;
form.addEventListener("submit", manageFormValidity);

function manageFormValidity(e) {
  console.log(e);
  e.preventDefault();
  const keys = Object.keys(formFieldsValidation); //Transforms the properties an object into an array

  let failedFields = keys.filter((field) => {
    return !formFieldsValidation[field];
  });

  if (failedFields.length && !isShakingAnimationOn) {
    isShakingAnimationOn = true;
    form.parentElement.classList.add("invalid-form-animation");

    // setTimeout(() => {
    //   isShakingAnimationOn = false;
    //   form.parentElement.classList.remove("invalid-form-animation");
    // }, 650);
  }
}

// Part 1: Reading the file
const fileUploadButton = document.querySelector(".main__input-file");
const image = document.querySelector(".main__image");
const previewParagraph = document.querySelector(".main__image-preview-name");
const labelFile = document.querySelector(".main__label-file");

fileUploadButton.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    console.log(file);
    console.log(
      "%c" + file.name,
      "background-color: blue; color: white; padding: 5px"
    );
    image.classList.replace("hide", "show");

    reader.addEventListener("load", function () {
      image.setAttribute("src", reader.result);
      image.setAttribute("alt", file.name);
      image.setAttribute("title", file.name);
      previewParagraph.textContent = "";
      labelFile.textContent = "Successfully added!";
    });
    reader.readAsDataURL(file);
  }
});

//Part 2.A: Verifying the value of the inputs
const inputs = document.querySelectorAll("input");
const inputsArray = Array.from(inputs);

const textInputsArray = inputsArray.filter((input) => {
  return input.type !== "file";
});

for (textInputElement of textInputsArray) {
  textInputElement.addEventListener("change", handleInputs);
  if (textInputElement.value !== "") {
    let label = textInputElement.parentElement.querySelector(".main__label");
    label.classList.add("filled-input");
  }
}

const nicknameRegex = /^([a-z A-Z 0-9\.-]+)$/;

const emailRegex =
  /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

//Adds the visual elements for the user to tell if a value from a form field is valid or not
function giveValidationUI(inputElement, imageElement, errorOrCheck) {
  if (errorOrCheck === "error") {
    inputElement.classList.add("invalid-input");
    inputElement.classList?.remove("valid-input");
    imageElement.classList?.remove("hide");
    imageElement.setAttribute("src", "./ressources/error.svg");
    imageElement.setAttribute(
      "alt",
      "Image of an icon for when the input is invalid"
    );
  } else if (errorOrCheck === "check") {
    inputElement.classList.add("valid-input");
    inputElement.classList?.remove("invalid-input");
    imageElement.classList?.remove("hide");
    imageElement.setAttribute("src", "./ressources/check.svg");
    imageElement.setAttribute(
      "alt",
      "Image of an icon for when the input is valid"
    );
  }
}

let label = undefined;
let icon = undefined;
let passwordElementsContainer = undefined;
function handleInputs(e) {
  label = this.parentElement.querySelector("label");
  imageIcon = this.parentElement.querySelector("img");

  if (this.parentElement.classList.contains("main__input-label")) {
    passwordElementsContainer = this.parentElement.parentElement.querySelector(
      ".main__password-strength"
    );
  }
  if (this.value !== "") {
    label.classList.add("filled-input");
  } else {
    label.classList?.remove("filled-input");
  }

  switch (this.type) {
    case "text": {
      console.log("input type = text");
      if (this.value.length > 2 && nicknameRegex.test(this.value)) {
        giveValidationUI(this, imageIcon, "check");
        formFieldsValidation.nickname = true;
      } else {
        giveValidationUI(this, imageIcon, "error");
        formFieldsValidation.nickname = false;
      }
      break;
    }
    case "email": {
      console.log("Input type = email");
      if (emailRegex.test(this.value)) {
        giveValidationUI(this, imageIcon, "check");
        formFieldsValidation.email = true;
      } else {
        giveValidationUI(this, imageIcon, "error");
        formFieldsValidation.email = false;
      }
      break;
    }
    case "password": {
      console.log("Input type = Password");
      break;
    }
  }
}

//Part 2.B: Verifying the strength of the password

const passwordVerification = {
  length: false,
  symbols: false,
  numbers: false,
};

const regexList = {
  symbols: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/,
  numbers: /[0-9]/,
};

const uppercaseLettersRegex = /[A-Z]/;

const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector("#confirmation");
const passwordStrengthBoxesContainer = document.querySelector(
  ".main__password-strength"
);

const passwordWeakBox = document.querySelector(".main__password-strength-weak");
const passwordMediumBox = document.querySelector(
  ".main__password-strength-medium"
);
const passwordStrongBox = document.querySelector(
  ".main__password-strength-strong"
);

let passwordInputValue = "";
let confirmPasswordInputValue = "";

passwordInput.addEventListener("input", verifyPassword);
passwordConfirmationInput.addEventListener("input", confirmCorrespondance);
passwordConfirmationInput.addEventListener("blur", checkPasswordValue);

function checkPasswordValue(e) {
  let imageIcon = e.target.parentElement.querySelector(
    ".main__input-label-icon"
  );
  if (passwordInputValue === "") {
    passwordStrengthBoxesContainer.classList.add("hide");
    giveValidationUI(this, imageIcon);
    return;
  }
}

function verifyPassword(e) {
  passwordInputValue = e.target.value;
  console.log(passwordInputValue);

  let validationResult = 0;

  let imageIcon = this.parentElement.querySelector(".main__input-label-icon");
  // if (passwordInputValue === "") {
  //   passwordStrengthBoxesContainer.classList.add("hide");
  //   giveValidationUI(this, imageIcon);
  //   return;
  // }

  for (const regex in passwordVerification) {
    console.log({ regex }, passwordVerification[regex]);
    if (regex === "length") {
      if (passwordInputValue.length >= 6) {
        passwordVerification.length = true;
        validationResult++;
      } else {
        passwordVerification.length = false;

        validationResult--;
      }
      continue;
    }

    if (regexList[regex].test(passwordInputValue)) {
      passwordVerification[regex] = true;
      validationResult++;
    } else {
      passwordVerification[regex] = false;
      validationResult--;
    }
  }

  console.log(passwordVerification);
  console.group("validationResult");
  console.log(validationResult);
  console.groupEnd("validationResult");

  if (validationResult >= 3) {
    giveValidationUI(this, imageIcon, "check");
    formFieldsValidation.password = true;
    passwordStrengthBoxesContainer.classList?.remove("hide");
    verifyStrength(passwordInputValue);
  } else {
    giveValidationUI(this, imageIcon, "error");
    passwordStrengthBoxesContainer.classList.add("hide");
    formFieldsValidation.password = false;
  }
}

function verifyStrength(passwordValue) {
  if (
    passwordValue.length > 12 &&
    passwordVerification.symbols &&
    passwordVerification.numbers
  ) {
    passwordStrongBox.classList?.remove("invisible");
    passwordMediumBox.classList?.remove("invisible");
    passwordWeakBox.classList?.remove("invisible");
  } else if (
    (passwordValue.length > 9 && passwordVerification.symbols) ||
    (passwordVerification.numbers && uppercaseLettersRegex.test(passwordValue))
  ) {
    passwordStrongBox.classList.add("invisible");
    passwordMediumBox.classList?.remove("invisible");
    passwordWeakBox.classList?.remove("invisible");
  } else {
    passwordStrongBox.classList.add("invisible");
    passwordMediumBox.classList.add("invisible");
    passwordWeakBox.classList?.remove("invisible");
  }
}

//Part 2.C: Veryfing the correspondace of the passwords
function confirmCorrespondance(e) {
  label = this.parentElement.querySelector("label");
  imageIcon = this.parentElement.querySelector("img");
  confirmPasswordInputValue = e.target.value;
  console.log("Input on confirm");
  if (
    passwordInputValue !== "" &&
    passwordInputValue === confirmPasswordInputValue
  ) {
    giveValidationUI(this, imageIcon, "check");
    formFieldsValidation.confirmPassword = true;
  } else {
    giveValidationUI(this, imageIcon, "error");
    formFieldsValidation.confirmPassword = false;
  }
}
