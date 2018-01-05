/**
 * Created by InforeXuan on 2017/5/18.
 */
import 'core-js'

//将action分组
const TestActionType = {
    TEST_TYPE: Symbol(),
};

//这个一定要放到最后
const ActionType = {
    ...TestActionType
};

export default ActionType;