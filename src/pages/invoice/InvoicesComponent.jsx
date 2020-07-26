import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailIcon from '@material-ui/icons/Launch';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { cloneDeep } from 'lodash';
import React, {
  useEffect,
  useState,
} from 'react';
import { Layout } from '../../components/Layout';
import { updateData } from '../../services/dataService';
import routes from '../../routes';
import styles from './styles.scss';

const InvoicesComponent = ({
  clients,
  deleteInvoice,
  deleteInvoiceIsPending,
  getClients,
  getClientsIsPending,
  getInvoicesFiltered,
  getInvoicesIsPending,
  getProjects,
  getProjectsIsPending,
  history,
  invoices,
  isOnline,
  projects,
}) => {
  const isTableLoading = getInvoicesIsPending
    || getClientsIsPending
    || getProjectsIsPending
    || deleteInvoiceIsPending;
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const [filterData, setFilterData] = useState(cloneDeep({
    clientIds: [],
    invoiceDateFrom: null,
    invoiceDateTo: null,
  }));

  useEffect(() => {
    getClients();
    getInvoicesFiltered(filterData);
    getProjects();
  }, [getClients, getInvoicesFiltered, getProjects]);

  const changeHandler = (e) => {
    const eventTarget = e.target;
    let {
      name,
      value,
    } = eventTarget;

    setFilterData(updateData(filterData, name, value));
  }

  const changeInvoiceDateFromHandler = (value) => {
    let invoiceDateFrom = null;
    if (value) {
      invoiceDateFrom = new Date(value);
      invoiceDateFrom.setHours(0, 0, 0);
    }

    return changeHandler({
      target: {
        name: 'invoiceDateFrom',
        value: invoiceDateFrom,
      },
    });
  }

  const changeInvoiceDateToHandler = (value) => {
    let invoiceDateTo = null;
    if (value) {
      invoiceDateTo = new Date(value);
      invoiceDateTo.setHours(23, 59, 59);
    }

    return changeHandler({
      target: {
        name: 'invoiceDateTo',
        value: invoiceDateTo,
      },
    });
  }

  const filterHandler = () => {
    getInvoicesFiltered(filterData);
  }

  return (
    <Layout
      actions={[
        <Button
          color="primary"
          disabled={clients === null || projects === null || projects.length === 0 || !isOnline}
          onClick={() => history.push(routes.invoiceAdd.path)}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Přidat
        </Button>,
        <Button
          disabled={clients === null || projects === null || projects.length === 0 || !isOnline}
          onClick={() => setIsFilterOpened(!isFilterOpened)}
          startIcon={<FilterListIcon />}
          variant="contained"
        >
          Filtr
        </Button>,
      ]}
      title="Faktury"
    >
      {isTableLoading && (
        <CircularProgress />
      )}
      {clients && projects && invoices && !isTableLoading && (
        <>
          {isFilterOpened && (
            <Box mb={5}>
              <Paper>
                <Box p={3}>
                  <Grid
                    container
                    spacing={2}
                    style={{ gridAutoRows: '1fr' }}
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={6} md={3}>
                      <KeyboardDatePicker
                        autoFocus
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="dd. MM. yyyy"
                        id="invoiceDateFrom"
                        label="Začátek"
                        value={filterData.invoiceDateFrom}
                        onChange={changeInvoiceDateFromHandler}
                        KeyboardButtonProps={{
                          'aria-label': 'Změnit datum',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <KeyboardDatePicker
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="dd. MM. yyyy"
                        id="invoiceDateTo"
                        label="Konec"
                        value={filterData.invoiceDateTo}
                        onChange={changeInvoiceDateToHandler}
                        KeyboardButtonProps={{
                          'aria-label': 'Změnit datum',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="clientIds">
                          Klienti
                        </InputLabel>
                        <Select
                          fullWidth
                          id="clientIds"
                          margin="dense"
                          name="clientIds"
                          multiple
                          onChange={changeHandler}
                          value={filterData.clientIds ?? []}
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
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        onClick={filterHandler}
                        variant="contained"
                      >
                        Filtrovat
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          )}
          <TableContainer component={Paper}>
            <Table className={styles.invoiceTable} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Číslo faktury</TableCell>
                  <TableCell>Datum vystavení</TableCell>
                  <TableCell>Datum splatnosti</TableCell>
                  <TableCell>Datum zaplacení</TableCell>
                  <TableCell>Částka</TableCell>
                  <TableCell>Klient</TableCell>
                  <TableCell>Projekty</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      Tabulka neobsahuje žádná data.
                    </TableCell>
                  </TableRow>
                )}
                {invoices.map((row) => {
                  let totalPrice = 0;
                  if (row && row.invoiceItems) {
                    totalPrice = row.invoiceItems.reduce(
                      (total, invoiceItem) => total
                        + invoiceItem.pricePerQuantityUnit * invoiceItem.quantity,
                      0,
                    );
                  }

                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.invoiceIdentifier}</TableCell>
                      <TableCell>{row.invoiceDate.toLocaleDateString()}</TableCell>
                      <TableCell>{row.invoiceDueDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {row.invoicePaymentDate ? row.invoicePaymentDate.toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {totalPrice.toFixed(2)}
                        {' '}
                        CZK
                      </TableCell>
                      <TableCell>{row.clientInfo.name}</TableCell>
                      <TableCell>{row.projectInfoItems.map((p) => p.name).join(', ')}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            history.push(routes.invoiceDetail.path.replace(':id', row.id));
                          }}
                        >
                          <DetailIcon />
                        </IconButton>
                        <IconButton
                          disabled={!isOnline}
                          onClick={() => {
                            history.push(routes.invoiceEdit.path.replace(':id', row.id));
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={!isOnline}
                          onClick={async () => {
                            await deleteInvoice(row.id);
                            getInvoicesFiltered(filterData);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Layout>
  );
};

InvoicesComponent.defaultProps = {
  clients: null,
  invoices: null,
  projects: null,
};

InvoicesComponent.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({})),
  deleteInvoice: PropTypes.func.isRequired,
  deleteInvoiceIsPending: PropTypes.bool.isRequired,
  getClients: PropTypes.func.isRequired,
  getClientsIsPending: PropTypes.bool.isRequired,
  getInvoicesFiltered: PropTypes.func.isRequired,
  getInvoicesIsPending: PropTypes.bool.isRequired,
  getProjects: PropTypes.func.isRequired,
  getProjectsIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  invoices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    invoiceIdentifier: PropTypes.string.isRequired,
  })),
  isOnline: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
};

export default InvoicesComponent;

