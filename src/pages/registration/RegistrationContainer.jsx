import { connect } from 'react-redux';
import {
  addUser,
  selectAddUser,
  selectAddUserIsPending,
} from '../../resources/user';
import Component from './RegistrationComponent';

const mapStateToProps = (state) => ({
  addUser: selectAddUser(state),
  addUserIsPending: selectAddUserIsPending(state),
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (data) => dispatch(addUser(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
