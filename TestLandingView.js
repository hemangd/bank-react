'use strict';

import React, { Component } from 'react';
import { 
  AppRegistry,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  Alert
} from 'react-native';

import Button from 'react-native-button'
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'

import ControlPanel from './ControlPanel'
import DrawerView from './DrawerView'
import MainContactsView from './MainContactsView'

let styles = require('./styles');
let BankClient = require('./libs/BankClient');
let bc = new BankClient();
let db = require('./libs/RealmDB');  
let dismissKeyboard = require('dismissKeyboard');

var TestLandingView = React.createClass({
    getInitialState() {
        dismissKeyboard();
        return {
            balance: "nil",
            drawerOpen: false,
        }
    },

    updateStateListener: function() {
        // Fetch account
        let user = db.objects('Account');
        var userAccount = user.slice(0,1);
        userAccount = userAccount[0];
        console.log(userAccount.AccountBalance);
        this.setState({ 'balance' : userAccount.AccountBalance });
    },

	componentDidMount: function() {
		// Observe Realm Change Events
		db.addListener('change', this.updateStateListener);
	},

    componentWillUnmount: function() {
        // Remove the listener
		db.removeListener('change', this.updateStateListener);
    },

    closeDrawer() {
        this._drawer.close()
    },

    openDrawer() {
        this._drawer.open()
    },

    render: function() {

        return (
          <DrawerView view={MainContactsView} />
        )
    }
});

module.exports = TestLandingView;
