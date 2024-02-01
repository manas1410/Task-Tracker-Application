import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import TaskService from '../services/TaskService';

import {useNavigate,useParams} from 'react-router-dom';




class UpdateTaskComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id  : this.props.params.id,
            title: '',
            description: '',
            due_date: '',
        }
        
        this.changeTitleHandler =  this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDue_DateHandler = this.changeDue_DateHandler.bind(this);
        this.updateTask = this.updateTask.bind(this);
        
    }
    

    componentDidMount(){
        TaskService.getTaskById(this.state.id).then((res)=>{
            let task = res.data;
            this.setState({task: task.title,
                description: task.description,
                due_date: task.due_date
            });
        });
    }
    updateTask = (e) => {
        e.preventDefault();

        let task = {title: this.state.title, description:this.state.description,due_date: this.state.due_date};
        console.log("task => "+ JSON.stringify(task));
        console.log(this.props.params);
        
        
        
    }


    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }
    changeDue_DateHandler = (event) => {
        this.setState({due_date: event.target.value});
    }
    render() {
        return (
            <div>
                <div className='"container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Update Element </h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label> Title: </label>
                                        <input placeholder='Title' name="title" className='form-control'
                                            value = {this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label> Description: </label>
                                        <input placeholder='Description' name="description" className='form-control'
                                            value = {this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label> Due Date: </label>
                                        <input placeholder='Due Date' name="due_date" className='form-control'
                                            value = {this.state.due_date} onChange={this.changeDue_DateHandler}/>
                                    </div>

                                    <button className='btn btn-success' onClick={this.updateTask} > Update </button>
                                    <Link to="/"><button className='btn btn-danger' style={{marginLeft: "10px"}}>Cancel</button></Link>
                                </form>
                            </div>
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
    return <UpdateTaskComponent {...props} navigate={navigate} params={params}/>
}
export default  WithNavigate;