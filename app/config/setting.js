/**
 * 项目名（同app.json里的name值要一致）
 * node 运行项目路径下script/dev.js会自动修改，不需要手动修改。
 * @type {{$AppProjectName: string}}
 */
const config = {
    $AppProjectName: 'knowme'
};

if (__DEV__) {
    Object.assign(config, {
        WebServerUrl: "http://v3.wufazhuce.com:8000",
    })
} else {
    Object.assign(config, {
        WebServerUrl: "http://v3.wufazhuce.com:8000",
    });
}

export { config}