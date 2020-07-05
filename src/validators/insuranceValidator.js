import { INSURANCE_VARIANTS } from '../constants/insuranceVariants';

export const validateInsurance = (formData, initialFormValidity) => {
  const formValidity = { ...initialFormValidity };

  ['date', 'amount', 'variant'].forEach((element) => {
    if (formData[element] === null || formData[element] === '') {
      formValidity.elements[element] = 'Toto pole je povinné.';
      formValidity.isValid = false;
    }
  });

  if (
    formValidity.elements.variant === null
    && !INSURANCE_VARIANTS.includes(formData.variant)
  ) {
    formValidity.elements.variant = 'Toto pole neobsahuje platnou hodnotu.';
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
