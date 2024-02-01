import React, { Component } from 'react';
import TaskService from '../services/TaskService';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

class ListTaskComponents extends Component{
    constructor(props){
        super(props)
        this.state = {
            tasks: []
        }
        this.deleteTask = this.deleteTask.bind(this);
        this.viewTask = this.viewTask.bind(this);
    }
    viewTask(id){
        this.props.navigate(`/view-task/${id}`);
    }
    deleteTask(id){
        TaskService.deleteTask(id).then(res =>{
            this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
        })
    }
    componentDidMount(){
        TaskService.getTasks().then((res) =>{
            this.setState({tasks: res.data});
        }
        );
    }

    
    render(){
        return (
            <div>
                <h2 className='text-center'>Tasks List</h2>
                <div className='row'>
                    <Link to={{pathname:'/add-task/_add'}}><button className='btn btn-primary' > Add Task </button></Link>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> Title </th> 
                                <th> Description </th>
                                <th> Due Date </th> 
                                <th> Actions </th>  
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.tasks.map(
                                    task =>
                                    <tr key = {task.id}>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{task.due_date}</td>
                                        <td>
                                            <Link to={{pathname:`/add-task/${task.id}`}}><button  className='btn btn-info'> Update </button></Link>
                                            <button onClick={ () => this.deleteTask(task.id)} style={{marginLeft:"10px"}} className='btn btn-danger'> Delete </button>
                                            <button onClick={ () => this.viewTask(task.id)} style={{marginLeft:"10px"}} className='btn btn-info'> View </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <ListTaskComponents {...props} navigate={navigate} />
}

export default WithNavigate;