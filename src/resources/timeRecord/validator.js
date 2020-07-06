export const validateTimeRecord = (formData, initialFormValidity) => {
  const formValidity = { ...initialFormValidity };

  ['endDateTime', 'startDateTime'].forEach((element) => {
    if (formData[element] === null || formData[element] === '') {
      formValidity.elements[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  if (formData.project.id === null || formData.project.id === '') {
    formValidity.elements.project.id = 'Toto pole je povinné.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.note === null
    && formData.note !== null
    && formData.note.length > 256
  ) {
    formValidity.elements.note = 'Toto pole musí být maximálně 256 znaků dlouhé.';
    formValidity.isValid = false;
  }

  return formValidity;
};
