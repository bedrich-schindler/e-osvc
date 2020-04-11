import { connect } from 'react-redux';
import {
  addClient,
  deleteClient,
  editClient,
  getClients,
  selectAddClientIsPending,
  selectDeleteClientIsPending,
  selectEditClientIsPending,
  selectGetClients,
  selectGetClientsIsPending,
} from '../../resources/client';
import Component from './ClientsComponent';

const mapStateToProps = (state) => ({
  addClientIsPending: selectAddClientIsPending(state),
  clients: selectGetClients(state),
  deleteClientIsPending: selectDeleteClientIsPending(state),
  editClientIsPending: selectEditClientIsPending(state),
  getClientsIsPending: selectGetClientsIsPending(state),
});

const mapDispatchToProps = (dispatch) => ({
  addClient: (data) => dispatch(addClient(data)),
  deleteClient: (userId) => dispatch(deleteClient(userId)),
  editClient: (userId, data) => dispatch(editClient(userId, data)),
  getClients: () => dispatch(getClients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
