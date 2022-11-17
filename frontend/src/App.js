import { url } from './global'
import axios from "axios"

function App() {

  // let options = {
  //   method: 'GET',
  //   url: `${url}/createAccount`,
  //   params: {email: 'testEmail', password: 'testPassword', phone: '111-111-1111', name: 'testName'}
  // }
  // axios.request(options).then((res) => {
  //   console.log(res.data)
  // })

  return (
    <div className="App">
      Hello World!
    </div>
  );
}

export default App;
