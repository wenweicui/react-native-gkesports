import {Platform} from "react-native";

class Urls {
    static Picture = (id) => {
        return {
            getPictureList: `/api/hp/idlist/0?version=3.5.0&platform=${Platform.OS}`,
            getPictureDetail: `/api/hp/detail/${id}?version=3.5.0&platform=${Platform.OS}`
        }
    };
    static Reading = (id)=>{
        return {
            getReadingIndex:`/api/reading/index/?version=3.5.0&platform=${Platform.OS}`,
            getEssay:`/api/essay/${id}??version=3.5.0&platform=${Platform.OS}`
        }
    }
}

export default Urls