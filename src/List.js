import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

const config = {
    apiKey: "AIzaSyDUvkwrvlP2ZsBRt8Id3wqc8kNYOhUzHOI",
    authDomain: "packlist-1d37f.firebaseapp.com",
    databaseURL: "https://packlist-1d37f.firebaseio.com",
    storageBucket: "packlist-1d37f.appspot.com",
    messagingSenderId: "958968865056"
};

firebase.initializeApp(config);

const list = firebase.database().ref().child('list');

class List extends Component {

    componentWillMount() {
        this.setState({
            questionList: [],
            status: '',
            question: ''
        });
    }

    componentDidMount() {
        let tempList = [];
        list.on('value', snap => {
            this.setState({questionList: []}, function () {
                snap.forEach(function (newPerson) {
                    tempList.push({
                        status: newPerson.val().status,
                        question: newPerson.val().question,
                        key: newPerson.key
                    });
                });
                this.setState({questionList: tempList}, function () {
                    tempList = [];
                });

            });

        });
    }

    setQuestion(e) {
        this.setState({
            question: e.target.value
        });
    }

    changeStatus(item, a, selected) {
        let status;
        switch(selected) {
            case 'yes':
                status = true;
                break;
            case 'no':
                status = false;
                break;
            default:
                status = 'unanswered';
                break;
        }
        item.status = status;
        list.child(item.key).set(item);
    }

    add() {
        list.push({
            status: 'unanswered',
            question: this.state.question
        });
        this.setState({
            status: '',
            question: ''
        });
    }

    remove(key) {
        list.child(key).remove();
    }

    render() {
        let self = this;

        return (
            <div className="pure-g" style={{padding: 20}}>
                <div className="pure-u-1" style={{fontSize: 30, marginBottom: 30}}>Ask Me A Question</div>

                <div className="pure-u-1-2" style={{marginBottom: 30}}>
                    <TextField name="question" hintText="Question"
                               onChange={this.setQuestion.bind(this)} value={this.state.question}/>
                    <RaisedButton label="Add" style={{marginLeft: 20}} onClick={this.add.bind(this)}/>
                </div>
                <Divider className="pure-u-1" style={{marginTop: 10, marginBottom: 10}}/>
                <div className="pure-u-1">
                    {this.state.questionList.map(function (item, key) {
                        let selected;
                        switch(item.status) {
                            case 'unanswered':
                                selected = false;
                                break;
                            case true:
                                selected = 'yes';
                                break;
                            case false:
                                selected = 'no';
                                break;
                        }

                        return (
                            <Card key={key} style={{margin: 20}}>
                                <CardHeader
                                    title={item.question} titleStyle={{fontSize: 20}}
                                />
                                <CardText>
                                    <RadioButtonGroup name="status" defaultSelected={selected} onChange={self.changeStatus.bind(this, item)}>
                                        <RadioButton
                                            value="yes"
                                            label="Yes"
                                        />
                                        <RadioButton
                                            value="no"
                                            label="No"
                                        />
                                    </RadioButtonGroup>

                                    </CardText>
                                <CardActions>
                                    <FlatButton label="Delete" onClick={self.remove.bind(this, item.key)}/>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default List;
