import React from 'react'
import './App.css';
import axios from 'axios';

import Trainers from './components/Trainers';


class App extends React.Component {
  
  state = {
    trainers: [],
    loading: false,
    singleTrainer: null,
    categories: false
  };

  async componentDidMount () {
    this.setState({loading: true})
    const res = await axios.get("http://localhost:5500/api/trainer")
    this.setState({loading: false, trainers: res.data})
  };

  render(){

    const {trainers, singleTrainer } = this.state
    
    // // ADD comment
    // const addComment = async(obj) => {
    //   const res = await axios.post('http://localhost:5500/api/trainer/', obj)
    //   this.setState({comments: [...comments, ...res.data]})
    // }
    // // select comment
    // const selectSingleComment = async(id) => {
    //   const res = await axios.get(`http://localhost:5500/api/trainer/${id}`)
    //   this.setState({singleComment: res.data})
    // }

    // // Delete Comment
    // const deleteComment = async(id) => {
    //   await axios.delete(`http://localhost:5500/api/trainer/${id}`)
    //   this.setState({comments: comments.filter(comment => comment.comments_id !== id)})
    // }

    // // Clear single comment
    // const clearSingleComment = () => {
    //   this.setState({singleComment: null})
    // }

    // const editComment = async(obj) => {
    //   const updatedComment= comments.map(comment => {
    //     if(obj.comments_id === comment.comments_id) {
          
    //       comment.comments = obj.comments
    //     } return comment
    //   })
    //   this.setState({comments: updatedComment})
    //   this.setState({singleComment: null}) 
      
      
    //   let newUpdate = {
    //     comments: obj.comments
    //   }
    //   await axios.patch(`http://localhost:4040/api/comments/${obj.comments_id}`, newUpdate)
    // }

    // Conditional Rendering
    // if(singleComment) {
    //   return (
    //     <div className="container">
    //       <SingleComment 
    //       singleComment={singleComment} 
    //       clearSingleComment={clearSingleComment}
    //       editComment={editComment}
    //       />
    //     </div>
    //   )
    // }
    


    return (
      <Trainers trainers={trainers}/>
    );
 
}
}
export default App;
