import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FilterListIcon from '@material-ui/icons/FilterList';
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
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { cloneDeep } from 'lodash';
import React, {
  useEffect,
  useState,
} from 'react';
import { Layout } from '../../components/Layout';
import { TimeRecordDialog } from '../../components/TimeRecordDialog';
import { updateData } from '../../services/dataService';
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
  getTimeRecordsFiltered,
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
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [editDialogData, setEditDialogData] = useState(null);

  const startDateTime = new Date();
  startDateTime.setMonth(startDateTime.getMonth() - 1);
  startDateTime.setHours(0, 0, 0, 0);

  const [filterData, setFilterData] = useState(cloneDeep({
    endDateTime: null,
    projectIds: [],
    startDateTime,
  }));

  useEffect(() => {
    getProjects();
    getTimeRecordsFiltered(filterData);
  }, [getProjects, getTimeRecordsFiltered]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeHandler = (e) => {
    const eventTarget = e.target;
    const {
      name,
      value,
    } = eventTarget;

    setFilterData(updateData(filterData, name, value));
  };

  const changeEndDateTimeHandler = (value) => changeHandler({
    target: {
      name: 'endDateTime',
      value: value ? new Date(value) : null,
    },
  });

  const changeStartDateTimeHandler = (value) => changeHandler({
    target: {
      name: 'startDateTime',
      value: value ? new Date(value) : null,
    },
  });

  const filterHandler = () => {
    getTimeRecordsFiltered(filterData);
  };

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
        <Button
          disabled={projects === null || projects.length === 0 || !isOnline}
          onClick={() => setIsFilterOpened(!isFilterOpened)}
          startIcon={<FilterListIcon />}
          variant="contained"
        >
          Filtr
        </Button>,
      ]}
      title="Odpracovaný čas"
    >
      {isTableLoading && (
        <CircularProgress />
      )}
      {timeRecords && projects && !isTableLoading && (
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
                      <KeyboardDateTimePicker
                        autoFocus
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="dd. MM. yyyy HH:mm:ss"
                        id="startDateTime"
                        label="Začátek"
                        value={filterData.startDateTime}
                        onChange={changeStartDateTimeHandler}
                        KeyboardButtonProps={{
                          'aria-label': 'Změnit datum',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <KeyboardDateTimePicker
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="dd. MM. yyyy HH:mm:ss"
                        id="endDateTime"
                        label="Konec"
                        value={filterData.endDateTime}
                        onChange={changeEndDateTimeHandler}
                        KeyboardButtonProps={{
                          'aria-label': 'Změnit datum',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="projectIds">
                          Projekt
                        </InputLabel>
                        <Select
                          fullWidth
                          id="projectIds"
                          margin="dense"
                          name="projectIds"
                          multiple
                          onChange={changeHandler}
                          value={filterData.projectIds ?? []}
                        >
                          {projects.map((project) => (
                            <MenuItem
                              key={project.id}
                              value={project.id}
                            >
                              {project.name}
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
            <Table className={styles.timeRecordTable} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Začátek</TableCell>
                  <TableCell>Konec</TableCell>
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
                                title="Upravit záznam"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                disabled={!isOnline}
                                onClick={async () => {
                                  await deleteTimeRecord(row.id);
                                  getTimeRecordsFiltered(filterData);
                                }}
                                title="Smazat záznam"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              onClick={() => {
                                history.push(routes.invoiceDetail.path.replace(':id', row.invoice.id));
                              }}
                              title="Detail faktury"
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
        </>
      )}
      {isAddDialogOpened && (
        <TimeRecordDialog
          isOnline={isOnline}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getTimeRecordsFiltered(filterData);
            }

            setIsAddDialogOpened(false);
          }}
          projects={projects}
          saveTimeRecord={async (data) => {
            const response = await addTimeRecord(data);
            getTimeRecordsFiltered(filterData);

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
              getTimeRecordsFiltered(filterData);
            }

            setIsEditDialogOpened(false);
            setEditDialogData(null);
          }}
          projects={projects}
          saveTimeRecord={async (data) => {
            const response = await editTimeRecord(editDialogData.id, data);
            getTimeRecordsFiltered(filterData);

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
  getTimeRecordsFiltered: PropTypes.func.isRequired,
  getTimeRecordsIsPending: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isOnline: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  timeRecords: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TimeRecordsComponent;

