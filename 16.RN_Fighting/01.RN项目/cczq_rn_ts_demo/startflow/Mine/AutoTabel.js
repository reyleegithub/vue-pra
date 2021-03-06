/**
 * Created by yangli on 2019/4/13.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    AsyncStorage,
    Image,
    
} from 'react-native';

const flag_key = 'text';

import ViewUtil from './../../common/ViewUtil'
import LanguageDao, {FLAG_LANGUAGE} from './../../common/LanguageDao'
import Checkbox from 'react-native-check-box'
import ArrayUtils from './../../common/ArrayUtils'

export default class AutoTabel extends Component {

    static navigationOptions = ({navigation})=> {
        return {
            title: '自定义标签哈哈',
            headerLeft: ViewUtil.getLeftButton(()=> {
                navigation.goBack()
            })
        }
    }

    componentDidMount() {
        this._loadData();
    }

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues = [];
        this.state = {
            dataArray: []
        }
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) {
            return;
        }

        let len = this.state.dataArray.length;
        let views = [];
        for (let i=0; l=len-2,i<l;i+=2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckbox(this.state.dataArray[i])}
                        {this.renderCheckbox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2 === 0?
                        (this.renderCheckbox(this.state.dataArray[len-2])):
                        (this.renderCheckbox(this.state.dataArray[len-1]))}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }

    renderCheckbox(data) {
        return (
            <Checkbox
                style={{
                    flex: 1,
                    marginRight: 10
                }}
                onClick={()=>{
                    this._onClick(data)
                }}
                isChecked={data.checked}
                leftTextView={<Text>{data.name}</Text>}
                checkedImage={<Image
                    source={require('./../../res/img/ic_check_box.png')}
                />}
                unCheckedImage={<Image
                    source={require('./../../res/img/ic_check_box_outline_blank.png')}
                />}
            />
        )
    }

    _onClick(data) {
        data.checked = !data.checked;
        ArrayUtils.updataArray(this.changeValues,data);
        console.log(this.changeValues);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderView()}
            </View>
        );
    }

    _loadData() {
        this.languageDao.fetch().then(result=>{
            this.setState({
                dataArray: result
            })
        }).catch(err=>{
            console.log(err)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    line: {
        height: 1,
        backgroundColor: 'black'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
