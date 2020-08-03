import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React from 'react';
import StopArrowIcon from '@material-ui/icons/Stop';
import TimerIcon from '@material-ui/icons/Timer';
import { TimeRecordDialog } from '../TimeRecordDialog';
import { getTimeDifferenceString } from '../../services/dateTimeService';
import styles from './styles.scss';

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addDialogData: null,
      isAddDialogOpened: false,
    };

    this.timer = null;

    this.toggleButton = this.toggleButton.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);

    if (IS_ELECTRON) {
      import('../../services/timerService').then((timerService) => {
        timerService.handleStopTimer(this.stopTimer);

        return timerService;
      });
    }
  }

  componentDidMount() {
    const {
      setIsTimerVisible,
      timer,
    } = this.props;

    if (timer !== null) {
      setIsTimerVisible(true);
      this.timer = setInterval(() => {
        this.forceUpdate();
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startTimer() {
    const { setTimer } = this.props;

    setTimer(Date.now());
    this.timer = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  stopTimer() {
    const {
      getProjects,
      timer,
    } = this.props;

    getProjects().then((response) => {
      this.setState({
        addDialogData: {
          endDateTime: new Date(),
          note: null,
          project: { id: null },
          startDateTime: new Date(timer),
        },
        isAddDialogOpened: true,
      });

      return response;
    });
  }

  resetTimer() {
    const { resetTimer } = this.props;

    resetTimer();
    clearInterval(this.timer);
  }

  toggleButton() {
    const {
      isTimerVisible,
      setIsTimerVisible,
    } = this.props;

    setIsTimerVisible(!isTimerVisible);
  }

  render() {
    const {
      addTimeRecord,
      addTimeRecordIsPending,
      getProjectsIsPending,
      getTimeRecords,
      isOnline,
      isTimerVisible,
      projects,
      timer,
    } = this.props;
    const {
      addDialogData,
      isAddDialogOpened,
    } = this.state;

    if (!isTimerVisible) {
      return (
        <Fab
          className={styles.rootButton}
          color={timer ? 'primary' : 'default'}
          onClick={this.toggleButton}
          title="Zobrazit časovač"
        >
          <TimerIcon />
        </Fab>
      );
    }

    return (
      <>
        <Paper className={styles.root}>
          <div className={styles.bar}>
            <div className={styles.startStopIcon}>
              {
                timer
                  ? (
                    <IconButton
                      disabled={!isOnline}
                      onClick={this.stopTimer}
                      size="small"
                      title="Zastavit časovač"
                    >
                      {
                        getProjectsIsPending
                          ? <CircularProgress size={24} color="inherit" />
                          : <StopArrowIcon />
                      }
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={this.startTimer}
                      size="small"
                      title="Spustit časovač"
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  )
              }
            </div>
            <div>
              {getTimeDifferenceString(timer, Date.now())}
            </div>
            {timer && (
              <div className={styles.removeIcon}>
                <IconButton
                  onClick={this.resetTimer}
                  size="small"
                  title="Resetovat časovač"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
          <Fab
            className={styles.button}
            color="default"
            onClick={this.toggleButton}
            title="Skrýt časovač"
          >
            <CloseIcon />
          </Fab>
        </Paper>
        {isAddDialogOpened && (
          <TimeRecordDialog
            isOnline={isOnline}
            onClose={() => {
              this.setState({ isAddDialogOpened: false });
            }}
            projects={projects}
            saveTimeRecord={async (data) => {
              const response = await addTimeRecord(data);
              getTimeRecords();
              this.resetTimer();

              return response;
            }}
            saveTimeRecordIsPending={addTimeRecordIsPending}
            timeRecord={addDialogData}
            title="Přidat odpracovaný čas"
            validateTimeRecord={{}}
          />
        )}
      </>
    );
  }
}

TimerComponent.defaultProps = {
  projects: null,
  timer: null,
};

TimerComponent.propTypes = {
  addTimeRecord: PropTypes.func.isRequired,
  addTimeRecordIsPending: PropTypes.bool.isRequired,
  getProjects: PropTypes.func.isRequired,
  getProjectsIsPending: PropTypes.bool.isRequired,
  getTimeRecords: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
  isTimerVisible: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  resetTimer: PropTypes.func.isRequired,
  setIsTimerVisible: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  timer: PropTypes.number,
};

export default TimerComponent;
