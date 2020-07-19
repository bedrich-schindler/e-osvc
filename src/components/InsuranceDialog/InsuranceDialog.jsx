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
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  INSURANCE_VARIANTS,
  getTranslatedInsuranceVariant,
} from '../../constants/insuranceVariants';
import { updateData } from '../../services/dataService';

const initialFormData = {
  amount: null,
  date: null,
  note: null,
  variant: null,
};

class InsuranceDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: cloneDeep(initialFormData),
      formValidity: {
        elements: cloneDeep(initialFormData),
        isValid: true,
      },
    };

    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const { insurance } = this.props;

    if (insurance === null) {
      return;
    }

    this.setState({
      formData: insurance,
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

  changeDateHandler(value) {
    return this.changeHandler({
      target: {
        name: 'date',
        value: value ? new Date(value) : null,
      },
    })
  }

  async saveHandler() {
    const {
      onClose,
      saveInsurance,
      validateInsurance,
    } = this.props;
    const { formData } = this.state;

    const formValidity = validateInsurance(formData, {
      elements: cloneDeep(initialFormData),
      isValid: true,
    });

    this.setState({ formValidity });

    if (!formValidity.isValid) {
      return;
    }

    const response = await saveInsurance(formData);

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
      saveInsuranceIsPending,
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
          <KeyboardDatePicker
            autoFocus
            disableToolbar
            error={Boolean(formValidity.elements.date)}
            fullWidth
            helperText={formValidity.elements.date}
            variant="inline"
            format="dd. MM. yyyy"
            margin="normal"
            id="date"
            label="Datum"
            value={formData.date}
            onChange={this.changeDateHandler}
            required
            KeyboardButtonProps={{
              'aria-label': 'Změnit datum',
            }}
          />
          <TextField
            error={Boolean(formValidity.elements.amount)}
            fullWidth
            helperText={formValidity.elements.amount}
            id="amount"
            label="Částka"
            margin="dense"
            name="amount"
            onChange={this.changeHandler}
            required
            type="number"
            value={formData.amount ?? ''}
          />
          <FormControl
            error={Boolean(formValidity.elements.variant)}
            fullWidth
            required
          >
            <InputLabel htmlFor="variant">
              Varianta
            </InputLabel>
            <Select
              fullWidth
              id="variant"
              margin="dense"
              name="variant"
              onChange={this.changeHandler}
              required
              value={formData.variant ?? ''}
            >
              {INSURANCE_VARIANTS.map((variant) => (
                <MenuItem
                  key={variant}
                  value={variant}
                >
                  {getTranslatedInsuranceVariant(variant)}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formValidity.elements.variant) && (
              <FormHelperText>{formValidity.elements.variant}</FormHelperText>
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
            disabled={saveInsuranceIsPending || !isOnline}
            onClick={this.saveHandler}
            startIcon={saveInsuranceIsPending ? <CircularProgress size={14} /> : null}
          >
            Uložit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

InsuranceDialog.defaultProps = {
  insurance: null,
};

InsuranceDialog.propTypes = {
  insurance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    note: PropTypes.string,
    variant: PropTypes.oneOf(INSURANCE_VARIANTS).isRequired,
  }),
  isOnline: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  saveInsurance: PropTypes.func.isRequired,
  saveInsuranceIsPending: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  validateInsurance: PropTypes.func.isRequired,
};

export default InsuranceDialog;
