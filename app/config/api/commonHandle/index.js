import {failHandle} from './commonFailHandle';
import {tokenInterceptHandle} from "./tokenInterceptHandle";

let apiHandle = {
    failHandle,
    tokenHandle: tokenInterceptHandle
};

module.exports = apiHandle;
