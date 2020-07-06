import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addTax: {
      isPending: false,
    },
    deleteTax: {
      isPending: false,
    },
    editTax: {
      isPending: false,
    },
    getTax: {
      isPending: false,
    },
    getTaxes: {
      isPending: false,
    },
  },
  data: {
    addTax: null,
    deleteTax: null,
    editTax: null,
    getTax: null,
    getTaxes: null,
  },
});
