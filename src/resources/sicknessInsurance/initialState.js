import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addSicknessInsurance: {
      isPending: false,
    },
    deleteSicknessInsurance: {
      isPending: false,
    },
    editSicknessInsurance: {
      isPending: false,
    },
    getSicknessInsurance: {
      isPending: false,
    },
    getSicknessInsurances: {
      isPending: false,
    },
  },
  data: {
    addSicknessInsurance: null,
    deleteSicknessInsurance: null,
    editSicknessInsurance: null,
    getSicknessInsurance: null,
    getSicknessInsurances: null,
  },
});
