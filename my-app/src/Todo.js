import React from 'react';
import ReactDOM from 'react-dom'; 

class TodoList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{task: "Have lunch"},
				{task: "Have dinner"}
			]
		}
	}

	handleTodoSubmit(todo){
		let data = Object.assign([], this.state.data)
		data.push(todo)
		this.setState({ data: data })
	}

	handleDeleteTodo(e) {
		const _index = e.target.parentNode.getAttribute('data-key')
		let data = Object.assign([], this.state.data)
		data.splice(_index, 1);
		this.setState({ data: data })
	}

	render() {
		return (
			<div>
				<h1>To Do List</h1>
				<List data={this.state.data} onDeleteTodo={this.handleDeleteTodo.bind(this)}/>
				<ListForm onTodoSubmit={ this.handleTodoSubmit.bind(this) }/>

			</div>
			)
	}
}

class ListForm extends React.Component {
	handleSubmit(e){
		e.preventDefault()

    let task = this.refs.task.value.trim()

    if(!task){
    	alert('Input is empty!')
    	return
    }

    //Pass value to TodoList
    this.props.onTodoSubmit({
    	task: task
    })

    //Clear input
    this.refs.task.value = ''
}
render() {
	return (
		<form onSubmit={this.handleSubmit.bind(this)}>

		<div>
			<input type="task" placeholder="What to do..." ref="task" required/>
		</div>
			<input type="submit" value="Add to list"/>
		</form>
		)
}
}

class List extends React.Component {
	render() {
		let _this = this
		let todoItems = this.props.data.map(function(item, index){
			return (
				<TodoItem key={index} index={index} onDeleteTodo={ _this.props.onDeleteTodo }>
					{item.task}
				</TodoItem>
				)
		})
		return (
			<div>
			{ todoItems }
			</div>
			)
	}
}

class TodoItem extends React.Component {
	render() {
		return (
			<div data-index={this.props.index}>			
				<p>{ this.props.children }</p>
				<button onClick={this.props.onDeleteTodo}>delete</button>
			</div>
			)
	}
}


export default TodoList;