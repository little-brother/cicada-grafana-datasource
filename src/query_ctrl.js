import {QueryCtrl} from 'app/plugins/sdk';

var DEFAULT = '* select *';

export class CicadaDatasourceQueryCtrl extends QueryCtrl {

	constructor($scope, $injector) {
		super($scope, $injector);
	
		this.scope = $scope;
		this.target.type = this.target.type || 'single';
		this.target.device_id = this.target.device_id || DEFAULT;
		this.target.varbind_id = this.target.varbind_id || DEFAULT;
		this.target.device_tag = this.target.device_tag || 'All';
		this.target.varbind_tag = this.target.varbind_tag || DEFAULT;
	}

	getDeviceList() {
		return this.datasource.getDeviceList().then((device_list) => device_list.map((e) => new Object({text: e.name, value: e.id})));
	}

	getVarbindList() {
		return isNaN(this.target.device_id) ?
			[{value: DEFAULT, text: DEFAULT}] :
			this.datasource.getVarbindList(this.target.device_id)
				.then((varbind_list) => varbind_list.filter((v) => v.is_history).map((e) => new Object({text: e.name, value: e.id})));
	}

	onDeviceChange() {
		this.target.varbind_id = DEFAULT;
	}

	getDeviceTags() {
		return this.datasource.getDeviceTags()
			.then((tag_list) => tag_list.map((e) => new Object({text: e, value: e})));
	}

	getVarbindTags() {
		return this.datasource.getVarbindTags(this.target.device_tag)
			.then((tag_list) => tag_list.map((e) => new Object({text: e, value: e})));
	}

	onDeviceTagChange() {
		var self = this;
		this.datasource.getVarbindTags(this.target.device_tag).then(function(tag_list) {
			self.target.varbind_tag = tag_list[0] || DEFAULT;
			self.panelCtrl.refresh();
		});
	}
}

CicadaDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';