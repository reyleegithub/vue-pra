/**
 * Created by yangli on 2019/4/21.
 */

import React from 'react'
import {
    AsyncStorage
} from 'react-native'

const FAVORATE_KEY_PREFIX = "favorate_";

export default class FavorateDao {
    constructor(flag) {
        this.flag = flag;
        this.favorateKey = FAVORATE_KEY_PREFIX + flag;
    }

    /**
     * 收藏项目，保存收藏的项目
     **/
    saveFavorateItem(key, vaue, callback) {
        AsyncStorage.setItem(key, vaue, (err) => {
            if (!err) {
                this.updateFavorateKeys(key, true);
            }
        })
    }

    /**
     * 更新Favorate key集合
     * @param key
     * @params
     * isAdd true 增加 false 删除
     **/
    updateFavorateKeys(key, isAdd) {
        AsyncStorage.getItem(this.favorateKey, (err, result) => {
            let favorateKeys = [];
            if (!err) {
                if (result) {
                    favorateKeys = JSON.parse(result);
                }
                let index = favorateKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favorateKeys.push(key);
                    }
                } else {
                    if (index !== -1) {
                        favorateKeys.splice(index, 1);
                    }
                }
            }
            AsyncStorage.setItem(this.favorateKey, JSON.stringify(favorateKeys))
        });
    }

    /**
     * 取消收藏，移除已经收藏项目
     **/
    removeFavorateItem(key) {
        AsyncStorage.removeItem(key, (err) => {
            if (!err) {
                this.updateFavorateKeys(key, false)
            }
        })
    }

    /**
     *
     **/
    getFavorateKs() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favorateKey, (err, result)=> {
                if (!err) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (err) {
                        reject(err)
                    }
                } else {
                    reject(err);
                }
            })
        })
    }

    /**
     * 获取用户所有收藏项目
     **/
    getAllItem() {
        return new Promise((resolve, reject)=> {
            this.getFavorateKs().then(keys => {
                let items = [];
                if (keys) {
                    try {
                        AsyncStorage.multiGet(keys).then(results=> {
                            results.map((item) => {
                                items.push(item[1]);
                            })
                            resolve(items);
                        })
                    } catch (err) {
                        reject(err);
                    }
                }else {
                    resolve(items);
                }
            }).catch(err => {
                reject(err);
            })
        })
    }
}