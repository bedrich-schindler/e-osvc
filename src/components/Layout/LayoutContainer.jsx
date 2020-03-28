import { connect } from 'react-redux';
import { logout } from '../../resources/auth';
import Component from './LayoutComponent';

const mapStateToProps = () => ({
  user: {
    name: 'N/A',
  },
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
