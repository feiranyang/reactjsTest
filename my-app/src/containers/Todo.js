import React from 'react';
import ReactDOM from 'react-dom';


class TodoList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{text: "Have lunch"},
				{text: "Have dinner"}
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

    let text = this.refs.text.value.trim()

    if(!text){
    	alert('Input is empty!')
    	return
    }

    //pass value to ListBox
    this.props.onTodoSubmit({
    	text: text
    })

    //clear input
    this.refs.text.value = ''
}
render() {
	return (
		<form className="ListForm" onSubmit={this.handleSubmit.bind(this)}>

		<div>
			<input type="text" placeholder="What to do..." ref="text" required/>
		</div>
			<input type="submit" value="Add to list"/>
		</form>
		)
}
}

class List extends React.Component {
	render() {
		let _this = this
		let todoNodes = this.props.data.map(function(item, index){
			return (
				<Todo key={index} index={index} onDeleteTodo={ _this.props.onDeleteTodo }>
				{item.text}
				</Todo>
				)
		})
		return (
			<div>
			{ todoNodes }
			</div>
			)
	}
}

class Todo extends React.Component {
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