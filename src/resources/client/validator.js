import validator from 'validator';

export const validateClient = (formData, initialFormValidity) => {
  const formValidity = { ...initialFormValidity };

  ['city', 'name', 'postalCode', 'street'].forEach((element) => {
    if (formData[element] === null || formData[element] === '') {
      formValidity.elements[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  if (formValidity.elements.name === null && formData.name.length > 64) {
    formValidity.elements.name = 'Toto pole musí být maximálně 64 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.street === null && formData.street.length > 128) {
    formValidity.elements.street = 'Toto pole musí být maximálně 128 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.city === null && formData.city.length > 128) {
    formValidity.elements.city = 'Toto pole musí být maximálně 128 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.postalCode === null && formData.postalCode < 1) {
    formValidity.elements.postalCode = 'Toto pole musí být minimálně 0.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.postalCode === null && formData.postalCode > 99999) {
    formValidity.elements.postalCode = 'Toto pole musí být maximálně 99999.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.cidNumber === null
    && formData.cidNumber !== null
    && formData.cidNumber < 1
  ) {
    formValidity.elements.cidNumber = 'Toto pole musí být minimálně 0.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.cidNumber === null
    && formData.cidNumber !== null
    && formData.cidNumber > 2147483647
  ) {
    formValidity.elements.cidNumber = 'Toto pole musí být menší než 2147483647.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.taxNumber === null
    && formData.taxNumber !== null
    && formData.taxNumber.length > 32
  ) {
    formValidity.elements.taxNumber = 'Toto pole musí být maximálně 32 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.contactEmail === null
    && formData.contactEmail !== null
    && formData.contactEmail.length > 128
  ) {
    formValidity.elements.contactEmail = 'Toto pole musí být maximálně 128 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.contactEmail === null
    && formData.contactEmail !== null
    && !validator.isEmail(formData.contactEmail)
  ) {
    formValidity.elements.contactEmail = 'Toto pole musí být platná e-mailová adresa.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.contactPhoneNumber === null
    && formData.contactPhoneNumber !== null
    && formData.contactPhoneNumber.length > 32
  ) {
    formValidity.elements.contactPhoneNumber = 'Toto pole musí být maximálně 32 znaků dlouhé.';
    formValidity.isValid = false;
  }

  return formValidity;
};
