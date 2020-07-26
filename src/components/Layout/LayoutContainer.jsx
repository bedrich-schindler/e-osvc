import { connect } from 'react-redux';
import { logout } from '../../resources/auth';
import Component from './LayoutComponent';

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
