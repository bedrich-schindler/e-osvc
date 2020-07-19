import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { cloneDeep } from 'lodash';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { validateTimeRecord } from '../../resources/timeRecord';
import { updateData } from '../../services/dataService';

const initialFormData = {
  endDateTime: null,
  startDateTime: null,
  project: { id: null },
  note: null,
};

class TimeRecordDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: cloneDeep(initialFormData),
      formValidity: {
        elements: cloneDeep(initialFormData),
        isValid: true,
      },
    };

    this.changeEndDateTimeHandler = this.changeEndDateTimeHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeStartDateTimeHandler = this.changeStartDateTimeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const { timeRecord } = this.props;

    if (timeRecord === null) {
      return;
    }

    this.setState({
      formData: timeRecord,
    });
  }

  changeHandler(e) {
    const eventTarget = e.target;
    let {
      name,
      value,
    } = eventTarget;

    this.setState((prevState) => ({
      formData: updateData(prevState.formData, name, value),
    }));
  }

  changeEndDateTimeHandler(value) {
    return this.changeHandler({
      target: {
        name: 'endDateTime',
        value: value ? new Date(value) : null,
      },
    })
  }

  changeStartDateTimeHandler(value) {
    return this.changeHandler({
      target: {
        name: 'startDateTime',
        value: value ? new Date(value) : null,
      },
    })
  }

  async saveHandler() {
    const {
      onClose,
      saveTimeRecord,
    } = this.props;
    const { formData } = this.state;

    const formValidity = validateTimeRecord(formData, {
      elements: cloneDeep(initialFormData),
      isValid: true,
    });

    this.setState({ formValidity });

    if (!formValidity.isValid) {
      return;
    }

    const response = await saveTimeRecord(formData);

    if (response.error) {
      const { violations } = response.payload.response;

      if (violations) {
        violations.forEach((violation) => {
          formValidity.elements = updateData(
            formValidity.elements,
            violation.propertyPath,
            violation.message,
          );
        })
      }

      this.setState({ formValidity });

      return;
    }

    onClose();
  }

  render() {
    const {
      isOnline,
      onClose,
      projects,
      saveTimeRecordIsPending,
      title,
    } = this.props;
    const {
      formData,
      formValidity,
     } = this.state;

    return (
      <Dialog
        fullWidth
        onClose={onClose}
        open
        maxWidth="xs"
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <KeyboardDateTimePicker
            autoFocus
            disableToolbar
            error={Boolean(formValidity.elements.startDateTime)}
            fullWidth
            helperText={formValidity.elements.startDateTime}
            variant="inline"
            format="dd. MM. yyyy HH:mm:ss"
            margin="normal"
            id="startDateTime"
            label="Od"
            value={formData.startDateTime}
            onChange={this.changeStartDateTimeHandler}
            required
            KeyboardButtonProps={{
              'aria-label': 'Změnit datum',
            }}
          />
          <KeyboardDateTimePicker
            disableToolbar
            error={Boolean(formValidity.elements.endDateTime)}
            fullWidth
            helperText={formValidity.elements.endDateTime}
            variant="inline"
            format="dd. MM. yyyy HH:mm:ss"
            margin="normal"
            id="endDateTime"
            label="Do"
            value={formData.endDateTime}
            onChange={this.changeEndDateTimeHandler}
            required
            KeyboardButtonProps={{
              'aria-label': 'Změnit datum',
            }}
          />
          <FormControl
            error={Boolean(formValidity.elements.project.id)}
            fullWidth
            required
          >
            <InputLabel htmlFor="project.id">
              Projekt
            </InputLabel>
            <Select
              fullWidth
              id="project.id"
              margin="dense"
              name="project.id"
              onChange={this.changeHandler}
              required
              value={formData.project.id ?? ''}
            >
              {projects.map((project) => (
                <MenuItem
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formValidity.elements.project.id) && (
              <FormHelperText>{formValidity.elements.project.id}</FormHelperText>
            )}
          </FormControl>
          <TextField
            error={Boolean(formValidity.elements.note)}
            fullWidth
            helperText={formValidity.elements.note}
            id="note"
            label="Poznámka"
            margin="dense"
            name="note"
            onChange={this.changeHandler}
            value={formData.note?? ''}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={onClose}
          >
            Zrušit
          </Button>
          <Button
            color="primary"
            disabled={saveTimeRecordIsPending || !isOnline}
            onClick={this.saveHandler}
            startIcon={saveTimeRecordIsPending ? <CircularProgress size={14} /> : null}
          >
            Uložit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TimeRecordDialog.defaultProps = {
  projects: null,
  timeRecord: null,
};

TimeRecordDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  saveTimeRecord: PropTypes.func.isRequired,
  saveTimeRecordIsPending: PropTypes.bool.isRequired,
  timeRecord: PropTypes.shape({
    endDateTime: PropTypes.object.isRequired,
    note: PropTypes.string,
    project: PropTypes.shape({
      id: PropTypes.number,
    }),
    startDateTime: PropTypes.object.isRequired,
  }),
  title: PropTypes.string.isRequired,
};

export default TimeRecordDialog;
