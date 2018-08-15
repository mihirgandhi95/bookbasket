
import React from 'react';
import SearchService from "../services/SearchService"

class HelloWorld extends React.Component {






    constructor(){
        super();
        this.state = {
            searchString: '',
        };
        this.SearchService = SearchService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createSearch = this.createSearch.bind(this);
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({searchString: event.target.value});
    }

    createSearch(searchString) {


        this.SearchService.search(this.state.searchString).then((response)=> {
            console.log(response)
        });


    }


    render() {
        return(
            <div>
            <div align="center">
                    <h1>Hello, world!</h1>
                    <h2> Welcome to the bookbucket app </h2>
            </div>
                <div>

                        <div className="inputField">
                            {/*<label for="search">Search Books</label>*/}
                            {/*<input type="search" id="books"></input>*/}
                            {/*<button className="btn btn-primary">Search</button>*/}
                            <input onChange={this.titleChanged}
                                   value={this.state.searchString}
                                   className="form-control"
                                   placeholder="title"/>
                            <button className="btn btn-primary" onClick={this.createSearch}>Search</button>
                        </div>


                </div>
            </div>
        )
    }
}
export default HelloWorld;