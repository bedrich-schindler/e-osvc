export const validateProject = (formData, initialFormValidity) => {
  const formValidity = { ...initialFormValidity };

  if (formData.name === null || formData.name === '') {
    formValidity.elements.name = 'Toto pole je povinné.';
    formValidity.isValid = false;
  }

  if (formValidity.elements.name === null && formData.name.length > 64) {
    formValidity.elements.name = 'Toto pole musí být maximálně 64 znaků dlouhé.';
    formValidity.isValid = false;
  }

  if (formData.client === null || formData.client === '') {
    formValidity.elements.client = 'Toto pole je povinné.';
    formValidity.isValid = false;
  }

  return formValidity;
};
