import PropTypes from 'prop-types';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './styles.scss';

const LoginLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to={routes.login.path} {...props} />
));

class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        firstName: '',
        lastName: '',
        plainPassword: '',
        username: '',
      },
      formErrors: {
        email: null,
        firstName: null,
        lastName: null,
        plainPassword: null,
        username: null,
      },
      isRegistrationFailed: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
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

  async registerHandler() {
    const { addUser } = this.props;
    const { formData } = this.state;

    this.setState({
      formErrors: {
        email: null,
        firstName: null,
        lastName: null,
        plainPassword: null,
        username: null,
      },
      isRegistrationFailed: false,
      isRegistrationSuccessful: false,
    });

    const response = await addUser(formData);

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
        isRegistrationFailed: true,
      });

      return;
    }

    this.setState({
      isRegistrationSuccessful: true,
    });
  }

  render() {
    const { addUserIsPending } = this.props;
    const {
      formData,
      formErrors,
      isRegistrationFailed,
      isRegistrationSuccessful,
    } = this.state;

    return (
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <Typography
            className={styles.title}
            component="h1"
            variant="h5"
          >
            eOSVČ – Vytvoření účtu
          </Typography>
          {isRegistrationFailed && (
            <Alert
              className={styles.alert}
              severity="error"
              variant="filled"
            >
              Vytvoření účtu se nezdařilo.
            </Alert>
          )}
          {isRegistrationSuccessful && (
            <Alert
              className={styles.alert}
              severity="success"
              variant="filled"
            >
              Váš účet byl vytvořen.
            </Alert>
          )}
          <form className={styles.form}>
            <TextField
              autoFocus
              autoComplete="given-name"
              error={Boolean(formErrors.firstName)}
              fullWidth
              helperText={formErrors.firstName}
              id="firstName"
              label="Jméno"
              margin="normal"
              name="firstName"
              onChange={this.changeHandler}
              required
              value={formData.firstName}
              variant="outlined"
            />
            <TextField
              autoComplete="family-name"
              error={Boolean(formErrors.lastName)}
              fullWidth
              helperText={formErrors.lastName}
              id="lastName"
              label="Příjmení"
              margin="normal"
              name="lastName"
              onChange={this.changeHandler}
              required
              value={formData.lastName}
              variant="outlined"
            />
            <TextField
              autoComplete="email"
              error={Boolean(formErrors.email)}
              fullWidth
              helperText={formErrors.email}
              id="email"
              label="E-mail"
              margin="normal"
              name="email"
              onChange={this.changeHandler}
              required
              type="email"
              value={formData.email}
              variant="outlined"
            />
            <TextField
              autoComplete="username"
              error={Boolean(formErrors.plainPassword)}
              fullWidth
              helperText={formErrors.plainPassword}
              id="username"
              label="Uživatelské jméno"
              margin="normal"
              name="username"
              onChange={this.changeHandler}
              required
              value={formData.username}
              variant="outlined"
            />
            <TextField
              autoComplete="new-password"
              error={Boolean(formErrors.plainPassword)}
              fullWidth
              helperText={formErrors.plainPassword}
              id="plainPassword"
              label="Heslo"
              margin="normal"
              name="plainPassword"
              onChange={this.changeHandler}
              required
              type="password"
              value={formData.plainPassword}
              variant="outlined"
            />
            <Button
              className={styles.loginButton}
              color="primary"
              disabled={
                addUserIsPending
                || formData.firstName.length === 0
                || formData.lastName.length === 0
                || formData.email.length === 0
                || formData.username.length === 0
                || formData.plainPassword.length === 0
                || isRegistrationSuccessful
              }
              fullWidth
              onClick={this.registerHandler}
              startIcon={addUserIsPending ? <CircularProgress size={14} /> : null}
              variant="contained"
            >
              Vytvořit účet
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link
                  component={LoginLink}
                  href={routes.login.path}
                  variant="body2"
                >
                  Zpět na přihlášení
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </main>
    );
  }
}

RegistrationComponent.propTypes = {
  addUser: PropTypes.func.isRequired,
  addUserIsPending: PropTypes.bool.isRequired,
};

export default RegistrationComponent;
