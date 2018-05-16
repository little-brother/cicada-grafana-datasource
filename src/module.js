import {CicadaDatasource} from './datasource';
import {CicadaDatasourceQueryCtrl} from './query_ctrl';

class CicadaConfigCtrl {}
CicadaConfigCtrl.templateUrl = 'partials/config.html';

class CicadaQueryOptionsCtrl {}
CicadaQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

export {
  CicadaDatasource as Datasource,
  CicadaDatasourceQueryCtrl as QueryCtrl,
  CicadaConfigCtrl as ConfigCtrl,
  CicadaQueryOptionsCtrl as QueryOptionsCtrl
};
