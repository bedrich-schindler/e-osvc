import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
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
import { TimeRecordDialog } from '../../components/TimeRecordDialog';
import { getTimeDifferenceString } from '../../services/dateTimeService';
import routes from '../../routes';
import styles from './styles.scss';

const TimeRecordsComponent = ({
  addTimeRecord,
  addTimeRecordIsPending,
  deleteTimeRecord,
  deleteTimeRecordIsPending,
  editTimeRecord,
  editTimeRecordIsPending,
  getProjects,
  getProjectsIsPending,
  getTimeRecords,
  getTimeRecordsIsPending,
  history,
  isOnline,
  projects,
  timeRecords,
}) => {
  const isTableLoading = getProjectsIsPending
    || getTimeRecordsIsPending
    || deleteTimeRecordIsPending;
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [editDialogData, setEditDialogData] = useState(null);

  useEffect(() => {
    getProjects();
    getTimeRecords();
  }, [getProjects, getTimeRecords]);

  return (
    <Layout
      actions={[
        <Button
          color="primary"
          disabled={projects === null || projects.length === 0 || !isOnline}
          onClick={() => setIsAddDialogOpened(true)}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Přidat
        </Button>,
      ]}
      title="Odpracovaný čas"
    >
      {isTableLoading && (
        <CircularProgress />
      )}
      {timeRecords && projects && !isTableLoading && (
        <TableContainer component={Paper}>
          <Table className={styles.timeRecordTable} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Od</TableCell>
                <TableCell>Do</TableCell>
                <TableCell>Čas</TableCell>
                <TableCell>Projekt</TableCell>
                <TableCell>Poznámka</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {timeRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    Tabulka neobsahuje žádná data.
                  </TableCell>
                </TableRow>
              )}
              {timeRecords.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.startDateTime.toLocaleString()}</TableCell>
                  <TableCell>{row.endDateTime.toLocaleString()}</TableCell>
                  <TableCell>
                    {getTimeDifferenceString(row.startDateTime, row.endDateTime)}
                  </TableCell>
                  <TableCell>{row.project.name}</TableCell>
                  <TableCell>{row.note || '-'}</TableCell>
                  <TableCell align="right">
                    {
                      row.invoice === null
                        ? (
                          <>
                            <IconButton
                              disabled={!isOnline}
                              onClick={() => {
                                setEditDialogData(row);
                                setIsEditDialogOpened(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              disabled={!isOnline}
                              onClick={async () => {
                                await deleteTimeRecord(row.id);
                                getTimeRecords();
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            onClick={() => {
                              history.push(routes.invoiceDetail.path.replace(':id', row.invoice.id));
                            }}
                          >
                            <DescriptionIcon />
                          </IconButton>
                        )
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isAddDialogOpened && (
        <TimeRecordDialog
          isOnline={isOnline}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getTimeRecords();
            }

            setIsAddDialogOpened(false);
          }}
          projects={projects}
          saveTimeRecord={async (data) => {
            const response = await addTimeRecord(data);
            getTimeRecords();

            return response;
          }}
          saveTimeRecordIsPending={addTimeRecordIsPending}
          title="Přidat odpracovaný čas"
          validateTimeRecord={{}}
        />
      )}
      {isEditDialogOpened && (
        <TimeRecordDialog
          isOnline={isOnline}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getTimeRecords();
            }

            setIsEditDialogOpened(false);
            setEditDialogData(null);
          }}
          projects={projects}
          saveTimeRecord={async (data) => {
            const response = await editTimeRecord(editDialogData.id, data);
            getTimeRecords();

            return response;
          }}
          saveTimeRecordIsPending={editTimeRecordIsPending}
          timeRecord={editDialogData}
          title="Upravit odpracovaný čas"
          validateTimeRecord={{}}
        />
      )}
    </Layout>
  );
};

TimeRecordsComponent.defaultProps = {
  projects: null,
  timeRecords: null,
};

TimeRecordsComponent.propTypes = {
  addTimeRecord: PropTypes.func.isRequired,
  addTimeRecordIsPending: PropTypes.bool.isRequired,
  deleteTimeRecord: PropTypes.func.isRequired,
  deleteTimeRecordIsPending: PropTypes.bool.isRequired,
  editTimeRecord: PropTypes.func.isRequired,
  editTimeRecordIsPending: PropTypes.bool.isRequired,
  getProjects: PropTypes.func.isRequired,
  getProjectsIsPending: PropTypes.bool.isRequired,
  getTimeRecords: PropTypes.func.isRequired,
  getTimeRecordsIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isOnline: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  timeRecords: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TimeRecordsComponent;

