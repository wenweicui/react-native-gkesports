import api from './api'
import {config} from '../../config/setting';
import {failHandle, tokenHandle} from '../../config/api/commonHandle'
import {SUCCESS_CODE, COMMON_ERROR_TOAST} from "../../config/api/api.config";

class BaseRequest {
    constructor(body) {
        if (!body) {
            body = {};
        }
        this.body = body;
    }

    static requestUrl() {
        throw {message: 'function requestUrl must be override'};
    }

    /**
     * request start
     * @param successCallback 成功回调
     * @param failCallBack 失败回调
     * @param interceptError 错误处理，如果这里进行了handle，failCallBack则不处理
     * @returns {Promise.<void>}
     */
    start(successCallback, failCallBack, handleError) {
        let self = this;
        let url = this.requestUrl();
        let body = this.body;
        let formData = new FormData();
        for (let prop in body) {
            if (Array.isArray(body[prop])) {
                for (let value of body[prop]) {
                    formData.append(prop, value);
                }
            } else {
                formData.append(prop, body[prop]);
            }
        }
        api(config.WebServerUrl).post(url, formData)
            .then((response) => {
                log(response);
                const {status} = response;
                if (response.ok) {
                    if (response.status) {
                        if (status === 200) {
                            if (parseInt(response.data.code) === SUCCESS_CODE) {
                                self._handleResponse(response.data, successCallback);
                            } else {
                                failCallBack && failCallBack(response.data.message);
                                if (response.data.message) {
                                    failHandle(response.data.message);
                                }
                            }
                        } else if ('NETWORK_ERROR' === response.problem) {
                            this._handleFail(failCallBack, response, handleError)
                        }
                    } else {
                        this._handleFail(failCallBack, response, handleError)
                    }
                } else {
                    if (response.data && response.data.code) {
                        if (!tokenHandle(response.data.code)) {
                            this._handleFail(failCallBack, response, handleError);
                        }
                    } else {
                        this._handleFail(failCallBack, response, handleError);
                    }
                }
            });
    }

    _handleResponse(responseJson, successCallback) {
        if (!responseJson) {
            return;
        }
        if (responseJson.code === '0' || responseJson.code === 0) {
            successCallback(responseJson.body);
        }
    }

    _handleFail(failCallBack, response, handleError) {
        if (handleError) {
            handleError(response.problem);
            return;
        }
        failHandle(COMMON_ERROR_TOAST);
        failCallBack && failCallBack(response.problem);
    }
}

export default BaseRequest;
