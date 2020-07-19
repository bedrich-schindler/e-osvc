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
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles.scss';

class EditProjectDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        client: '',
        id: null,
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
    const { project } = this.props;

    this.setState({
      formData: {
        client: project.client.id,
        id: project.id,
        name: project.name,
      },
    });
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
      editProject,
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

    const response = await editProject(
      formData.id,
      {
        ...formData,
        client: { id: formData.client },
      },
    );

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
      clients,
      editProjectIsPending,
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
        <DialogTitle>Upravit projekt</DialogTitle>
        <DialogContent>
          {isFailed && (
            <Alert
              className={styles.alert}
              severity="error"
              variant="filled"
            >
              Úprava projektu se nezdařila.
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
              editProjectIsPending
              || formData.name.length === 0
              || !isOnline
            }
            onClick={this.saveHandler}
            startIcon={editProjectIsPending ? <CircularProgress size={14} /> : null}
          >
            Uložit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditProjectDialog.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  editProject: PropTypes.func.isRequired,
  editProjectIsPending: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProjectDialog;
