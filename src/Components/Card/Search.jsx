import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react'

export default class Search extends Component {
    sendData = e =>{
        this.props.getDataFromSearch(e.target.value)
    }
    
    render() {
        return (
            <>
                <Form className="ml-auto mt-2">
                <InputGroup>
                    <InputGroup.Append>
                        <InputGroup.Text style={{backgroundColor: '#DADADA', borderRadius:'10px 0px 0px 10px'}}><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl  type="text" style={{backgroundColor: '#DADADA', borderRadius:' 0px 10px 10px 0px'}} placeholder="Search" onChange={this.sendData} className="mr-sm-2" />
                </InputGroup>
            </Form>
            </>
        )
    }
}

