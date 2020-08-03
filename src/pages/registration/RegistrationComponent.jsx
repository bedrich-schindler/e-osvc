import PropTypes from 'prop-types';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import {
  validateUser,
  validateUserFirstStep,
} from '../../resources/user/validator';
import routes from '../../routes';
import styles from './styles.scss';

const LoginLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to={routes.login.path} {...props} />
));

class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStepIndex: 0,
      formData: {
        bankAccount: '',
        cidNumber: '',
        city: '',
        email: '',
        firstName: '',
        lastName: '',
        plainPassword: '',
        postalCode: '',
        street: '',
        taxNumber: '',
        username: '',
      },
      formErrors: {
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
      },
      isRegistrationFailed: false,
      isRegistrationSuccessful: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.continueHandler = this.continueHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  getFirstStepContent() {
    const {
      formData,
      formErrors,
    } = this.state;

    return (
      <>
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
          error={Boolean(formErrors.username)}
          fullWidth
          helperText={formErrors.username}
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
      </>
    );
  }

  getSecondStepContent() {
    const {
      formData,
      formErrors,
    } = this.state;

    return (
      <>
        <TextField
          autoFocus
          autoComplete="address-line1"
          error={Boolean(formErrors.street)}
          fullWidth
          helperText={formErrors.street}
          id="street"
          label="Ulice"
          margin="normal"
          name="street"
          onChange={this.changeHandler}
          required
          value={formData.street}
          variant="outlined"
        />
        <TextField
          autoComplete="address-line2"
          error={Boolean(formErrors.city)}
          fullWidth
          helperText={formErrors.city}
          id="city"
          label="Město"
          margin="normal"
          name="city"
          onChange={this.changeHandler}
          required
          value={formData.city}
          variant="outlined"
        />
        <TextField
          autoComplete="postal-code"
          error={Boolean(formErrors.postalCode)}
          fullWidth
          helperText={formErrors.postalCode}
          id="postalCode"
          label="PSČ"
          margin="normal"
          name="postalCode"
          onChange={this.changeHandler}
          required
          type="number"
          value={formData.postalCode}
          variant="outlined"
        />
        <TextField
          error={Boolean(formErrors.cidNumber)}
          fullWidth
          helperText={formErrors.cidNumber}
          id="cidNumber"
          label="IČ"
          margin="normal"
          name="cidNumber"
          onChange={this.changeHandler}
          required
          type="number"
          value={formData.cidNumber}
          variant="outlined"
        />
        <TextField
          error={Boolean(formErrors.taxNumber)}
          fullWidth
          helperText={formErrors.taxNumber}
          id="taxNumber"
          label="DIČ"
          margin="normal"
          name="taxNumber"
          onChange={this.changeHandler}
          value={formData.taxNumber}
          variant="outlined"
        />
        <TextField
          error={Boolean(formErrors.bankAccount)}
          fullWidth
          helperText={formErrors.bankAccount}
          id="bankAccount"
          label="Číslo bankovního účtu"
          margin="normal"
          name="bankAccount"
          onChange={this.changeHandler}
          required
          value={formData.bankAccount}
          variant="outlined"
        />
      </>
    );
  }

  getFirstStepAction() {
    return (
      <>
        <Button
          className={styles.continueButton}
          color="primary"
          fullWidth
          onClick={this.continueHandler}
          type="submit"
          variant="contained"
        >
          Pokračovat
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
      </>
    );
  }

  getSecondStepAction() {
    const {
      addUserIsPending,
      isOnline,
    } = this.props;

    return (
      <>
        <Button
          className={styles.continueButton}
          color="primary"
          disabled={!isOnline}
          fullWidth
          onClick={this.registerHandler}
          startIcon={addUserIsPending ? <CircularProgress size={14} /> : null}
          type="submit"
          variant="contained"
        >
          Vytvořit účet
        </Button>
        <Button
          className={styles.backButton}
          fullWidth
          onClick={() => this.setState({ activeStepIndex: 0 })}
          variant="contained"
        >
          Zpět
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
      </>
    );
  }

  static getThirdStepContent() {
    return (
      <p>
        Pokračujte na stránku
        {' '}
        <Link
          component={LoginLink}
          href={routes.login.path}
          variant="body2"
        >
          přihlášení
        </Link>
        {' '}
        a přihlaste se, abyste mohli začít aplikaci eOSVČ používat.
      </p>
    );
  }

  getStepAction(index) {
    if (index === 0) {
      return this.getFirstStepAction();
    }

    if (index === 1) {
      return this.getSecondStepAction();
    }

    return null;
  }

  getStepContent(index) {
    if (index === 0) {
      return this.getFirstStepContent();
    }

    if (index === 1) {
      return this.getSecondStepContent();
    }

    if (index === 2) {
      return this.constructor.getThirdStepContent();
    }

    return null;
  }

  static getStepLabels() {
    return ['Přihlašovací údaje', 'Fakturační údaje', 'Dokončení'];
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

  continueHandler() {
    const { formData } = this.state;

    const formValidity = validateUserFirstStep(
      formData,
      {
        elements: {
          email: null,
          firstName: null,
          lastName: null,
          plainPassword: null,
          username: null,
        },
        isValid: true,
      },
    );

    this.setState((prevState) => ({
      formErrors: {
        ...prevState.formErrors,
        ...formValidity.elements,
      },
    }));

    if (!formValidity.isValid) {
      return;
    }

    this.setState({ activeStepIndex: 1 });
  }

  async registerHandler() {
    const { addUser } = this.props;
    const { formData } = this.state;

    const formValidity = validateUser(
      formData,
      {
        elements: {
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
        },
        isValid: true,
      },
    );

    this.setState((prevState) => ({
      formErrors: {
        ...prevState.formErrors,
        ...formValidity.elements,
      },
    }));

    if (!formValidity.isValid) {
      this.setState((prevState) => ({
        formErrors: {
          ...prevState.formErrors,
          ...formValidity.elements,
        },
      }));

      return;
    }

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
        activeStepIndex: 0,
        formErrors: newFormErrors,
        isRegistrationFailed: true,
      });

      return;
    }

    this.setState({
      activeStepIndex: 2,
      isRegistrationSuccessful: true,
    });
  }

  render() {
    const { isOnline } = this.props;
    const {
      activeStepIndex,
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
          {!isOnline && (
            <Alert
              className={styles.alert}
              severity="warning"
              variant="filled"
            >
              Pro vytvoření účtu se musíte připojit k internetu.
            </Alert>
          )}
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
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <Stepper
              activeStep={activeStepIndex}
              orientation="vertical"
              style={{
                background: 'transparent',
                padding: 0,
              }}
            >
              {this.constructor.getStepLabels().map((label) => (
                <Step key={label}>
                  <StepLabel>
                    {label}
                  </StepLabel>
                  <StepContent>
                    {this.getStepContent(activeStepIndex)}
                    {this.getStepAction(activeStepIndex)}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </form>
        </div>
      </main>
    );
  }
}

RegistrationComponent.propTypes = {
  addUser: PropTypes.func.isRequired,
  addUserIsPending: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default RegistrationComponent;
