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
        cidNumber: '',
        city: '',
        contactEmail: '',
        contactPhoneNumber: '',
        id: null,
        name: '',
        postalCode: '',
        street: '',
        taxNumber: '',
      },
      formErrors: {
        cidNumber: null,
        city: null,
        contactEmail: null,
        contactPhoneNumber: null,
        name: null,
        postalCode: null,
        street: null,
        taxNumber: null,
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
        cidNumber: client.cidNumber ? client.cidNumber.toString() : '',
        city: client.city,
        contactEmail: client.contactEmail || '',
        contactPhoneNumber: client.contactPhoneNumber || '',
        id: client.id,
        name: client.name,
        postalCode: client.postalCode,
        street: client.street,
        taxNumber: client.taxNumber ? client.taxNumber.toString() : '',
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
        cidNumber: null,
        city: null,
        contactEmail: null,
        contactPhoneNumber: null,
        name: null,
        postalCode: null,
        street: null,
        taxNumber: null,
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
          <TextField
            error={Boolean(formErrors.street)}
            fullWidth
            helperText={formErrors.street}
            id="street"
            label="Ulice"
            margin="dense"
            name="street"
            onChange={this.changeHandler}
            required
            value={formData.street}
          />
          <TextField
            error={Boolean(formErrors.city)}
            fullWidth
            helperText={formErrors.city}
            id="city"
            label="Město"
            margin="dense"
            name="city"
            onChange={this.changeHandler}
            required
            value={formData.city}
          />
          <TextField
            error={Boolean(formErrors.postalCode)}
            fullWidth
            helperText={formErrors.postalCode}
            id="postalCode"
            label="PSČ"
            margin="dense"
            name="postalCode"
            onChange={this.changeHandler}
            required
            type="number"
            value={formData.postalCode}
          />
          <TextField
            error={Boolean(formErrors.cidNumber)}
            fullWidth
            helperText={formErrors.cidNumber}
            id="cidNumber"
            label="IČ"
            margin="dense"
            name="cidNumber"
            onChange={this.changeHandler}
            required
            type="number"
            value={formData.cidNumber}
          />
          <TextField
            error={Boolean(formErrors.taxNumber)}
            fullWidth
            helperText={formErrors.taxNumber}
            id="taxNumber"
            label="DIČ"
            margin="dense"
            name="taxNumber"
            onChange={this.changeHandler}
            type="number"
            value={formData.taxNumber}
          />
          <TextField
            error={Boolean(formErrors.contactEmail)}
            fullWidth
            helperText={formErrors.contactEmail}
            id="contactEmail"
            label="Kontaktní e-mail"
            margin="dense"
            name="contactEmail"
            onChange={this.changeHandler}
            required
            type="email"
            value={formData.contactEmail}
          />
          <TextField
            error={Boolean(formErrors.contactPhoneNumber)}
            fullWidth
            helperText={formErrors.contactPhoneNumber}
            id="contactPhoneNumber"
            label="Kontaktní telefon"
            margin="dense"
            name="contactPhoneNumber"
            onChange={this.changeHandler}
            required
            value={formData.contactPhoneNumber}
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
    cidNumber: PropTypes.number,
    city: PropTypes.string.isRequired,
    contactEmail: PropTypes.string,
    contactPhoneNumber: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    street: PropTypes.string.isRequired,
    taxNumber: PropTypes.number,
  }).isRequired,
  editClient: PropTypes.func.isRequired,
  editClientIsPending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditClientDialog;
