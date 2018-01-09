import 'core-js'

const REQUEST = {
    REQUEST_ERROR: Symbol()
}
//这个一定要放到最后
const ActionType = {
    ...REQUEST
};

export default ActionType;