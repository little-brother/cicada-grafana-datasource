export class CicadaDatasource {

	constructor(instanceSettings, $q, backendSrv, templateSrv) {
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
		if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) 
			this.headers['Authorization'] = instanceSettings.basicAuth;
		
		// cache tags
		this.tags = {};
		this.doRequest('/tags').then((result) => this.tags = result.data);
	}

	query(options) {
		var where = `&onlyrows=true&from=${new Date(options.range.from).getTime()}&to=${new Date(options.range.to).getTime()}&downsample=auto`
		var DEFAULT = '* select *';
		
		var url_list = options.targets
			.filter((target) => !target.hide)
			.filter((target) => target.type == 'single' && !isNaN(target.device_id) && !isNaN(target.varbind_id) || 
				target.type == 'group' && target.device_tag != DEFAULT && target.varbind_tag != DEFAULT
			)
			.map((target) => (target.type == 'single') ?
				`/device/${target.device_id}/varbind-history?only=${target.varbind_id}` + where :
				`/tag/${target.varbind_tag}?tags=${target.device_tag || 'All'}` + where
			);
		
		if (url_list.length == 0)	
			return Promise.resolve({data: []});
		
		var scope = url_list.map((url) => this.doRequest(url));
		var self = this;
	
		return Promise.all(scope).then(function (results) {
			var data =  [];
			
			results.forEach(function (result, i) {
				var res = result.data;
			
				for (var no = 1; no < res.columns.length; no++) {
					data.push({
						target: res.columns[no],
						datapoints: res.rows.map((e) => [e[no], e[0]]).filter((e) => !isNaN(e[0]) && e[0] != null)
					})
				}
			});
			
			return Promise.resolve({data});
		})
	
	}

	testDatasource() {
		return this.doRequest('/favicon.ico')
			.then(res => res.status == 200 ? {status: 'success', message: 'OK', title: 'Success'} : {status: 'error', message: 'Fail', title: 'Error'});
	}

	getDeviceTags () {
		return Promise.resolve(Object.keys(this.tags));;
	}	

	getVarbindTags (device_tag) {
		return Promise.resolve(this.tags[device_tag] || []);
	}

	getDeviceList () {
		return this.doRequest('/device').then((res) => res.data);
	}

	getVarbindList (device_id) {
		return this.doRequest(`/device/${device_id}/varbind-list`).then((res) => res.data);
	}
		
	doRequest(url) {
		var options = {
			url: this.url + url,
			withCredentials: this.withCredentials,
			headers: this.headers,
			method: 'GET'
		}
		
		return this.backendSrv.datasourceRequest(options);
	}
}
