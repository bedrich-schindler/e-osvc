import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
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
import React, {
  useEffect,
  useState,
} from 'react';
import { Layout } from '../../components/Layout';
import { AddClientDialog } from './components/AddClientDialog';
import { EditClientDialog } from './components/EditClientDialog';
import styles from './styles.scss';

const ClientsComponent = ({
  addClient,
  addClientIsPending,
  clients,
  deleteClient,
  deleteClientIsPending,
  editClient,
  editClientIsPending,
  getClients,
  getClientsIsPending,
}) => {
  const isTableLoading = getClientsIsPending || deleteClientIsPending;
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [editDialogData, setEditDialogData] = useState(null);

  useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <Layout
      actions={[
        <Button
          color="primary"
          onClick={() => setIsAddDialogOpened(true)}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Přidat
        </Button>,
      ]}
      title="Klienti"
    >
      {isTableLoading && (
        <CircularProgress />
      )}
      {clients && !isTableLoading && (
        <TableContainer component={Paper}>
          <Table className={styles.clientTable} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Jméno</TableCell>
                <TableCell>Adresa</TableCell>
                <TableCell>IČ</TableCell>
                <TableCell>DIČ</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    Tabulka neobsahuje žádná data.
                  </TableCell>
                </TableRow>
              )}
              {clients.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.street}
                    ,
                    {' '}
                    {row.city}
                    ,
                    {' '}
                    {row.postalCode}
                  </TableCell>
                  <TableCell>{row.cidNumber || '-'}</TableCell>
                  <TableCell>{row.taxNumber || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditDialogData(row);
                        setIsEditDialogOpened(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={async () => {
                        await deleteClient(row.id);
                        getClients();
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
      {isAddDialogOpened && (
        <AddClientDialog
          addClient={addClient}
          addClientIsPending={addClientIsPending}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getClients();
            }

            setIsAddDialogOpened(false);
          }}
        />
      )}
      {isEditDialogOpened && (
        <EditClientDialog
          client={editDialogData}
          editClient={editClient}
          editClientIsPending={editClientIsPending}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getClients();
            }

            setIsEditDialogOpened(false);
            setEditDialogData(null);
          }}
        />
      )}
    </Layout>
  );
};

ClientsComponent.defaultProps = {
  clients: null,
};

ClientsComponent.propTypes = {
  addClient: PropTypes.func.isRequired,
  addClientIsPending: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({})),
  deleteClient: PropTypes.func.isRequired,
  deleteClientIsPending: PropTypes.bool.isRequired,
  editClient: PropTypes.func.isRequired,
  editClientIsPending: PropTypes.bool.isRequired,
  getClients: PropTypes.func.isRequired,
  getClientsIsPending: PropTypes.bool.isRequired,
};

export default ClientsComponent;

