import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [state, setState] = useState({});
  const [showSuccess, setShowSuccess] = useState(false)
  const submit = () => {
    const data = {
      "name": fullname,
      "email": email,
      "password": password,
      "occupation": occupation,
      "state": state
    }
    console.log('data', data)
    axios.post('https://frontend-take-home.fetchrewards.com/form', data).then(res => {
      console.log('res', res);
      setShowSuccess(true)
      setFullname('');
      setEmail('');
      setPassword('')
    })
    console.log('submit', data)
  }

  useEffect(() => {
    if (stateOptions.length === 0 && occupationOptions.length === 0)
      axios.get(`https://frontend-take-home.fetchrewards.com/form`)
        .then(res => {
          setOccupationOptions(res.data.occupations);
          setStateOptions(res.data.states);
          setOccupation(res.data.occupations[0])
          setState(res.data.states[0].name)
        })

    if (showSuccess)
      setTimeout(() => {
        setShowSuccess(false)
      }, 1000)
  }, [occupationOptions, stateOptions, showSuccess])

  return (
    <div className="App">
      <div>
        <label>Full name</label>
        <input type="text" name="fullname" onChange={e => setFullname(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="text" name="password" onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Occupation</label>
        <select type="text" name="occupation" onChange={(e) => setOccupation(e.target.value)}>
          {occupationOptions.map((s, i) =>
            <option key={i} >{s}</option>
          )}
        </select>
      </div>
      <div>
        <label>State</label>
        <select type="text" name="occupation" onChange={(e) => setState(e.target.value)} >
          {stateOptions.map((s, i) =>
            <option key={i} >{s.name}</option>
          )}
        </select>
      </div>
      <button type="submit" value="Submit" onClick={submit} disabled={!(fullname && email && password)}>Submit</button>
      {
        showSuccess && <h2>Successfully saved</h2>
      }
    </div>
  );
}

export default App;
