import { Component } from "react";

import Wrapper from "./components/Wrapper/Wrapper.styled";
import Searchbar from "./components/Searchbar/Searchbar";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Searchbar />
      </Wrapper>
    );
  }
}

export default App;
