//Part 0 Submitting the form
const form = document.querySelector(".main__form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);
});

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
}

const nicknameRegex = /^([a-z A-Z 0-9\.-]+)$/;

const emailRegex =
  /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

//Returns a range of characters
function addCharactersRange(InitialASCIICharacter, lastASCIICharacter) {
  let charactersList = "";

  for (let i = InitialASCIICharacter; i < lastASCIICharacter; i++) {
    charactersList += String.fromCharCode(i);
  }
  return charactersList;
}
class userInfo {
  constructor(nickname, email, password) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
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
        this.classList.add("valid-input");
        this.classList?.remove("invalid-input");
        imageIcon.classList?.remove("hide");
        imageIcon.setAttribute("src", "./ressources/check.svg");
        imageIcon.setAttribute(
          "alt",
          "Image of an icon for the user when the input is valid"
        );
      } else {
        this.classList.add("invalid-input");
        this.classList?.remove("valid-input");
        imageIcon.classList?.remove("hide");
        imageIcon.setAttribute("src", "./ressources/error.svg");
        imageIcon.setAttribute(
          "alt",
          "Image of an icon for the user when the input is invalid"
        );
      }
      break;
    }
    case "email": {
      console.log("Input type = email");
      if (emailRegex.test(this.value)) {
        this.classList.add("valid-input");
        this.classList?.remove("invalid-input");
        imageIcon.classList?.remove("hide");
        imageIcon.setAttribute("src", "./ressources/check.svg");
        imageIcon.setAttribute(
          "alt",
          "Image of an icon for when the input is valid"
        );
      } else {
        this.classList.add("invalid-input");
        this.classList?.remove("valid-input");
        imageIcon.classList?.remove("hide");
        imageIcon.setAttribute("src", "./ressources/error.svg");
        imageIcon.setAttribute(
          "alt",
          "Image of an icon for when the input is invalid"
        );
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

passwordInput.addEventListener("input", verifyStrength);
passwordConfirmationInput.addEventListener("input", confirmCorrespondance);

const characterSets = {
  symbols:
    addCharactersRange(33, 48) +
    addCharactersRange(58, 64) +
    addCharactersRange(91, 96) +
    addCharactersRange(123, 126),
  numbers: addCharactersRange(48, 58),
};

const passwordContainsWhichSymbols = {
  symbols: false,
  numbers: false,
};

function verifyStrength(e) {
  passwordInputValue = e.target.value;
  if (this.value === "") {
    passwordStrengthBoxesContainer.classList.add("hide");
    return;
  }
  passwordStrengthBoxesContainer.classList?.remove("hide");
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
    this.classList.add("valid-input");
    this.classList?.remove("invalid-input");
    imageIcon.classList?.remove("hide");
    imageIcon.setAttribute("src", "./ressources/check.svg");
    imageIcon.setAttribute(
      "alt",
      "Image of an icon for when the input is valid"
    );
  } else {
    this.classList.add("invalid-input");
    this.classList?.remove("valid-input");
    imageIcon.classList?.remove("hide");
    imageIcon.setAttribute("src", "./ressources/error.svg");
    imageIcon.setAttribute(
      "alt",
      "Image of an icon for when the input is invalid"
    );
  }
}
