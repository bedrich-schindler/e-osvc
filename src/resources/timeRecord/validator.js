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
    formValidity.elements.endDateTime === null
    && formData.endDateTime instanceof Date
    && Number.isNaN(formData.endDateTime.valueOf())
  ) {
    formValidity.elements.endDateTime = 'Toto pole neobsahuje platný datum.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.startDateTime === null
    && formData.startDateTime instanceof Date
    && Number.isNaN(formData.startDateTime.valueOf())
  ) {
    formValidity.elements.startDateTime = 'Toto pole neobsahuje platný datum.';
    formValidity.isValid = false;
  }

  if (
    formValidity.elements.startDateTime === null
    && formValidity.elements.endDateTime === null
    && formData.startDateTime.valueOf() > formData.endDateTime.valueOf()
  ) {
    formValidity.elements.endDateTime = 'Toto pole musí být větší než datum začatku.';
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
