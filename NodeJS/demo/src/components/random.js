export class RandomMgr {
	udid() {
  		return '_' + Math.random().toString(36).substr(3, 35);
	}
}