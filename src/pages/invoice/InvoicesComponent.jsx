import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailIcon from '@material-ui/icons/Launch';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
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
import routes from '../../routes';
import styles from './styles.scss';

const InvoicesComponent = ({
  deleteInvoice,
  deleteInvoiceIsPending,
  getInvoices,
  getInvoicesIsPending,
  getProjects,
  getProjectsIsPending,
  history,
  invoices,
  isOnline,
  projects,
}) => {
  const isTableLoading = getInvoicesIsPending || getProjectsIsPending || deleteInvoiceIsPending;

  useEffect(() => {
    getInvoices();
    getProjects();
  }, [getInvoices, getProjects]);

  return (
    <Layout
      actions={[
        <Button
          color="primary"
          disabled={projects === null || projects.length === 0 || !isOnline}
          onClick={() => history.push(routes.invoiceAdd.path)}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Přidat
        </Button>,
      ]}
      title="Faktury"
    >
      {isTableLoading && (
        <CircularProgress />
      )}
      {invoices && !isTableLoading && (
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
                          getInvoices();
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
      )}
    </Layout>
  );
};

InvoicesComponent.defaultProps = {
  invoices: null,
  projects: null,
};

InvoicesComponent.propTypes = {
  deleteInvoice: PropTypes.func.isRequired,
  deleteInvoiceIsPending: PropTypes.bool.isRequired,
  getInvoices: PropTypes.func.isRequired,
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

