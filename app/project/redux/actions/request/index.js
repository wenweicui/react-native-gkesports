import ActionType from "../../actionType";
import {config} from "../../../../config/setting";
import api from "../../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE, Status} from "../../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";

const fetchData = (url, body, dispatch) => {
    if (!body) {
        body = {};
    }
    let userId;
    if (!body.hasOwnProperty('userId')) {
        if (_USERID_) {
            userId = _USERID_;
            Object.assign(body, {
                userId: userId,
            })
        }
    }
    Object.assign(body, {
        token: _USERTOKEN_ ? _USERTOKEN_ : ''
    });
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
                console.log(response)
                const {status} = response;
                if (response.ok) {
                    if (response.status && status === 200) {
                        if (parseInt(response.data.code) === SUCCESS_CODE) {
                            dispatch({
                                type: url,
                                data: response.data.body
                            })
                        } else if (parseInt(response.data.code) === TOKEN_ERROR_CODE) {
                            // 这里处理token异常
                            console.log('token is over , please 重新登录')
                            dispatch({
                                type: ActionType.REQUEST_STATUS,
                                data: Status.TOKEN_FAIL
                            })
                        } else {
                            // 请求有问题
                            Toast.message('请求失败,请稍后重试。')
                            dispatch({
                                type: ActionType.REQUEST_STATUS,
                                data: Status.FAIL
                            })
                        }
                    }
                } else {
                    // 请求有问题
                    Toast.message('请求失败,请稍后重试。')
                    dispatch({
                        type: ActionType.REQUEST_STATUS,
                        data: Status.FAIL
                    })
                }
            }
        );
}

export const request = (url, body) => (dispatch) => {
    fetchData(url, body, dispatch);
}