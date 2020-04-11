import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addClient: {
      isPending: false,
    },
    deleteClient: {
      isPending: false,
    },
    editClient: {
      isPending: false,
    },
    getClient: {
      isPending: false,
    },
    getClients: {
      isPending: false,
    },
  },
  data: {
    addClient: null,
    deleteClient: null,
    editClient: null,
    getClient: null,
    getClients: null,
  },
});
