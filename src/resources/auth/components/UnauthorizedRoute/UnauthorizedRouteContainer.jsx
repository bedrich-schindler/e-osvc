import { connect } from 'react-redux';
import { selectToken } from '../../selectors';
import Component from './UnauthorizedRouteComponent';

const mapStateToProps = (state) => ({
  token: selectToken(state),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
