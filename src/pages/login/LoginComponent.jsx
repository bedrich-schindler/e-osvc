import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import routes from '../../routes';
import styles from './styles.scss';

const RegistrationLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to={routes.registration.path} {...props} />
));

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        password: '',
        username: '',
      },
      isLoginFailed: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
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

  async loginHandler() {
    const { login } = this.props;
    const { formData } = this.state;

    this.setState({ isLoginFailed: false });

    const response = await login(formData.username, formData.password);

    if (response.error) {
      this.setState({ isLoginFailed: true });
    }
  }

  render() {
    const {
      isOnline,
      loginIsPending,
    } = this.props;
    const {
      formData,
      isLoginFailed,
    } = this.state;

    return (
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <Typography
            className={styles.title}
            component="h1"
            variant="h5"
          >
            eOSVČ – Přihlášení
          </Typography>
          {!isOnline && (
            <Alert
              className={styles.alert}
              severity="warning"
              variant="filled"
            >
              Pro přihlášení se musíte připojit k internetu.
            </Alert>
          )}
          {isLoginFailed && (
            <Alert
              className={styles.alert}
              severity="error"
              variant="filled"
            >
              Uživatelské jméno nebo heslo je špatně.
            </Alert>
          )}
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              autoComplete="username"
              fullWidth
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
              autoComplete="current-password"
              fullWidth
              id="password"
              label="Heslo"
              margin="normal"
              name="password"
              onChange={this.changeHandler}
              required
              type="password"
              value={formData.password}
              variant="outlined"
            />
            <Button
              className={styles.loginButton}
              color="primary"
              disabled={
                loginIsPending
                || formData.username.length === 0
                || formData.password.length === 0
                || !isOnline
              }
              fullWidth
              onClick={this.loginHandler}
              startIcon={loginIsPending ? <CircularProgress size={14} /> : null}
              type="submit"
              variant="contained"
            >
              Přihlásit se
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="/" variant="body2"> */}
                {/*  Obnovit heslo */}
                {/* </Link> */}
              </Grid>
              <Grid item>
                <Link
                  component={RegistrationLink}
                  href={routes.registration.path}
                  variant="body2"
                >
                  Vytvořit účet
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </main>
    );
  }
}

LoginComponent.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginIsPending: PropTypes.bool.isRequired,
};

export default LoginComponent;
