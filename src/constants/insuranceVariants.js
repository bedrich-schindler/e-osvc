export const INSURANCE_VARIANT_DEPOSIT = 'deposit';
export const INSURANCE_VARIANT_OVERPAYMENT = 'overpayment';
export const INSURANCE_VARIANT_PENALTY = 'penalty';
export const INSURANCE_VARIANT_UNDERPAYMENT = 'underpayment';

export const INSURANCE_VARIANTS = [
  INSURANCE_VARIANT_DEPOSIT,
  INSURANCE_VARIANT_OVERPAYMENT,
  INSURANCE_VARIANT_PENALTY,
  INSURANCE_VARIANT_UNDERPAYMENT,
];

export const getTranslatedInsuranceVariant = (variant) => {
  if (variant === INSURANCE_VARIANT_DEPOSIT) {
    return 'Záloha';
  }

  if (variant === INSURANCE_VARIANT_OVERPAYMENT) {
    return 'Přeplatek';
  }

  if (variant === INSURANCE_VARIANT_PENALTY) {
    return 'Penále';
  }

  if (variant === INSURANCE_VARIANT_UNDERPAYMENT) {
    return 'Nedoplatek';
  }

  return null;
};
