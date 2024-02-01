import React, { Component} from 'react';
import TaskService from '../services/TaskService';
import {useNavigate,useParams} from 'react-router-dom';

class CreateTaskComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id  : this.props.params.id,
            title: '',
            description: '',
            due_date: ''
        }
        this.changeTitleHandler =  this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDue_DateHandler = this.changeDue_DateHandler.bind(this);
        this.saveOrupdateTask = this.saveOrupdateTask.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if(this.state.id === "_add"){
            return
        }else{
        TaskService.getTaskById(this.state.id).then((res)=>{
            let task = res.data;
            this.setState({title: task.title,
                description: task.description,
                due_date: task.due_date
            });
        });
    }
    }

    saveOrupdateTask = (e) => {
        e.preventDefault();
        let task = {title: this.state.title, description:this.state.description,due_date: this.state.due_date};
        console.log("task => "+ JSON.stringify(task));
        if(this.state.id === "_add"){
            TaskService.createTask(task).then(res =>{
                this.props.navigate("/tasks")
            })
        }
        else{
            TaskService.updateTask(task,this.state.id).then(res=>{
                this.props.navigate("/tasks")
            });
        }
    }
    cancel(event){
        event.preventDefault();
        this.setState({title:' ',description:' ',due_date:' '})
        console.log("cancel to add task");
        this.props.navigate('/tasks')
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

    getTitle(){
        if(this.state.id === -1){
            return <h3 className='text-center'> Add Element </h3>
        }
        else{
            return <h3 className='text-center'> Update Element </h3>
        }
    }
    render() {
        return (
            <div>
                <div className='"container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.getTitle()
                            }
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
                                        <input placeholder='YYYY-MM-DD' name="due_date" className='form-control'
                                            value = {this.state.due_date} onChange={this.changeDue_DateHandler}/>
                                    </div>

                                    <button className='btn btn-success' onClick={this.saveOrupdateTask} > Save </button>
                                    <button className='btn btn-danger' onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
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
    return <CreateTaskComponent {...props} navigate={navigate} params={params}/>
}
export default WithNavigate;