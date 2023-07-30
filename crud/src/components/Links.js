import React, { useEffect, useState } from "react";
import LinkForm from './LinkForm.js'
import { db } from '../firebase'
import { addDoc, collection, deleteDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Alertas

const Links = () => {

  const [links, setLinks] = useState([])
  const [currentId, setCurrentId] = useState("")


  const addOrEdit = async (linkObject) => {
    if (currentId === '') {
      try {
        // Agregar el registro en Firestore
        await addDoc(collection(db, 'links'), linkObject);
        // Muestra una alerta de éxito utilizando react-toastify
        toast.success('¡Registro insertado exitosamente!');
      } catch (error) {
        // Muestra una alerta de error utilizando react-toastify
        toast.error('Error al insertar el registro.');
        console.error('Error:', error);
      }
    } else {
      try {
        // Agregar el registro en Firestore
        await updateDoc(doc(db, 'links', currentId), linkObject)
        // Muestra una alerta de éxito utilizando react-toastify
        toast.info('¡Registro actualizado exitosamente!');
      } catch (error) {
        // Muestra una alerta de error utilizando react-toastify
        toast.error('Error al actualizar el registro.');
        console.error('Error:', error);
      }
      setCurrentId('')
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm('Está seguro de eliminar este enlace?')) {
      await deleteDoc(doc(db, 'links', id)).then(() => {
        toast.warning('¡Registro eliminado exitosamente!');
      }).catch((error) => {
        toast.warning("Error al eliminar el documento:", error);
      });
    }
  }

  const getLinks = () => {
    onSnapshot(collection(db, 'links'), (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id })
      });
      setLinks(docs);
    })
  };

  useEffect(() => {
    getLinks()
  }, [])


  return (<div>
    <LinkForm {...{ addOrEdit, currentId, links }} />
    <div className="col-md-8 p-2">
      {links.map(link => {
        return <div className="card mb-1">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h2>• {link.name}</h2>
              <div>
                <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
              </div>
            </div>
            <p>Descripción: {link.description}</p>
            <a href={link.url} target="_blank" rel="noreferrer">URL: {link.url}</a>
          </div>

        </div>
      })}
    </div>
  </div>)
}

export default Links;