import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
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
import React, {
  useEffect,
  useState,
} from 'react';
import { getTranslatedInsuranceVariant } from '../../constants/insuranceVariants';
import { validateInsurance } from '../../validators/insuranceValidator';
import { InsuranceDialog } from '../InsuranceDialog';
import styles from './styles.scss';

const InsuranceComponent = ({
  addInsurance,
  addInsuranceIsPending,
  addTitle,
  deleteInsurance,
  deleteInsuranceIsPending,
  editInsurance,
  editInsuranceIsPending,
  editTitle,
  getInsurances,
  getInsurancesIsPending,
  insurances,
  title,
}) => {
  const isTableLoading = getInsurancesIsPending || deleteInsuranceIsPending;
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [editDialogData, setEditDialogData] = useState(null);

  useEffect(() => {
    getInsurances();
  }, [getInsurances]);

  return (
    <>
      <h1>{title}</h1>
      {isTableLoading && (
        <CircularProgress />
      )}
      {insurances && !isTableLoading && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Datum</TableCell>
                <TableCell>Částka</TableCell>
                <TableCell>Varianta</TableCell>
                <TableCell>Poznámka</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {insurances.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    Tabulka neobsahuje žádná data.
                  </TableCell>
                </TableRow>
              )}
              {insurances.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {row.amount.toFixed(2)}
                    {' '}
                    CZK
                  </TableCell>
                  <TableCell>{getTranslatedInsuranceVariant(row.variant)}</TableCell>
                  <TableCell>{row.note || '-'}</TableCell>
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
                        await deleteInsurance(row.id);
                        getInsurances();
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
        <InsuranceDialog
          saveInsurance={async (data) => {
            const response = await addInsurance(data);
            getInsurances();

            return response;
          }}
          saveInsuranceIsPending={addInsuranceIsPending}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getInsurances();
            }

            setIsAddDialogOpened(false);
          }}
          title={addTitle}
          validateInsurance={validateInsurance}
        />
      )}
      {isEditDialogOpened && (
        <InsuranceDialog
          saveInsurance={async (data) => {
            const response = await editInsurance(editDialogData.id, data);
            getInsurances();

            return response;
          }}
          saveInsuranceIsPending={editInsuranceIsPending}
          insurance={editDialogData}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getInsurances();
            }

            setIsEditDialogOpened(false);
            setEditDialogData(null);
          }}
          title={editTitle}
          validateInsurance={validateInsurance}
        />
      )}
      <Fab
        className={styles.floatingButton}
        color="primary"
        onClick={() => setIsAddDialogOpened(true)}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

InsuranceComponent.defaultProps = {
  insurances: null,
};

InsuranceComponent.propTypes = {
  addInsurance: PropTypes.func.isRequired,
  addInsuranceIsPending: PropTypes.bool.isRequired,
  addTitle: PropTypes.string.isRequired,
  deleteInsurance: PropTypes.func.isRequired,
  deleteInsuranceIsPending: PropTypes.bool.isRequired,
  editInsurance: PropTypes.func.isRequired,
  editInsuranceIsPending: PropTypes.bool.isRequired,
  editTitle: PropTypes.string.isRequired,
  getInsurances: PropTypes.func.isRequired,
  getInsurancesIsPending: PropTypes.bool.isRequired,
  insurances: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string.isRequired,
};

export default InsuranceComponent;

