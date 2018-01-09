import ActionType from "../../actionType";
import {config} from "../../../../config/setting";
import api from "../../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE} from "../../../../config/api/api.config";

const fetchData = (url, body, dispatch) => {
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
                        } else {
                            // 请求有问题
                            dispatch({
                                type: url,
                                data: response.data.body
                            })
                        }
                    }

                }
            }
        );
}

export const request = (url, body) => (dispatch) => {
    fetchData(url, body, dispatch);
}