import React, { Component } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import TaskService from '../services/TaskService';

class ViewTaskComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            task: {}
        }
    }

    componentDidMount(){
        TaskService.getTaskById(this.state.id).then(res => {
            this.setState({task: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center'> View Task Details</h3>
                    <div className='card-body'>
                        <div className="row">
                            <label> Title: </label>
                            <div> { this.state.task.title } </div>
                        </div>
                        <div className="row">
                            <label> Description: </label>
                            <div> { this.state.task.description } </div>
                        </div>
                        <div className="row">
                            <label> Due Date: </label>
                            <div> { this.state.task.due_date } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams();
    return <ViewTaskComponent {...props} navigate={navigate} params={params}/>
}
export default WithNavigate;