import ActionType from "../../actionType";
import {config} from "../../../../config/setting";
import api from "../../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE, Status} from "../../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";

const fetchData = (url, dispatch) => {
    api(config.WebServerUrl).get(url)
        .then((response) => {
                console.log(response)
                const {status} = response;
                if (response.ok) {
                    if (response.status && status === 200) {
                        if (parseInt(response.data.res) === SUCCESS_CODE) {
                            dispatch({
                                type: url,
                                data: response.data.data
                            })
                        } else if (parseInt(response.data.res) === TOKEN_ERROR_CODE) {
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

export const request = (url) => (dispatch) => {
    fetchData(url,  dispatch);
}