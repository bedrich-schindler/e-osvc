import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addSocialInsurance: {
      isPending: false,
    },
    deleteSocialInsurance: {
      isPending: false,
    },
    editSocialInsurance: {
      isPending: false,
    },
    getSocialInsurance: {
      isPending: false,
    },
    getSocialInsurances: {
      isPending: false,
    },
  },
  data: {
    addSocialInsurance: null,
    deleteSocialInsurance: null,
    editSocialInsurance: null,
    getSocialInsurance: null,
    getSocialInsurances: null,
  },
});
