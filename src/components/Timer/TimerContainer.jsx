import { connect } from 'react-redux';
import {
  getProjects,
  selectGetProjects,
  selectGetProjectsIsPending,
} from '../../resources/project';
import { selectIsOnline } from '../../resources/settings';
import {
  addTimeRecord,
  getTimeRecords,
  resetTimer,
  selectAddTimeRecordIsPending,
  selectIsTimerVisible,
  selectTimer,
  setIsTimerVisible,
  setTimer,
} from '../../resources/timeRecord';
import Component from './TimerComponent';

const mapStateToProps = (state) => ({
  addTimeRecordIsPending: selectAddTimeRecordIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  isOnline: selectIsOnline(state),
  isTimerVisible: selectIsTimerVisible(state),
  projects: selectGetProjects(state),
  timer: selectTimer(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTimeRecord: (data) => dispatch(addTimeRecord(data)),
  getProjects: () => dispatch(getProjects()),
  getTimeRecords: () => dispatch(getTimeRecords()),
  resetTimer: () => dispatch(resetTimer()),
  setIsTimerVisible: (data) => dispatch(setIsTimerVisible(data)),
  setTimer: (data) => dispatch(setTimer(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
