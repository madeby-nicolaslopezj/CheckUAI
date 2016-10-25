import React from 'react'
import { Column as Col, Row } from 'react-native-flexbox-grid';
import layouts from '../../styles/layouts';
import inputs from '../../styles/inputs';
import buttons from '../../styles/buttons';
import images from '../../styles/images';
import texts from '../../styles/texts';
import { getSetting, setSetting } from '../../api/settings';

import {
  MKTextField,
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import {
  View,
  Text,
  StatusBar
} from 'react-native';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setInitialState();
  }

  async setInitialState() {
    this.setState({
      token: await getSetting('token'),
      apiUrl: await getSetting('apiUrl'),
      masterPassword: await getSetting('masterPassword'),
      academicUnit: await getSetting('academicUnit'),
    });
  }

  save() {
    setSetting('token', this.state.token);
    setSetting('apiUrl', this.state.apiUrl);
    setSetting('masterPassword', this.state.masterPassword);
    setSetting('academicUnit', this.state.academicUnit);
    this.props.navigator.pop();
  }

  cancel() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={[layouts.centerContainer, { backgroundColor: MKColor.BlueGrey }]}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Row style={{ marginTop: 70 }}>
          <Col smOffset={1} sm={10} mdOffset={3} md={6} lgOffset={4} lg={4}>
            <Text style={{ color: '#BFBFBF' }}>App Token</Text>
            <MKTextField
              style={inputs.textfield}
              highlightColor={MKColor.Silver}
              textInputStyle={{color: MKColor.Silver}}
              placeholder='Token'
              autoCapitalize='none'
              autoCorrect={false}
              value={this.state.token}
              onChangeText={(token) => this.setState({ token })}
            />

            <Text style={{ color: '#BFBFBF' }}>Api URL</Text>
            <MKTextField
              style={inputs.textfield}
              highlightColor={MKColor.Silver}
              textInputStyle={{color: MKColor.Silver}}
              placeholder='URL'
              autoCapitalize='none'
              autoCorrect={false}
              value={this.state.apiUrl}
              onChangeText={(apiUrl) => this.setState({ apiUrl })}
            />

          <Text style={{ color: '#BFBFBF' }}>Master Password</Text>
            <MKTextField
              style={inputs.textfield}
              highlightColor={MKColor.Silver}
              textInputStyle={{color: MKColor.Silver}}
              placeholder='Password'
              autoCapitalize='none'
              autoCorrect={false}
              value={this.state.masterPassword}
              onChangeText={(masterPassword) => this.setState({ masterPassword })}
            />

          <Text style={{ color: '#BFBFBF' }}>Unidad Academica</Text>
              <MKTextField
                style={inputs.textfield}
                highlightColor={MKColor.Silver}
                textInputStyle={{color: MKColor.Silver}}
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.academicUnit}
                onChangeText={(academicUnit) => this.setState({ academicUnit })}
              />

            <Row>
              <Col sm={6}>
                <MKButton
                  backgroundColor={MKColor.Silver}
                  shadowRadius={2}
                  shadowOpacity={.5}
                  shadowColor='black'
                  onPress={this.cancel.bind(this)}
                  style={[buttons.settings, { marginRight: 5 }]}>
                  <Text style={buttons.settingsText}>CANCEL</Text>
                </MKButton>
              </Col>
              <Col sm={6}>
                <MKButton
                  backgroundColor={MKColor.Silver}
                  shadowRadius={2}
                  shadowOpacity={.5}
                  shadowColor='black'
                  onPress={this.save.bind(this)}
                  style={[buttons.settings, { marginLeft: 5 }]}>
                  <Text style={buttons.settingsText}>SAVE</Text>
                </MKButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </View>
    );
  }
};
