import { ErrorHandler } from "../utils";
import { AppRegistry } from "react-native";
import initGlobal from "./initGlobal";
import entry from "../../config/entry";

const SW = (options) => {
    const { $AppProjectName } = options;
    (async () => {
        await initGlobal();
        // 进行异常处理(仅当release时有效)
        ErrorHandler();
        AppRegistry.registerComponent($AppProjectName, () => entry);
    })();
};
export default SW;