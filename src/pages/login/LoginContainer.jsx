import { connect } from 'react-redux';
import {
  login,
  selectLoginIsPending,
  selectToken,
} from '../../resources/auth';
import { selectIsOnline } from '../../resources/settings';
import Component from './LoginComponent';

const mapStateToProps = (state) => ({
  isOnline: selectIsOnline(state),
  loginIsPending: selectLoginIsPending(state),
  token: selectToken(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (...params) => dispatch(login(...params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
