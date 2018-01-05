import  ActionType from '../../actionType';

export function saveTestKey(data) {
    return {
        type: ActionType.TEST_TYPE,
        testKey: data
    };
}