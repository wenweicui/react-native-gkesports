import SW from './sewerage'
import {config} from '../../config/setting'

const launcher = (function (options) {
    new SW(options);
})(config);

export default launcher;
