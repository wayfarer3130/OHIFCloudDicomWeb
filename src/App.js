import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listStudys } from './graphql/queries';
import { createStudy as createStudyMutation, deleteStudy as deleteStudyMutation, updateStudy as updateStudyMutation } from './graphql/mutations';

const initialFormState = { studyUID: '', json: '' }

function App() {
  const [studies, setStudies] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchStudies();
  }, []);

  async function fetchStudies() {
    const apiData = await API.graphql({ query: listStudys });
    setStudies(apiData.data.listStudys.items);
  }

  async function createStudy() {
    if (!formData.studyUID ) return;
    const studyData = await API.graphql({query: listStudys, variables: { filter: {studyUID: {eq: formData.studyUID} }}});
    if( studyData.data.listStudys.items.length>0 ) {
      const updateId = studyData.data.listStudys.items[0].id;
      console.log("Updating", updateId, "study", formData.studyUID);
      await API.graphql({ query: updateStudyMutation, variables: { input: {...formData, id:updateId} } });
      await fetchStudies();
    } else {
      await API.graphql({ query: createStudyMutation, variables: { input: formData } });
      setStudies([ ...studies, formData ]);
    }
    setFormData(initialFormState);
}

  async function deleteStudy({ id }) {
    const newStudiesArray = studies.filter(study => study.id !== id);
    setStudies(newStudiesArray);
    await API.graphql({ query: deleteStudyMutation, variables: { input: { id } }});
  }

  function editStudy(study) {
    let newFormData = {};
    for(const key in initialFormState) {
      newFormData[key] = study[key] || initialFormState[key];
    }
    setFormData(newFormData);
  }

  return (
    <div className="App">
      <h1>DICOMWeb App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'studyUID': e.target.value})}
        placeholder="Study UID"
        value={formData.studyUID}
      /> <br />
      <textarea
        style={({width:'640px', height:'320px'})}
        onChange={e => setFormData({ ...formData, 'json': e.target.value})}
        placeholder="JSON"
        value={formData.json==null ? '' : formData.json}
      /> <br />
      <button onClick={createStudy}>Create/Update</button>
      <div style={{marginBottom: 30}}>
        {
          studies.map(study => (
            <div key={study.id || study.studyUID}>
              <h2>{study.studyUID}</h2>
              <p>{study.json}</p>
              <button onClick={() => deleteStudy(study)}>Delete</button>
              <button onClick={() => editStudy(study)}>Edit</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);