/**
 * http api for app
 * @author PeterL
 */
import {LoginResources} from './resources';

export default {
    login (name, pwd) {
        return LoginResources.save();
    }
};
