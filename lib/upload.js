const {
	getConfigCosSecretId,
	getConfigCosSecretKey,
	getConfigBucket,
	getConfigRegion,
} = require("./parse");

function uploadCos(abs_file, cos_file) {
	const filePath = abs_file; // 本地文件路径
	const fs = require("fs");
	var COS = require("cos-nodejs-sdk-v5");
	var cos = new COS({
		SecretId: getConfigCosSecretId(),
		SecretKey: getConfigCosSecretKey(),
	});
	cos.putObject(
		{
			Bucket: getConfigBucket() /* 必须 */,
			Region: getConfigRegion() /* 必须 */,
			Key: cos_file /* 必须 */,
			StorageClass: "STANDARD",
			Body: fs.createReadStream(filePath), // 上传文件对象
			ContentLength: fs.statSync(filePath).size,
			onProgress: function (progressData) {
				console.log(JSON.stringify(progressData));
			},
		},
		function (err, data) {
			console.log(err || data);
		}
	);
}

module.exports = {
	uploadCos,
};
