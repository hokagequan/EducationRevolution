export class rspData {
	constructor(code, msg, data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	toJSON() {
		return {
			code: this.code,
			msg: this.msg,
			data: this.data
		};
	}
}