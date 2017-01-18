import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
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
            toDoList: [],
            title: '',
            status: '',
            description: ''
        });
    }

    componentDidMount() {
        let tempList = [];
        list.on('value', snap => {
            this.setState({toDoList: []}, function () {
                snap.forEach(function (newPerson) {
                    tempList.push({title: newPerson.val().title, status: newPerson.val().status, description: newPerson.val().description, key: newPerson.key});
                });
                this.setState({toDoList: tempList}, function () {
                    tempList = [];
                });

            });

        });
    }

    setTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    setDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    changeStatus(item, status) {
        console.log('status: ', item, status);
        item.status = !item.status;
console.log('new item: ', item);
        list.child(item.key).set(item);
    }

    add() {
        list.push({
            title: this.state.title,
            status: false,
            description: this.state.description
        });
        this.setState({
            title: '',
            status: '',
            description: ''
        });
    }

    remove(key) {
        list.child(key).remove();
    }

    render() {
        let self = this;
        return (
            <div style={{padding: 20}}>
                <TextField name="title" hintText="Title" onChange={this.setTitle.bind(this)} value={this.state.title}/>
                <TextField name="description" hintText="Description" onChange={this.setDescription.bind(this)} value={this.state.description}/>
                <RaisedButton label="Add" onClick={this.add.bind(this)}/>
                <Divider/>
                {this.state.toDoList.map(function (item, key) {
                    return (
                        <Card key={key} style={{margin: 20}}>
                            <CardHeader
                                title={item.title}
                                subtitle={<Checkbox name="status" checked={item.status} onCheck={self.changeStatus.bind(this, item)}/>}
                            />
                            <CardText>
                                {item.description}
                            </CardText>
                            <CardActions>
                                <FlatButton label="Delete" onClick={self.remove.bind(this, item.key)} />
                            </CardActions>
                        </Card>
                    )
                })}
            </div>
        );
    }
}

export default List;
