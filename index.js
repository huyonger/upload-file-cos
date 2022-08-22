#!/usr/bin/env node
const { getConfigFile, getConfigFileSuffix } = require("./lib/parse");
const { replaceLocalUrlToCDNUrl } = require("./lib/replace");
const fs = require("fs");
const path = require("path");
const root_dir = process.cwd();
let dirs = getConfigFile();
let suffixs = getConfigFileSuffix();

function traverse(dir) {
	if (fs.lstatSync(dir).isDirectory()) {
		const son_dirs = fs.readdirSync(dir);
		son_dirs.forEach((son_dir) => {
			traverse(path.join(dir, son_dir));
		});
	} else {
		if (
			suffixs.some((suffix) => {
				return dir.endsWith(suffix);
			})
		) {
			replaceLocalUrlToCDNUrl(dir);
		}
	}
}

dirs.forEach((dir) => {
	traverse(path.join(root_dir, dir));
});
