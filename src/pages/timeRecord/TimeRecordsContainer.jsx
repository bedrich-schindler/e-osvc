import { connect } from 'react-redux';
import {
  getProjects,
  selectGetProjects,
  selectGetProjectsIsPending,
} from '../../resources/project';
import { selectIsOnline } from '../../resources/settings';
import {
  addTimeRecord,
  deleteTimeRecord,
  editTimeRecord,
  getTimeRecords,
  selectAddTimeRecordIsPending,
  selectDeleteTimeRecordIsPending,
  selectEditTimeRecordIsPending,
  selectGetTimeRecords,
  selectGetTimeRecordsIsPending,
} from '../../resources/timeRecord';
import Component from './TimeRecordsComponent';

const mapStateToProps = (state) => ({
  addTimeRecordIsPending: selectAddTimeRecordIsPending(state),
  deleteTimeRecordIsPending: selectDeleteTimeRecordIsPending(state),
  editTimeRecordIsPending: selectEditTimeRecordIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  getTimeRecordsIsPending: selectGetTimeRecordsIsPending(state),
  isOnline: selectIsOnline(state),
  projects: selectGetProjects(state),
  timeRecords: selectGetTimeRecords(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTimeRecord: (data) => dispatch(addTimeRecord(data)),
  deleteTimeRecord: (userId) => dispatch(deleteTimeRecord(userId)),
  editTimeRecord: (userId, data) => dispatch(editTimeRecord(userId, data)),
  getProjects: () => dispatch(getProjects()),
  getTimeRecords: () => dispatch(getTimeRecords()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
