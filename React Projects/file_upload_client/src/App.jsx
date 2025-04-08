import './App.css'
import axios from 'axios';
function App() {

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
     var formData = new FormData();
     formData.append('avatar', file);
    e.preventDefault();
    axios.post('http://localhost:3000/profile', formData , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  return (
    <>
    <div className="App">
      <form action="/profile" method="post" encType="multipart/form-data" onChange={handleChange}>
          <input type="file" name="avatar"/>
      </form>
    </div>
    </>
  )
}

export default App
