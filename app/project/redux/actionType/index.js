import 'core-js'

const REQUEST = {
    REQUEST_STATUS: Symbol()
};

const PICTURE = {
    REQUEST_LIST: Symbol(),
    REQUEST_DETAIL: Symbol()
}
//这个一定要放到最后
const ActionType = {
    ...REQUEST,
    ...PICTURE
};

export default ActionType;