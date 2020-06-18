import RNFS from 'react-native-fs';

export default class FileUtils {
    public static readFileByPath(path: string): Promise<string> {
        return RNFS.readFile(path);
    }
}
