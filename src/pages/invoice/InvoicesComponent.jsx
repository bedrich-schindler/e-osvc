import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailIcon from '@material-ui/icons/Launch';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
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
  history,
  invoices,
}) => {
  const isTableLoading = getInvoicesIsPending || deleteInvoiceIsPending;

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <Layout>
      <h1>Faktury</h1>
      {isTableLoading && (
        <CircularProgress />
      )}
      {invoices && !isTableLoading && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Číslo faktury</TableCell>
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
              {invoices.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.invoiceIdentifier}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        history.push(routes.invoiceDetail.path.replace(':id', row.id));
                      }}
                    >
                      <DetailIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        history.push(routes.invoiceEdit.path.replace(':id', row.id));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        await deleteInvoice(row.id);
                        getInvoices();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        className={styles.floatingButton}
        color="primary"
        onClick={() => {
          // TODO: Disable when no client or no project is available
          history.push(routes.invoiceAdd.path);
        }}
      >
        <AddIcon />
      </Fab>
    </Layout>
  );
};

InvoicesComponent.defaultProps = {
  invoices: null,
};

InvoicesComponent.propTypes = {
  deleteInvoice: PropTypes.func.isRequired,
  deleteInvoiceIsPending: PropTypes.bool.isRequired,
  getInvoices: PropTypes.func.isRequired,
  getInvoicesIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  invoices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    invoiceIdentifier: PropTypes.string.isRequired,
  })),
};

export default InvoicesComponent;

