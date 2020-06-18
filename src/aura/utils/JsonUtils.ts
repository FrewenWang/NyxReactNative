export default class JsonUtils {
    /**
     * 字符转换为JSON
     * */
    public static strToJson(data: any) {
        return JSON.parse(data);
    }

    /**
     * JSON转换为字符
     * */
    public static jsonToStr(data: any) {
        return JSON.stringify(data);
    }

    /**
     * map转换为json
     * */
    public static mapToJson(map: any) {
        return JSON.stringify(JsonUtils.strMapToObj(map));
    }

    /**
     * json转换为map
     * */
    public static jsonToMap(jsonStr: any) {
        return JsonUtils.objToStrMap(JSON.parse(jsonStr));
    }

    /**
     * map转化为对象（map所有键都是字符串，可以将其转换为对象）
     * */
    public static strMapToObj(strMap: any) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    /**
     * 对象转换为Map
     * */
    public static objToStrMap(obj: any) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }
}
