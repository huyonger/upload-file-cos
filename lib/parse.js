// 解析配置文件
const fs = require("fs");
const path = require("path");
root_dir = process.cwd();
config_file = "rc.json";

function parseConfig() {
	try {
		let config = fs.readFileSync(path.join(root_dir, config_file), "utf8");
		config = JSON.parse(config);
		return config;
	} catch (err) {
		console.log(`read rc.json: ${err}`);
	}
}

// function getConfigDirs() {
// 	return parseConfig()["dirs"];
// }

function getConfigCosProject() {
	return parseConfig()["cos_project"];
}

function getConfigFileSuffix() {
	return parseConfig()["file_suffix"];
}

function getConfigSourceSuffix() {
	return parseConfig()["source_suffix"];
}

function getConfigCosSecretId() {
	return parseConfig()["cos_secret_id"];
}

function getConfigCosSecretKey() {
	return parseConfig()["cos_secret_key"];
}

function getConfigBucket() {
	return parseConfig()["bucket"];
}

function getConfigRegion() {
	return parseConfig()["region"];
}

function getConfigCDNDomain() {
	return parseConfig()["cdn_domain"];
}

function getConfigFile() {
	return parseConfig()["file"];
}

module.exports = {
	// getConfigDirs,
	getConfigCosProject,
	getConfigCosSecretId,
	getConfigCosSecretKey,
	getConfigBucket,
	getConfigRegion,
	getConfigCDNDomain,
	getConfigFileSuffix,
	getConfigSourceSuffix,
	getConfigFile,
};
