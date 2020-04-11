import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles.scss';

class EditClientDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        id: null,
        name: '',
      },
      formErrors: {
        name: null,
      },
      isFailed: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const { client } = this.props;

    this.setState({
      formData: {
        id: client.id,
        name: client.name,
      },
    });
  }

  changeHandler(e) {
    const eventTarget = e.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [eventTarget.id]: eventTarget.value,
      },
    }));
  }

  async saveHandler() {
    const {
      editClient,
      onClose,
    } = this.props;
    const { formData } = this.state;

    this.setState({
      formErrors: {
        name: null,
      },
      isFailed: false,
    });

    const response = await editClient(formData.id, formData);

    if (response.error) {
      const newFormErrors = {};

      Object.keys(formData).forEach((attr) => {
        const { violations } = response.payload.response;
        const foundViolation = violations.find((violation) => violation.propertyPath === attr);

        if (foundViolation) {
          newFormErrors[attr] = foundViolation.message;
        } else {
          newFormErrors[attr] = null;
        }
      });

      this.setState({
        formErrors: newFormErrors,
        isFailed: true,
      });

      return;
    }

    onClose(true);
  }

  render() {
    const {
      editClientIsPending,
      onClose,
    } = this.props;
    const {
      formData,
      formErrors,
      isFailed,
    } = this.state;

    return (
      <Dialog
        fullWidth
        onClose={onClose}
        open
        maxWidth="xs"
      >
        <DialogTitle>Upravit klienta</DialogTitle>
        <DialogContent>
          {isFailed && (
            <Alert
              className={styles.alert}
              severity="error"
              variant="filled"
            >
              Úprava klienta se nezdařila.
            </Alert>
          )}
          <TextField
            autoFocus
            error={Boolean(formErrors.name)}
            fullWidth
            helperText={formErrors.name}
            id="name"
            label="Jméno"
            margin="dense"
            name="name"
            onChange={this.changeHandler}
            required
            type="text"
            value={formData.name}
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
            disabled={
              editClientIsPending
              || formData.name.length === 0
            }
            onClick={this.saveHandler}
            startIcon={editClientIsPending ? <CircularProgress size={14} /> : null}
          >
            Uložit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditClientDialog.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  editClient: PropTypes.func.isRequired,
  editClientIsPending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditClientDialog;