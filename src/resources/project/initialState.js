import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addProject: {
      isPending: false,
    },
    deleteProject: {
      isPending: false,
    },
    editProject: {
      isPending: false,
    },
    getProject: {
      isPending: false,
    },
    getProjects: {
      isPending: false,
    },
  },
  data: {
    addProject: null,
    deleteProject: null,
    editProject: null,
    getProject: null,
    getProjects: null,
  },
});
