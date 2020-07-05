import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addHealthInsurance: {
      isPending: false,
    },
    deleteHealthInsurance: {
      isPending: false,
    },
    editHealthInsurance: {
      isPending: false,
    },
    getHealthInsurance: {
      isPending: false,
    },
    getHealthInsurances: {
      isPending: false,
    },
  },
  data: {
    addHealthInsurance: null,
    deleteHealthInsurance: null,
    editHealthInsurance: null,
    getHealthInsurance: null,
    getHealthInsurances: null,
  },
});
