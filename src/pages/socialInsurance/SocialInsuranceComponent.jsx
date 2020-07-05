import PropTypes from 'prop-types';
import React from 'react';
import { Layout } from '../../components/Layout';
import { InsurancePage } from '../../components/InsurancePage';
import { validateSocialInsurance } from '../../resources/socialInsurance';

const SocialInsuranceComponent = ({
  addSocialInsurance,
  addSocialInsuranceIsPending,
  deleteSocialInsurance,
  deleteSocialInsuranceIsPending,
  editSocialInsurance,
  editSocialInsuranceIsPending,
  getSocialInsurances,
  getSocialInsurancesIsPending,
  socialInsurances,
}) => (
  <Layout>
    <InsurancePage
      addTitle="Přidat sociální pojištění"
      addInsurance={addSocialInsurance}
      addInsuranceIsPending={addSocialInsuranceIsPending}
      deleteInsurance={deleteSocialInsurance}
      deleteInsuranceIsPending={deleteSocialInsuranceIsPending}
      editInsurance={editSocialInsurance}
      editInsuranceIsPending={editSocialInsuranceIsPending}
      editTitle="Upravit sociální pojištění"
      getInsurances={getSocialInsurances}
      getInsurancesIsPending={getSocialInsurancesIsPending}
      insurances={socialInsurances}
      title="Sociální pojištění"
      validateInsurance={validateSocialInsurance}
    />
  </Layout>
);

SocialInsuranceComponent.defaultProps = {
  socialInsurances: null,
};

SocialInsuranceComponent.propTypes = {
  addSocialInsurance: PropTypes.func.isRequired,
  addSocialInsuranceIsPending: PropTypes.bool.isRequired,
  deleteSocialInsurance: PropTypes.func.isRequired,
  deleteSocialInsuranceIsPending: PropTypes.bool.isRequired,
  editSocialInsurance: PropTypes.func.isRequired,
  editSocialInsuranceIsPending: PropTypes.bool.isRequired,
  getSocialInsurances: PropTypes.func.isRequired,
  getSocialInsurancesIsPending: PropTypes.bool.isRequired,
  socialInsurances: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SocialInsuranceComponent;

