import ME from './knowme'
import {config} from '../../config/setting'

const launcher = (function (options) {
    new ME(options);
})(config);

export default launcher;
