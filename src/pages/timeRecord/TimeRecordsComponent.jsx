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
import { Layout } from '../../components/Layout';
import { TimeRecordDialog } from './components/TimeRecordDialog';
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
    <Layout>
      <h1>Odpracovaný čas</h1>
      {isTableLoading && (
        <CircularProgress />
      )}
      {timeRecords && projects && !isTableLoading && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Od</TableCell>
                <TableCell>Do</TableCell>
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
                  <TableCell>{row.project.name}</TableCell>
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
                        await deleteTimeRecord(row.id);
                        getTimeRecords();
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
        <TimeRecordDialog
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
      <Fab
        className={styles.floatingButton}
        disabled={projects === null || projects.length === 0}
        color="primary"
        onClick={() => setIsAddDialogOpened(true)}
      >
        <AddIcon />
      </Fab>
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
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  timeRecords: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TimeRecordsComponent;
