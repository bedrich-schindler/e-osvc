import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles.scss';

class AddProjectDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        client: '',
        name: '',
      },
      formErrors: {
        client: null,
        name: null,
      },
      isFailed: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const { clients } = this.props;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        client: clients.length > 0 ? clients[0].id : '',
      },
    }));
  }

  changeHandler(e) {
    const eventTarget = e.target;
    let { value } = eventTarget;

    if (eventTarget.name === 'client') {
      value = parseInt(value, 10);
    }

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [eventTarget.name]: value,
      },
    }));
  }

  async saveHandler() {
    const {
      addProject,
      onClose,
    } = this.props;
    const { formData } = this.state;

    this.setState({
      formErrors: {
        client: null,
        name: null,
      },
      isFailed: false,
    });

    const response = await addProject({
      ...formData,
      client: { id: formData.client },
    });

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
      addProjectIsPending,
      clients,
      isOnline,
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
        <DialogTitle>Přidat projekt</DialogTitle>
        <DialogContent>
          {isFailed && (
            <Alert
              className={styles.alert}
              severity="error"
              variant="filled"
            >
              Přidání projektu se nezdařilo.
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
          <Box mt={2}>
            <FormControl
              className="mt-5"
              error={Boolean(formErrors.client)}
              fullWidth
              required
            >
              <InputLabel htmlFor="client">
                Klient
              </InputLabel>
              <Select
                fullWidth
                id="client"
                margin="dense"
                name="client"
                onChange={this.changeHandler}
                required
                value={formData.client}
              >
                {clients.map((client) => (
                  <MenuItem
                    key={client.id}
                    value={client.id}
                  >
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formErrors.client) && (
                <FormHelperText>{formErrors.client}</FormHelperText>
              )}
            </FormControl>
          </Box>
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
              addProjectIsPending
              || formData.name.length === 0
              || !isOnline
            }
            onClick={this.saveHandler}
            startIcon={addProjectIsPending ? <CircularProgress size={14} /> : null}
          >
            Uložit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddProjectDialog.propTypes = {
  addProject: PropTypes.func.isRequired,
  addProjectIsPending: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isOnline: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddProjectDialog;
