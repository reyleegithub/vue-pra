/**
 * Created by yangli on 2019/3/3.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import List from './Component/List/list'
import Account from './Component/Account/account'
import Edit from './Component/Edit/edit'
import Picture from './Component/Picture/picture'

import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import HKTabBar from './HKTabBar'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['视频','录制',"图片","我的"],
            tabIconNames: ['ios-videocam-outline','ios-recording','ios-reverse-camera','ios-contact']
        }
    }

    render() {
        // 为了避免this指针的问题，最好将变量提前写在外面
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={()=>{
                    return (
                        <HKTabBar
                            tabNames={tabNames}
                            tabIconNames={tabIconNames}
                        />
                    )
                }}
                tabBarPosition={'bottom'}
                locked={true}
                scrollWithoutAnimation={true}
            >
                <List tabLabel="list"/>
                <Edit tabLabel="edit"/>
                <Picture tabLabel="picture"/>
                <Account tabLabel="account"/>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});