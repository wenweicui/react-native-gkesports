/**
 * 项目名（同app.json里的name值要一致）
 * node 运行项目路径下script/dev.js会自动修改，不需要手动修改。
 * @type {{$AppProjectName: string}}
 */
const config = {
    $AppProjectName: 'knowme'
};

/**
 * 项目全局变量初始化（默认userId，token，有需要自己添加）
 * @type {{_USERID_: string, _USERTOKEN_: string}}
 */
const GLOB = {
    _USERID_: '',
    _USERTOKEN_: ''
};

/**
 * 用户信息key:用户storage存取数据
 * @type {{USERSTAGE_KEY: string}}
 */
const USER_KEY = {
    USERSTAGE_KEY: 'INFROREUSERSTATEKEY',
};

if (__DEV__) {
    Object.assign(config, {
        // WebServerUrl: "http://192.168.31.170:8080", //测试服务器地址
        // WebServerUrl: "http://192.168.31.151:8009",  //开发服务器地址
        WebServerUrl: "https://epms.infore.com",
        // WebServerUrl: "http://192.168.39.213:10086",  //本地Mock
    })
} else {
    Object.assign(config, {
        // WebServerUrl: "http://192.168.31.170:8080", //测试服务器地址
        WebServerUrl: "https://epms.infore.com",
        // WebServerUrl: "http://192.168.31.151:8009",  //开发服务器地址
        // WebServerUrl: "http://119.23.209.49:9080",  //测试服务器地址
    });
}

export { config, GLOB, USER_KEY }