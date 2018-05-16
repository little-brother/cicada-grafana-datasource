'use strict';

System.register(['app/plugins/sdk'], function (_export, _context) {
	"use strict";

	var QueryCtrl, _createClass, DEFAULT, CicadaDatasourceQueryCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	return {
		setters: [function (_appPluginsSdk) {
			QueryCtrl = _appPluginsSdk.QueryCtrl;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			DEFAULT = '* select *';

			_export('CicadaDatasourceQueryCtrl', CicadaDatasourceQueryCtrl = function (_QueryCtrl) {
				_inherits(CicadaDatasourceQueryCtrl, _QueryCtrl);

				function CicadaDatasourceQueryCtrl($scope, $injector) {
					_classCallCheck(this, CicadaDatasourceQueryCtrl);

					var _this = _possibleConstructorReturn(this, (CicadaDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(CicadaDatasourceQueryCtrl)).call(this, $scope, $injector));

					_this.scope = $scope;
					_this.target.type = _this.target.type || 'single';
					_this.target.device_id = _this.target.device_id || DEFAULT;
					_this.target.varbind_id = _this.target.varbind_id || DEFAULT;
					_this.target.device_tag = _this.target.device_tag || 'All';
					_this.target.varbind_tag = _this.target.varbind_tag || DEFAULT;
					return _this;
				}

				_createClass(CicadaDatasourceQueryCtrl, [{
					key: 'getDeviceList',
					value: function getDeviceList() {
						return this.datasource.getDeviceList().then(function (device_list) {
							return device_list.map(function (e) {
								return new Object({ text: e.name, value: e.id });
							});
						});
					}
				}, {
					key: 'getVarbindList',
					value: function getVarbindList() {
						return isNaN(this.target.device_id) ? [{ value: DEFAULT, text: DEFAULT }] : this.datasource.getVarbindList(this.target.device_id).then(function (varbind_list) {
							return varbind_list.filter(function (v) {
								return v.is_history;
							}).map(function (e) {
								return new Object({ text: e.name, value: e.id });
							});
						});
					}
				}, {
					key: 'onDeviceChange',
					value: function onDeviceChange() {
						this.target.varbind_id = DEFAULT;
					}
				}, {
					key: 'getDeviceTags',
					value: function getDeviceTags() {
						return this.datasource.getDeviceTags().then(function (tag_list) {
							return tag_list.map(function (e) {
								return new Object({ text: e, value: e });
							});
						});
					}
				}, {
					key: 'getVarbindTags',
					value: function getVarbindTags() {
						return this.datasource.getVarbindTags(this.target.device_tag).then(function (tag_list) {
							return tag_list.map(function (e) {
								return new Object({ text: e, value: e });
							});
						});
					}
				}, {
					key: 'onDeviceTagChange',
					value: function onDeviceTagChange() {
						var self = this;
						this.datasource.getVarbindTags(this.target.device_tag).then(function (tag_list) {
							self.target.varbind_tag = tag_list[0] || DEFAULT;
							self.panelCtrl.refresh();
						});
					}
				}]);

				return CicadaDatasourceQueryCtrl;
			}(QueryCtrl));

			_export('CicadaDatasourceQueryCtrl', CicadaDatasourceQueryCtrl);

			CicadaDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
		}
	};
});
//# sourceMappingURL=query_ctrl.js.map
