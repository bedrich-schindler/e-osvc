import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { cloneDeep } from 'lodash';
import { validateClient } from '../../../../resources/client/validator';
import { updateData } from '../../../../services/dataService';

const initialFormData = {
  cidNumber: null,
  city: null,
  contactEmail: null,
  contactPhoneNumber: null,
  name: null,
  postalCode: null,
  street: null,
  taxNumber: null,
};

class AddClientDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: cloneDeep(initialFormData),
      formValidity: {
        elements: cloneDeep(initialFormData),
        isValid: true,
      },
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  changeHandler(e) {
    const eventTarget = e.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [eventTarget.name]: eventTarget.value !== '' ? eventTarget.value : null,
      },
    }));
  }

  async saveHandler() {
    const {
      addClient,
      onClose,
    } = this.props;
    const { formData } = this.state;

    const formValidity = validateClient(formData, {
      elements: cloneDeep(initialFormData),
      isValid: true,
    });

    this.setState({ formValidity });

    if (!formValidity.isValid) {
      return;
    }

    const response = await addClient(formData);

    if (response.error) {
      const { violations } = response.payload.response;

      if (violations) {
        violations.forEach((violation) => {
          formValidity.elements = updateData(
            formValidity.elements,
            violation.propertyPath,
            violation.message,
          );
        });
      }

      this.setState({ formValidity });

      return;
    }

    onClose(true);
  }

  render() {
    const {
      addClientIsPending,
      isOnline,
      onClose,
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
        <DialogTitle>Přidat klienta</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={Boolean(formValidity.elements.name)}
            fullWidth
            helperText={formValidity.elements.name}
            id="name"
            label="Jméno"
            margin="dense"
            name="name"
            onChange={this.changeHandler}
            required
            type="text"
            value={formData.name ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.street)}
            fullWidth
            helperText={formValidity.elements.street}
            id="street"
            label="Ulice"
            margin="dense"
            name="street"
            onChange={this.changeHandler}
            required
            value={formData.street ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.city)}
            fullWidth
            helperText={formValidity.elements.city}
            id="city"
            label="Město"
            margin="dense"
            name="city"
            onChange={this.changeHandler}
            required
            value={formData.city ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.postalCode)}
            fullWidth
            helperText={formValidity.elements.postalCode}
            id="postalCode"
            label="PSČ"
            margin="dense"
            name="postalCode"
            onChange={this.changeHandler}
            required
            type="number"
            value={formData.postalCode ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.cidNumber)}
            fullWidth
            helperText={formValidity.elements.cidNumber}
            id="cidNumber"
            label="IČ"
            margin="dense"
            name="cidNumber"
            onChange={this.changeHandler}
            type="number"
            value={formData.cidNumber ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.taxNumber)}
            fullWidth
            helperText={formValidity.elements.taxNumber}
            id="taxNumber"
            label="DIČ"
            margin="dense"
            name="taxNumber"
            onChange={this.changeHandler}
            value={formData.taxNumber ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.contactEmail)}
            fullWidth
            helperText={formValidity.elements.contactEmail}
            id="contactEmail"
            label="Kontaktní e-mail"
            margin="dense"
            name="contactEmail"
            onChange={this.changeHandler}
            type="email"
            value={formData.contactEmail ?? ''}
          />
          <TextField
            error={Boolean(formValidity.elements.contactPhoneNumber)}
            fullWidth
            helperText={formValidity.elements.contactPhoneNumber}
            id="contactPhoneNumber"
            label="Kontaktní telefon"
            margin="dense"
            name="contactPhoneNumber"
            onChange={this.changeHandler}
            value={formData.contactPhoneNumber ?? ''}
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
            disabled={addClientIsPending || !isOnline}
            onClick={this.saveHandler}
            startIcon={addClientIsPending ? <CircularProgress size={14} /> : null}
          >
            Uložit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddClientDialog.propTypes = {
  addClient: PropTypes.func.isRequired,
  addClientIsPending: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddClientDialog;
