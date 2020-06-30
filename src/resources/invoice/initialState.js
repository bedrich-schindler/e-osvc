import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addInvoice: {
      isPending: false,
    },
    deleteInvoice: {
      isPending: false,
    },
    editInvoice: {
      isPending: false,
    },
    getInvoice: {
      isPending: false,
    },
    getInvoices: {
      isPending: false,
    },
  },
  data: {
    addInvoice: null,
    deleteInvoice: null,
    editInvoice: null,
    getInvoice: null,
    getInvoices: null,
  },
});
