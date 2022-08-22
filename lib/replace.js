const fs = require("fs");
const path = require("path");
const {
	getConfigCDNDomain,
	getConfigCosProject,
	getConfigSourceSuffix,
} = require("./parse");
const root_dir = process.cwd();
const cos_project = getConfigCosProject();
const prefix = getConfigCDNDomain() + cos_project;
const { uploadCos } = require("./upload");
const suffixs = getConfigSourceSuffix();

//file要求绝对路径
function replaceLocalUrlToCDNUrl(file) {
	function replaceCallback(m, g1) {
		//如果开头为http|//|#,不用上传
		if (
			g1.startsWith("http") ||
			g1.startsWith("//") ||
			g1.startsWith("#") ||
			!suffixs.some((suffix) => g1.endsWith(suffix))
		) {
			return m;
		}
		let abs_dir = path.join(path.dirname(file), g1);
		let upload_dir = cos_project + abs_dir.replace(root_dir, "");
		uploadCos(abs_dir, upload_dir);
		m = m.replace(g1, abs_dir.replace(root_dir, prefix));
		return m;
	}
	try {
		let content = fs.readFileSync(file, "utf-8");
		// 替换img src
		content = content.replace(
			/<img.*?src="(.*?)".*?\/>/gms,
			replaceCallback
		);
		// 替换a href
		content = content.replace(
			/<a.*?href="(.*?)".*?>.*?<\/a.*?>/gms,
			replaceCallback
		);
		// 替换url
		content = content.replace(/url\((.*?)\)/gms, replaceCallback);
		fs.writeFileSync(file, content);
	} catch (err) {
		console.log(err);
	}
}
module.exports = {
	replaceLocalUrlToCDNUrl,
};
