'use strict';

System.register(['./datasource', './query_ctrl'], function (_export, _context) {
  "use strict";

  var CicadaDatasource, CicadaDatasourceQueryCtrl, CicadaConfigCtrl, CicadaQueryOptionsCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      CicadaDatasource = _datasource.CicadaDatasource;
    }, function (_query_ctrl) {
      CicadaDatasourceQueryCtrl = _query_ctrl.CicadaDatasourceQueryCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', CicadaConfigCtrl = function CicadaConfigCtrl() {
        _classCallCheck(this, CicadaConfigCtrl);
      });

      CicadaConfigCtrl.templateUrl = 'partials/config.html';

      _export('QueryOptionsCtrl', CicadaQueryOptionsCtrl = function CicadaQueryOptionsCtrl() {
        _classCallCheck(this, CicadaQueryOptionsCtrl);
      });

      CicadaQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export('Datasource', CicadaDatasource);

      _export('QueryCtrl', CicadaDatasourceQueryCtrl);

      _export('ConfigCtrl', CicadaConfigCtrl);

      _export('QueryOptionsCtrl', CicadaQueryOptionsCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
