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
import { AddProjectDialog } from './components/AddProjectDialog';
import { EditProjectDialog } from './components/EditProjectDialog';
import styles from './styles.scss';

const ProjectsComponent = ({
  addProject,
  addProjectIsPending,
  clients,
  projects,
  deleteProject,
  deleteProjectIsPending,
  editProject,
  editProjectIsPending,
  getClients,
  getClientsIsPending,
  getProjects,
  getProjectsIsPending,
}) => {
  const isTableLoading = getClientsIsPending || getProjectsIsPending || deleteProjectIsPending;
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [editDialogData, setEditDialogData] = useState(null);

  useEffect(() => {
    getClients();
    getProjects();
  }, [getClients, getProjects]);

  return (
    <Layout
      actions={[
        <Button
          color="primary"
          disabled={clients === null || clients.length === 0}
          onClick={() => setIsAddDialogOpened(true)}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Přidat
        </Button>,
      ]}
      title="Projekty"
    >
      {isTableLoading && (
        <CircularProgress />
      )}
      {projects && !isTableLoading && (
        <TableContainer component={Paper}>
          <Table className={styles.projectTable} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Název</TableCell>
                <TableCell>Klient</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    Tabulka neobsahuje žádná data.
                  </TableCell>
                </TableRow>
              )}
              {projects.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.client.name}</TableCell>
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
                        await deleteProject(row.id);
                        getProjects();
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
        <AddProjectDialog
          addProject={addProject}
          addProjectIsPending={addProjectIsPending}
          clients={clients}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getProjects();
            }

            setIsAddDialogOpened(false);
          }}
        />
      )}
      {isEditDialogOpened && (
        <EditProjectDialog
          clients={clients}
          project={editDialogData}
          editProject={editProject}
          editProjectIsPending={editProjectIsPending}
          onClose={(shouldReload) => {
            if (shouldReload === true) {
              getProjects();
            }

            setIsEditDialogOpened(false);
            setEditDialogData(null);
          }}
        />
      )}
    </Layout>
  );
};

ProjectsComponent.defaultProps = {
  clients: null,
  projects: null,
};

ProjectsComponent.propTypes = {
  addProject: PropTypes.func.isRequired,
  addProjectIsPending: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  deleteProject: PropTypes.func.isRequired,
  deleteProjectIsPending: PropTypes.bool.isRequired,
  editProject: PropTypes.func.isRequired,
  editProjectIsPending: PropTypes.bool.isRequired,
  getClients: PropTypes.func.isRequired,
  getClientsIsPending: PropTypes.bool.isRequired,
  getProjects: PropTypes.func.isRequired,
  getProjectsIsPending: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default ProjectsComponent;

