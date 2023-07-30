import { doc, getDoc, } from "firebase/firestore";
import { db } from '../firebase'
import React, { useEffect, useState } from "react";

const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    }
    const [state, setState] = useState(initialStateValues)
    

    const handleSubmit = e => {
        e.preventDefault();
        console.log(state);
        props.addOrEdit(state);
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const getLinkById = async (id) => {
        try {
            const document = await getDoc(doc(db, 'links', id))
        if (document.exists()) {
            console.log(document.data());
            setState({...document.data()})
        }
        } catch (error) {
            console.log("Error al obtener el documento:", error);
        }
        
    }

    useEffect(() => {
        console.log(props.currentId);
        if (props.currentId === '') {
            setState({ ...initialStateValues })
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId])
    
    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group mb-3">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    onChange={handleInputChange}
                    value={state.url}
                />
            </div>
            <div className="form-group input-group mb-3">
                <div className="input-group-text bg-light">
                    <i className="material-icons">chat_bubble</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="website name"
                    onChange={handleInputChange}
                    value={state.name}
                />
            </div>

            <div className="form-gruop mb-3">
                <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Write a description"
                    onChange={handleInputChange}
                    value={state.description}>
                </textarea>
            </div>
            <button className="btn btn-primary btn-block">{props.currentId===''? 'Save': 'Update'}</button>
        </form>
    )
};

export default LinkForm;