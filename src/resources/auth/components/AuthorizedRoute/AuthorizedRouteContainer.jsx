import { connect } from 'react-redux';
import { selectToken } from '../../selectors';
import Component from './AuthorizedRouteComponent';

const mapStateToProps = (state) => ({
  token: selectToken(state),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
