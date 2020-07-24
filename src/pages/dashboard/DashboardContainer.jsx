import { connect } from 'react-redux';
import {
  getStatistics,
  selectGetStatistics,
  selectGetStatisticsIsPending,
} from '../../resources/statistics';
import Component from './DashboardComponent';

const mapStateToProps = (state) => ({
  getStatisticsIsPending: selectGetStatisticsIsPending(state),
  statistics: selectGetStatistics(state),
});

const mapDispatchToProps = (dispatch) => ({
  getStatistics: () => dispatch(getStatistics()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
