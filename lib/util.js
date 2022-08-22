// 获取所有文件夹
const { getConfigDirs } = require("./parse");
const fs = require("fs");
const path = require("path");
root_dir = process.cwd();
function getAllUploadDir() {
	let dirs = getConfigDirs();
	let set = [];
	let queue = [];
	// init
	dirs.forEach((dir) => {
		dir = path.join(root_dir, dir);
		if (
			fs.existsSync(dir) &&
			fs.lstatSync(dir).isDirectory() &&
			queue.indexOf(dir) == -1
		) {
			queue.push(dir);
			set.push(dir);
		}
	});
	while (queue.length !== 0) {
		let root_dir = queue.shift();
		fs.readdirSync(root_dir).forEach((d) => {
			let abs_dir = path.join(root_dir, d);
			if (fs.lstatSync(abs_dir).isDirectory()) {
				queue.push(abs_dir);
				set.push(abs_dir);
			}
		});
	}
	return set;
}
module.exports = {
	getAllUploadDir,
};
