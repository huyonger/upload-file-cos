# ReplaceCDN
> 上传项目中特定的静态资源到腾讯云COS，并且替换成CDN链接。

## 需求
- 支持读取配置文件
- 支持选定上传的文件夹
- 支持选定对应的COS

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
// 如果资源已经上传，链接并且替换，需要重新上传资源，那么把cdn链接改成本地即可

## config
```json
{
    "cos_project":"test",
    "file":["index.html","www/"],
    "file_suffix":["html","css"],
    "source_suffix":["jpg","png","pdf","ppt","doc"],
    "dirs":["img","static",],
    "cos_secret_id":"",
    "cos_secret_key":"",
    "bucket":"yonghuc-1304749288",
    "region":"ap-beijing",
    "cdn_domain":"https://cdn.imyoyo.xyz/"
}
```

##版本更新
1.0.1 删除cos_secret_id、cos_secret_key
1.0.2 增加#|www开头链接,不进行替换
1.0.3 修复a标签匹配补全bug,增加上传静态资源后缀匹配
