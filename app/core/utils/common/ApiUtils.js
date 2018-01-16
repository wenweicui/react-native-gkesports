import {config} from "../../../config/setting";
import api from "../../../config/api/api";
import {SUCCESS_CODE, TOKEN_ERROR_CODE, header} from "../../../config/api/api.config";
import Toast from "teaset/components/Toast/Toast";

export const fetch = (url) => {
    return new Promise((resolve, reject) => {
        api(config.WebServerUrl).get(url)
            .then((response) => {
                    console.log(response);
                    const {status} = response;
                    if (response.ok) {
                        if (response.status && status === 200) {
                            if (parseInt(response.data.res) === SUCCESS_CODE) {
                                resolve(response.data.data)
                            } else {
                                // 请求有问题
                                Toast.message('请求失败,请稍后重试。')
                            }
                        }
                    } else {
                        // 请求有问题
                        Toast.message('请求失败,请稍后重试。')
                    }
                }
            );
    });
};