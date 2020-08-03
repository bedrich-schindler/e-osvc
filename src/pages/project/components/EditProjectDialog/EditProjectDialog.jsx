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
import { cloneDeep } from 'lodash';
import { validateProject } from '../../../../resources/project/validator';
import { updateData } from '../../../../services/dataService';

const initialFormData = {
  client: null,
  id: null,
  name: null,
};

class EditProjectDialog extends React.Component {
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
    } else {
      value = value !== '' ? value : null;
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

    const formValidity = validateProject(formData, {
      elements: cloneDeep(initialFormData),
      isValid: true,
    });

    this.setState({ formValidity });

    if (!formValidity.isValid) {
      return;
    }

    const response = await editProject(
      formData.id,
      {
        ...formData,
        client: { id: formData.client },
      },
    );

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
      clients,
      editProjectIsPending,
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
        <DialogTitle>Upravit projekt</DialogTitle>
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
          <Box mt={2}>
            <FormControl
              className="mt-5"
              error={Boolean(formValidity.elements.client)}
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
                value={formData.client ?? ''}
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
              {Boolean(formValidity.elements.client) && (
                <FormHelperText>{formValidity.elements.client}</FormHelperText>
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
            disabled={editProjectIsPending || !isOnline}
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
