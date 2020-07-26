export const validateUser = (formData, initialFormValidity) => {
  const formValidity = { ...initialFormValidity };

  [
    'bankAccount', 'cidNumber', 'city', 'email', 'firstName',
    'lastName', 'postalCode', 'street', 'username',
  ].forEach((element) => {
    if (formData[element] === null || formData[element] === '') {
      formValidity.elements[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  if (formValidity.elements.firstName === null && formData.firstName.length > 64) {
    formValidity.elements.firstName = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.lastName === null && formData.lastName.length > 64) {
    formValidity.elements.lastName = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.street === null && formData.street.length > 128) {
    formValidity.elements.street = 'Toto pole musí být maximálně 128 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.city === null && formData.city.length > 128) {
    formValidity.elements.city = 'Toto pole musí být maximálně 128 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.postalCode === null && formData.postalCode < 1) {
    formValidity.elements.postalCode = 'Toto pole musí být minimálně 0';
    formValidity.isValid = false;
  }

  if (formValidity.elements.postalCode === null && formData.postalCode > 99999) {
    formValidity.elements.postalCode = 'Toto pole musí být maximálně 99999.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.cidNumber === null && formData.cidNumber < 1) {
    formValidity.elements.cidNumber = 'Toto pole musí být minimálně 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.taxNumber === null
    && formData.taxNumber !== null
    && formData.taxNumber < 1
  ) {
    formValidity.elements.taxNumber = 'Toto pole musí být minimálně 0.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.bankAccount === null && formData.bankAccount.length > 64) {
    formValidity.elements.bankAccount = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.email === null && formData.email.length > 64) {
    formValidity.elements.email = 'Toto pole musí být maximálně 64 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.username === null && formData.username.length < 2) {
    formValidity.elements.username = 'Toto pole musí být minimálně 2 znaky dlouhé';
    formValidity.isValid = false;
  }

  if (formValidity.elements.username === null && formData.username.length > 64) {
    formValidity.elements.username = 'Toto pole musí být maximálně 66 znaků dlouhé';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.plainPassword === null
    && formData.plainPassword !== null
    && formData.plainPassword.length < 8
  ) {
    formValidity.elements.plainPassword = 'Toto pole musí být minimálně 8 znaků dlouhé';
    formValidity.isValid = false;
  }

  return formValidity;
};
