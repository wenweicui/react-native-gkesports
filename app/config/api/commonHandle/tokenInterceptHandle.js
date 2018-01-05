import {TOKEN_ERROR} from "../api.config";
import {Toast} from "teaset";

export function tokenInterceptHandle(code) {
    if (code === TOKEN_ERROR.code) {
        Toast.show(TOKEN_ERROR.message);
    } else {
        return false;
    }
}
