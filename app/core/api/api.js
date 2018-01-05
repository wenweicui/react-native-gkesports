import {create} from 'apisauce'
import {header, timeout} from "../../config/api/api.config";

const api = (baseUrl) => create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: header
});

export default api
