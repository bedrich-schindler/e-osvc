import PropTypes from 'prop-types';
import React from 'react';
import { cloneDeep } from 'lodash';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Layout } from '../../components/Layout';
import { updateData} from '../../services/dataService';
import { validateUser } from '../../resources/user/validator';

const initialFormData = {
  bankAccount: null,
  cidNumber: null,
  city: null,
  email: null,
  firstName: null,
  lastName: null,
  plainPassword: null,
  postalCode: null,
  street: null,
  taxNumber: null,
  username: null,
};

class AccountComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: cloneDeep(initialFormData),
      formValidity: {
        elements: cloneDeep(initialFormData),
        isValid: true,
      },
      isFailed: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const { getUser } = this.props;

    getUser().then((response) => {
      const user = response.payload;

      this.setState({
        formData: {
          bankAccount: user.bankAccount,
          cidNumber: user.cidNumber,
          city: user.city,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          plainPassword: null,
          postalCode: user.postalCode,
          street: user.street,
          taxNumber: user.taxNumber ?? null,
          username: user.username,
        },
      });
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

  async saveHandler() {
    const { editUser } = this.props;
    const { formData } = this.state;

    const elements = cloneDeep(initialFormData);

    const formValidity = validateUser(formData, {
      elements,
      isValid: true,
    });

    this.setState({
      formValidity,
      isFailed: false,
    });

    if (!formValidity.isValid) {
      return;
    }

    const response = await editUser(formData);

    if (response.error) {
      const { violations } = response.payload.response;

      if (violations) {
        violations.forEach((violation) => {
          formValidity.elements = updateData(formValidity.elements, violation.propertyPath, violation.message)
        })
      }

      this.setState({
        formValidity,
        isFailed: true,
      });
    }
  }

  render() {
    const {
      editUserIsPending,
      getUserIsPending,
      user,
    } = this.props;
    const {
      formData,
      formValidity,
    } = this.state;

    return (
      <Layout
        actions={[
          <Button
            color="primary"
            disabled={editUserIsPending || getUserIsPending || !user}
            onClick={this.saveHandler}
            startIcon={editUserIsPending ? <CircularProgress size={14} /> : <SaveIcon />}
            variant="contained"
          >
            Uložit
          </Button>,
        ]}
        title="Účet"
      >
        {
          (getUserIsPending || !user)
            ? (
              <CircularProgress />
            ) : (
              <Grid
                container
                spacing={2}
                style={{ gridAutoRows: '1fr' }}
              >
                <Grid item xs={12} md={6}>
                  <Paper style={{ height: '100%' }}>
                    <Box p={3}>
                      <h2>
                        Přihlašovací údaje
                      </h2>
                      <TextField
                        autoFocus
                        autoComplete="given-name"
                        error={Boolean(formValidity.elements.firstName)}
                        fullWidth
                        helperText={formValidity.elements.firstName}
                        id="firstName"
                        label="Jméno"
                        margin="dense"
                        name="firstName"
                        onChange={this.changeHandler}
                        required
                        value={formData.firstName ?? ''}
                      />
                      <TextField
                        autoComplete="family-name"
                        error={Boolean(formValidity.elements.lastName)}
                        fullWidth
                        helperText={formValidity.elements.lastName}
                        id="lastName"
                        label="Příjmení"
                        margin="dense"
                        name="lastName"
                        onChange={this.changeHandler}
                        required
                        value={formData.lastName ?? ''}
                      />
                      <TextField
                        autoComplete="email"
                        error={Boolean(formValidity.elements.email)}
                        fullWidth
                        helperText={formValidity.elements.email}
                        id="email"
                        label="E-mail"
                        margin="dense"
                        name="email"
                        onChange={this.changeHandler}
                        required
                        type="email"
                        value={formData.email ?? ''}
                      />
                      <TextField
                        autoComplete="username"
                        disabled
                        error={Boolean(formValidity.elements.username)}
                        fullWidth
                        helperText={formValidity.elements.username}
                        id="username"
                        label="Uživatelské jméno"
                        margin="dense"
                        name="username"
                        onChange={this.changeHandler}
                        required
                        value={formData.username ?? ''}
                      />
                      <TextField
                        autoComplete="new-password"
                        error={Boolean(formValidity.elements.plainPassword)}
                        fullWidth
                        helperText={formValidity.elements.plainPassword}
                        id="plainPassword"
                        label="Heslo"
                        margin="dense"
                        name="plainPassword"
                        onChange={this.changeHandler}
                        type="password"
                        value={formData.plainPassword ?? ''}
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper style={{ height: '100%' }}>
                    <Box p={3}>
                      <h2>
                        Fakturační údaje
                      </h2>
                      <TextField
                        autoFocus
                        autoComplete="address-line1"
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
                        autoComplete="address-line2"
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
                        autoComplete="postal-code"
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
                        required
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
                        type="number"
                        value={formData.taxNumber ?? ''}
                      />
                      <TextField
                        error={Boolean(formValidity.elements.bankAccount)}
                        fullWidth
                        helperText={formValidity.elements.bankAccount}
                        id="bankAccount"
                        label="Číslo bankovního účtu"
                        margin="dense"
                        name="bankAccount"
                        onChange={this.changeHandler}
                        required
                        value={formData.bankAccount ?? ''}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )
        }
      </Layout>
    );
  }
};

AccountComponent.defaultProps = {
  user: null,
};

AccountComponent.propTypes = {
  editUser: PropTypes.func.isRequired,
  editUserIsPending: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserIsPending: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    bankAccount: PropTypes.string.isRequired,
    cidNumber: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    street: PropTypes.string.isRequired,
    taxNumber: PropTypes.number,
    username: PropTypes.string.isRequired,
  }),
};

export default AccountComponent;

