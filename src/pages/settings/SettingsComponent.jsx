import PropTypes from 'prop-types';
import React, {
  useEffect,
  useState,
} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Layout } from '../../components/Layout';
import { updateData } from '../../services/dataService';

const SettingsComponent = (props) => {
  const {
    editUserNotifications,
    editUserNotificationsIsPending,
    getUser,
    getUserIsPending,
  } = props;

  const [userNotifications, setUserNotifications] = useState(null);

  useEffect(() => {
    getUser().then((response) => {
      setUserNotifications(response.payload.userNotifications);
      return response;
    });
  }, [getUser]);

  const handleCheckboxChange = (e) => {
    const {
      checked,
      name,
    } = e.target;

    setUserNotifications(updateData(
      userNotifications,
      name,
      checked,
    ));
  };

  const handleSelectChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setUserNotifications(updateData(
      userNotifications,
      name,
      value,
    ));
  };

  const renderDayOfMonth = (name) => (
    <FormControl
      fullWidth
      required
    >
      <InputLabel htmlFor={name}>
        Upozornit:
      </InputLabel>
      <Select
        fullWidth
        id={name}
        margin="dense"
        name={name}
        onChange={handleSelectChange}
        required
        value={userNotifications[name]}
      >
        {[...Array(28).keys()].map((key) => (
          <MenuItem
            key={key + 1}
            value={key + 1}
          >
            {key + 1}
            . den v měsíci
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Layout
      actions={[
        <Button
          color="primary"
          disabled={
            editUserNotificationsIsPending
            || getUserIsPending
            || userNotifications === null
          }
          onClick={() => {
            editUserNotifications(userNotifications.id, userNotifications);
            Notification.requestPermission();
          }}
          startIcon={editUserNotificationsIsPending ? <CircularProgress size={14} /> : <SaveIcon />}
          variant="contained"
        >
          Uložit
        </Button>,
      ]}
      title="Nastavení"
    >
      {
        (getUserIsPending || !userNotifications)
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
                      Upozornění
                    </h2>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={userNotifications.overdueInvoiceEnabled}
                                inputProps={{ 'aria-labelledby': '' }}
                                name="overdueInvoiceEnabled"
                                onChange={handleCheckboxChange}
                              />
                            </TableCell>
                            <TableCell>Faktura po splatnosti</TableCell>
                            <TableCell>
                              <FormControl
                                disabled
                                fullWidth
                                required
                              >
                                <InputLabel htmlFor="overdueInvoiceDayOfMonth">
                                  Upozornit:
                                </InputLabel>
                                <Select
                                  fullWidth
                                  id="overdueInvoiceDayOfMonth"
                                  margin="dense"
                                  name="overdueInvoiceDayOfMonth"
                                  onChange={() => {}}
                                  required
                                  value={1}
                                >
                                  <MenuItem value={1}>
                                    Okamžitě
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={userNotifications.taxEnabled}
                                inputProps={{ 'aria-labelledby': '' }}
                                name="taxEnabled"
                                onChange={handleCheckboxChange}
                              />
                            </TableCell>
                            <TableCell>Platba záloh daně</TableCell>
                            <TableCell>
                              {renderDayOfMonth('taxDayOfMonth')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={userNotifications.socialInsuranceEnabled}
                                inputProps={{ 'aria-labelledby': '' }}
                                name="socialInsuranceEnabled"
                                onChange={handleCheckboxChange}
                              />
                            </TableCell>
                            <TableCell>Platba záloh sociálního pojištění</TableCell>
                            <TableCell>
                              {renderDayOfMonth('socialInsuranceDayOfMonth')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={userNotifications.healthInsuranceEnabled}
                                inputProps={{ 'aria-labelledby': '' }}
                                name="healthInsuranceEnabled"
                                onChange={handleCheckboxChange}
                              />
                            </TableCell>
                            <TableCell>Platba záloh zdravotního pojištění</TableCell>
                            <TableCell>
                              {renderDayOfMonth('healthInsuranceDayOfMonth')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={userNotifications.sicknessInsuranceEnabled}
                                inputProps={{ 'aria-labelledby': '' }}
                                name="sicknessInsuranceEnabled"
                                onChange={handleCheckboxChange}
                              />
                            </TableCell>
                            <TableCell>Platba záloh nemocenského pojištění</TableCell>
                            <TableCell>
                              {renderDayOfMonth('sicknessInsuranceDayOfMonth')}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )
      }
    </Layout>
  );
};

SettingsComponent.defaultProps = {
  user: null,
};

SettingsComponent.propTypes = {
  editUserNotifications: PropTypes.func.isRequired,
  editUserNotificationsIsPending: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserIsPending: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    userNotifications: PropTypes.shape({
      healthInsuranceDayOfMonth: PropTypes.number.isRequired,
      healthInsuranceEnabled: PropTypes.bool.isRequired,
      overdueInvoiceEnabled: PropTypes.bool.isRequired,
      sicknessInsuranceDayOfMonth: PropTypes.number.isRequired,
      sicknessInsuranceEnabled: PropTypes.bool.isRequired,
      socialInsuranceDayOfMonth: PropTypes.number.isRequired,
      socialInsuranceEnabled: PropTypes.bool.isRequired,
      taxDayOfMonth: PropTypes.number.isRequired,
      taxEnabled: PropTypes.bool.isRequired,
    }).isRequired,
  }),
};

export default SettingsComponent;

