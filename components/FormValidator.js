export class FormValidator {
  constructor(validationConfig, element) {
    this._validationConfig = validationConfig;
    this._element = element;
  }
  _showInputError = (inputElement, mistake) => {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationConfig.inputError);
    errorElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = mistake;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validationConfig.inputError);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._element.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      this._validationConfig.submitButtonSelector
    );

    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationConfig.activeButton);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._validationConfig.activeButton);
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._element.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
