import {rspData} from '../models/rsp_data'

class ParamsCheck {
	check(source, keys) {
		return new Promise((resolve, reject) => {
			console.log('Start check params');
			var rel = true;
			for (let key of keys.values()) {
				if (source.hasOwnProperty(key) == false) {
					rel = false;
					break;
				}
			}

			if (rel == true) {
				// statement
				resolve();
			}
			else {
				let data = new rspData(-1000, "缺少参数", null);
				reject(data);
			}
			
		});
	}
}

export default ParamsCheck;