import * as NavActions from './nav';
import * as AuthActions from './auth';
import * as TypeSelecActions from './typeSelection';
import * as CreateJob from './createJob';
import * as Job from './job';
import * as Filter from './filter';
import * as Profile from './profile';

export const ActionCreators = Object.assign({},
  NavActions,
  AuthActions,
  TypeSelecActions,
  CreateJob,
  Job,
  Filter,
  Profile,
);
