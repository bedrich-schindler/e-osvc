import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import { Layout } from '../../components/Layout';
import styles from './styles.scss';

const InvoicesComponent = ({
  invoice,
  getInvoice,
  getInvoiceIsPending,
  match,
}) => {
  useEffect(() => {
    getInvoice(match.params.id);
  }, [getInvoice, match.params.id]);

  let totalPrice = 0;
  if (invoice && invoice.invoiceItems) {
    totalPrice = invoice.invoiceItems.reduce(
      (total, invoiceItem) => total + invoiceItem.pricePerQuantityUnit * invoiceItem.quantity,
      0,
    );
  }

  return (
    <Layout>
      <Box mb={5} mt={2}>
        <Grid
          alignItems="center"
          container
          direction="row"
          justify="space-between"
          spacing={5}
        >
          <Grid item>
            <h1 style={{ margin: 0 }}>
              Detail faktury
              {invoice ? ` – ${invoice.invoiceIdentifier}` : ''}
            </h1>
          </Grid>
          <Grid item>
            <Grid
              alignItems="center"
              container
              direction="row"
              justify="space-between"
              spacing={1}
            >
              <Grid item>
                <Button
                  color="primary"
                  // TODO: Implement invoice edit
                  disabled={!invoice || getInvoiceIsPending || true}
                  startIcon={<EditIcon />}
                  variant="contained"
                >
                  Upravit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  // TODO: Implement invoice remove
                  disabled={!invoice || getInvoiceIsPending || true}
                  startIcon={<DeleteIcon />}
                  variant="contained"
                >
                  Smazat
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {getInvoiceIsPending && (
        <CircularProgress />
      )}
      {invoice && !getInvoiceIsPending && (
        <Grid
          container
          spacing={5}
          style={{ gridAutoRows: '1fr' }}
        >
          <Grid item md={4} sm={6} xs={12}>
            <Paper style={{ height: '100%' }}>
              <Box p={3}>
                <h2 className={styles.subheading}>
                  Dodavatel
                </h2>
                <Box>
                  <p className={styles.infoLine}>
                    {invoice.userInfo.firstName}
                    {' '}
                    {invoice.userInfo.lastName}
                  </p>
                  <p className={styles.infoLine}>
                    {invoice.userInfo.street}
                  </p>
                  <p className={styles.infoLine}>
                    {invoice.userInfo.postalCode}
                    {' '}
                    {invoice.userInfo.city}
                  </p>
                </Box>
                <Box mt={3}>
                  <p className={styles.infoLine}>
                    IČ:
                    {' '}
                    {invoice.userInfo.cidNumber}
                  </p>
                  <p className={styles.infoLine}>
                    DIČ:
                    {' '}
                    {invoice.userInfo.taxNumber || 'Neplátce DPH'}
                  </p>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Paper style={{ height: '100%' }}>
              <Box p={3}>
                <h2 className={styles.subheading}>
                  Odběratel
                </h2>
                <Box>
                  <p className={styles.infoLine}>
                    {invoice.clientInfo.name}
                  </p>
                  <p className={styles.infoLine}>
                    {invoice.clientInfo.street}
                  </p>
                  <p className={styles.infoLine}>
                    {invoice.clientInfo.postalCode}
                    {' '}
                    {invoice.clientInfo.city}
                  </p>
                </Box>
                <Box mt={3}>
                  <p className={styles.infoLine}>
                    IČ:
                    {' '}
                    {invoice.userInfo.cidNumber || 'Soukromá osoba'}
                  </p>
                  <p className={styles.infoLine}>
                    DIČ:
                    {' '}
                    {invoice.userInfo.taxNumber || 'Neplátce DPH'}
                  </p>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper style={{ height: '100%' }}>
              <Box p={3}>
                <h2 className={styles.subheading}>
                  Platební údaje
                </h2>
                <Box>
                  <p className={styles.infoLine}>
                    Způsob platby: převodem na účet
                  </p>
                  <p className={styles.infoLine}>
                    Číslo účtu:
                    {' '}
                    {invoice.userInfo.bankAccount}
                  </p>
                  <p className={styles.infoLine}>
                    Variabilní symbol:
                    {' '}
                    {invoice.paymentVariableSymbol}
                  </p>
                </Box>
                <Box mt={3}>
                  <p className={styles.infoLine}>
                    Datum vystavení:
                    {' '}
                    {invoice.invoiceDate.toLocaleDateString()}
                  </p>
                  <p className={styles.infoLine}>
                    Datum splatnosti:
                    {' '}
                    {invoice.invoiceDueDate.toLocaleDateString()}
                  </p>
                  <p className={styles.infoLine}>
                    Datum zaplacení:
                    {' '}
                    {invoice.invoicePaymentDate ? invoice.invoicePaymentDate.toLocaleDateString() : 'nezaplaceno'}
                  </p>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Množství</TableCell>
                    <TableCell>Popis</TableCell>
                    <TableCell align="right">Cena za MJ</TableCell>
                    <TableCell align="right">Cena celkem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.invoiceItems.map((invoiceItem) => (
                    <TableRow key={invoiceItem.id}>
                      <TableCell>
                        {invoiceItem.quantity}
                        {' '}
                        {invoiceItem.quantityUnit}
                      </TableCell>
                      <TableCell>
                        {invoiceItem.note}
                      </TableCell>
                      <TableCell align="right">
                        {invoiceItem.pricePerQuantityUnit.toFixed(2)}
                        {' '}
                        CZK
                      </TableCell>
                      <TableCell align="right">
                        {(invoiceItem.pricePerQuantityUnit * invoiceItem.quantity).toFixed(2)}
                        {' '}
                        CZK
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right" variant="head">
                      Celkem
                    </TableCell>
                    <TableCell align="right" variant="head">
                      {totalPrice.toFixed(2)}
                      {' '}
                      CZK
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

InvoicesComponent.defaultProps = {
  invoice: null,
};

InvoicesComponent.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  getInvoiceIsPending: PropTypes.bool.isRequired,
  invoice: PropTypes.shape({
    clientInfo: PropTypes.shape({
      cidNumber: PropTypes.number,
      city: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.number,
    }).isRequired,
    id: PropTypes.number.isRequired,
    invoiceDate: PropTypes.object.isRequired,
    invoiceDueDate: PropTypes.object.isRequired,
    invoiceIdentifier: PropTypes.string.isRequired,
    invoiceItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      pricePerQuantityUnit: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      quantityUnit: PropTypes.string,
    })).isRequired,
    invoicePaymentDate: PropTypes.object,
    paymentVariableSymbol: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      bankAccount: PropTypes.string.isRequired,
      cidNumber: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.number,
    }).isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default InvoicesComponent;

