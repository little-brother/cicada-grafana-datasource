'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, CicadaDatasource;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
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

			_export('CicadaDatasource', CicadaDatasource = function () {
				function CicadaDatasource(instanceSettings, $q, backendSrv, templateSrv) {
					var _this = this;

					_classCallCheck(this, CicadaDatasource);

					this.type = instanceSettings.type;
					this.url = instanceSettings.url;
					this.name = instanceSettings.name;
					this.q = $q;
					this.backendSrv = backendSrv;
					this.templateSrv = templateSrv;
					this.withCredentials = instanceSettings.withCredentials;
					this.headers = {
						'Content-Type': 'application/json',
						'x-requested-with': 'XMLHttpRequest'
					};
					if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) this.headers['Authorization'] = instanceSettings.basicAuth;

					// cache tags
					this.tags = {};
					this.doRequest('/tags').then(function (result) {
						return _this.tags = result.data;
					});
				}

				_createClass(CicadaDatasource, [{
					key: 'query',
					value: function query(options) {
						var _this2 = this;

						var where = '&onlyrows=true&from=' + new Date(options.range.from).getTime() + '&to=' + new Date(options.range.to).getTime() + '&downsample=auto';
						var DEFAULT = '* select *';

						var url_list = options.targets.filter(function (target) {
							return !target.hide;
						}).filter(function (target) {
							return target.type == 'single' && !isNaN(target.device_id) && !isNaN(target.varbind_id) || target.type == 'group' && target.device_tag != DEFAULT && target.varbind_tag != DEFAULT;
						}).map(function (target) {
							return target.type == 'single' ? '/device/' + target.device_id + '/varbind-history?only=' + target.varbind_id + where : '/tag/' + target.varbind_tag + '?tags=' + (target.device_tag || 'All') + where;
						});

						if (url_list.length == 0) return Promise.resolve({ data: [] });

						var scope = url_list.map(function (url) {
							return _this2.doRequest(url);
						});
						var self = this;

						return Promise.all(scope).then(function (results) {
							var data = [];

							results.forEach(function (result, i) {
								var res = result.data;

								for (var no = 1; no < res.columns.length; no++) {
									data.push({
										target: res.columns[no],
										datapoints: res.rows.map(function (e) {
											return [e[no], e[0]];
										}).filter(function (e) {
											return !isNaN(e[0]) && e[0] != null;
										})
									});
								}
							});

							return Promise.resolve({ data: data });
						});
					}
				}, {
					key: 'testDatasource',
					value: function testDatasource() {
						return this.doRequest('/favicon.ico').then(function (res) {
							return res.status == 200 ? { status: 'success', message: 'OK', title: 'Success' } : { status: 'error', message: 'Fail', title: 'Error' };
						});
					}
				}, {
					key: 'getDeviceTags',
					value: function getDeviceTags() {
						return Promise.resolve(Object.keys(this.tags));;
					}
				}, {
					key: 'getVarbindTags',
					value: function getVarbindTags(device_tag) {
						return Promise.resolve(this.tags[device_tag] || []);
					}
				}, {
					key: 'getDeviceList',
					value: function getDeviceList() {
						return this.doRequest('/device').then(function (res) {
							return res.data;
						});
					}
				}, {
					key: 'getVarbindList',
					value: function getVarbindList(device_id) {
						return this.doRequest('/device/' + device_id + '/varbind-list').then(function (res) {
							return res.data;
						});
					}
				}, {
					key: 'doRequest',
					value: function doRequest(url) {
						var options = {
							url: this.url + url,
							withCredentials: this.withCredentials,
							headers: this.headers,
							method: 'GET'
						};

						return this.backendSrv.datasourceRequest(options);
					}
				}]);

				return CicadaDatasource;
			}());

			_export('CicadaDatasource', CicadaDatasource);
		}
	};
});
//# sourceMappingURL=datasource.js.map
