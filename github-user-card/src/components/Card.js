import React from 'react';
import axios from 'axios';

class Card extends React.Component {
    
    constructor() {
        super();
        this.state={
            avatar_url: "",
            name: "",
            login: "",
            location: "",
            profile: "",
            followers: "",
            following: "",
            bio: "",
            friends:[]
        };	
    }

    
    componentDidMount() {
        axios.get('https://api.github.com/users/Holly919')
        .then(response => {
            console.log("User data", response);
            this.setState({
                avatar_url: response.data.avatar_url,
                name: response.data.name,
                login: response.data.login,
                location: response.data.location,
                profile: response.data.url,
                followers: response.data.followers,
                following: response.data.following,
                bio: response.data.bio
            });
        })
        .catch(err => {
            console.log("Failed to get user", err);
        }); 
        axios.get('https://api.github.com/users/Holly919/followers')
        .then(res => {
            console.log("Follower logins", res.data)
            res.data.map(data=>{
                axios.get(`https://api.github.com/users/${data.login}`)
                .then(info => {
                    console.log("Friends data", info.data)
                    this.setState({
                      friends: info.data
                    }); 
                }) 
                return this.state.friends;
            }) 
            
             
        }) 
        .catch(err => {
            console.log("Failed to get friends", err);
        }); 
    }

    
 
    render() {
        return (
            <div className="card">
                <img src={this.state.avatar_url} alt="me" />
                <div className="card-info">
                    <h3 className="name">{this.state.name}</h3>
                    <p className="username">{this.state.login}</p>
                    <p>Location: {this.state.location}</p>
                    <p>Profile: 
                    <a href={this.state.profile}> {this.state.profile} </a>
                    </p>
                    <p>Followers: {this.state.followers}</p>
                    <p>Following: {this.state.following}</p>
                    <p>Bio: {this.state.bio}</p>
                </div>
                <div className="friends">
                    <p>{this.state.friends.name}</p>
                </div>
            </div>
        )
    };

}

export default Card;