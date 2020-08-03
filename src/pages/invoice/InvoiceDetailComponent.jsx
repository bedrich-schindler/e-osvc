import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { pdf } from '@react-pdf/renderer';
import React, { useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { getTimeDifferenceString } from '../../services/dateTimeService';
import routes from '../../routes';
import { InvoicePdf } from './components/InvoicePdf';
import { getTotalTime } from './helpers';
import styles from './styles.scss';

const InvoiceDetailComponent = ({
  deleteInvoice,
  deleteInvoiceIsPending,
  history,
  invoice,
  getInvoice,
  getInvoiceIsPending,
  isOnline,
  match,
}) => {
  useEffect(() => {
    getInvoice(match.params.id);
  }, [getInvoice, match.params.id]);

  const saveData = () => {
    pdf(<InvoicePdf invoice={invoice} />).toBlob().then((blob) => {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Faktura ${invoice.invoiceIdentifier}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);

      return blob;
    });
  };

  let totalPrice = 0;
  if (invoice && invoice.invoiceItems) {
    totalPrice = invoice.invoiceItems.reduce(
      (total, invoiceItem) => total + invoiceItem.pricePerQuantityUnit * invoiceItem.quantity,
      0,
    );
  }

  return (
    <Layout
      actions={[
        <Button
          disabled={!invoice || getInvoiceIsPending}
          onClick={saveData}
          startIcon={<CloudDownloadIcon />}
          variant="contained"
        >
          Stáhnout PDF
        </Button>,
        <Button
          disabled={!invoice || getInvoiceIsPending || !isOnline}
          onClick={() => {
            history.push(routes.invoiceEdit.path.replace(':id', match.params.id));
          }}
          startIcon={<EditIcon />}
          variant="contained"
        >
          Upravit
        </Button>,
        <Button
          disabled={!invoice || getInvoiceIsPending || deleteInvoiceIsPending || !isOnline}
          onClick={() => {
            deleteInvoice(match.params.id).then((response) => {
              history.push(routes.invoices.path);

              return response;
            });
          }}
          startIcon={<DeleteIcon />}
          variant="contained"
        >
          Smazat
        </Button>,
      ]}
      title={
        invoice
          ? (
            <>
              {`Detail faktury – ${invoice.invoiceIdentifier}`}
              <br />
              {invoice.projectInfoItems.map((projectInfo) => (
                <Chip
                  key={projectInfo.name}
                  label={projectInfo.name}
                  size="small"
                />
              ))}
            </>
          )
          : 'Detail faktury'
      }
    >
      {getInvoiceIsPending && (
        <CircularProgress />
      )}
      {invoice && !getInvoiceIsPending && (
        <Grid
          container
          spacing={2}
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
              <Table className={styles.invoiceItemsTable} size="small">
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
          {invoice.timeRecords.length > 0 && (
            <Grid item xs={12}>
              <div styles={{ width: '100%' }}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <h2 className={styles.timeRecordsSubheading}>
                      Odpracovaný čas
                    </h2>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                      <Table className={styles.invoiceTimeRecordsTable} size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Datum a čas začátku</TableCell>
                            <TableCell>Délka</TableCell>
                            <TableCell>Projekt</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {invoice.timeRecords.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.startDateTime.toLocaleString()}</TableCell>
                              <TableCell>
                                {getTimeDifferenceString(row.startDateTime, row.endDateTime)}
                              </TableCell>
                              <TableCell>{row.project.name}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell>
                              Odpracovaný čas celkem
                            </TableCell>
                            <TableCell>
                              {getTotalTime(invoice.timeRecords)}
                            </TableCell>
                            <TableCell />
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </Grid>
          )}
        </Grid>
      )}
    </Layout>
  );
};

InvoiceDetailComponent.defaultProps = {
  invoice: null,
};

InvoiceDetailComponent.propTypes = {
  deleteInvoice: PropTypes.func.isRequired,
  deleteInvoiceIsPending: PropTypes.bool.isRequired,
  getInvoice: PropTypes.func.isRequired,
  getInvoiceIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  invoice: PropTypes.shape({
    clientInfo: PropTypes.shape({
      cidNumber: PropTypes.number,
      city: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      postalCode: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      taxNumber: PropTypes.string,
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
    projectInfoItems: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      original: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
    timeRecords: PropTypes.arrayOf(PropTypes.shape({
      endDateTime: PropTypes.object.isRequired,
      project: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      startDateTime: PropTypes.object.isRequired,
    })),
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
  isOnline: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default InvoiceDetailComponent;

