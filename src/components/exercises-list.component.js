import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {response} from 'express';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  );

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExrcise = this.deleteExrcise.bind(this);

        this.state = {exercises : []};
    }

    componentDidMount() {
        axios.get('http://localhost:3000/exercises/') 
            .then(response => {
                this.setState({exercises : response.data})
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3000/exercises/'+id)
            .thhhen(response => {
                console.log(response.data);
            })
        this.setState({
            exercises : this.state.exercises.filter(el => el._id !== id)
        })
    }

    ExercisesList(){
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        });
    }

    render(){
        return (
            <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
        );
    }


}