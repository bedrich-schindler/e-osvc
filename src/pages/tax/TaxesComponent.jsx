import PropTypes from 'prop-types';
import React from 'react';
import { InsurancePage } from '../../components/InsurancePage';
import { validateTax } from '../../resources/tax';

const TaxesComponent = ({
  addTax,
  addTaxIsPending,
  deleteTax,
  deleteTaxIsPending,
  editTax,
  editTaxIsPending,
  getTaxes,
  getTaxesIsPending,
  isOnline,
  taxes,
}) => (
  <InsurancePage
    addTitle="Přidat daň"
    addInsurance={addTax}
    addInsuranceIsPending={addTaxIsPending}
    deleteInsurance={deleteTax}
    deleteInsuranceIsPending={deleteTaxIsPending}
    editInsurance={editTax}
    editInsuranceIsPending={editTaxIsPending}
    editTitle="Upravit daň"
    getInsurances={getTaxes}
    getInsurancesIsPending={getTaxesIsPending}
    insurances={taxes}
    isOnline={isOnline}
    title="Daně"
    validateInsurance={validateTax}
  />
);

TaxesComponent.defaultProps = {
  taxes: null,
};

TaxesComponent.propTypes = {
  addTax: PropTypes.func.isRequired,
  addTaxIsPending: PropTypes.bool.isRequired,
  deleteTax: PropTypes.func.isRequired,
  deleteTaxIsPending: PropTypes.bool.isRequired,
  editTax: PropTypes.func.isRequired,
  editTaxIsPending: PropTypes.bool.isRequired,
  getTaxes: PropTypes.func.isRequired,
  getTaxesIsPending: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  taxes: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TaxesComponent;

