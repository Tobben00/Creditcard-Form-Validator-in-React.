import Homepage from "./pages/Homepage"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route>
            <Route exact path="/" component={Homepage}/>
          </Route>
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
