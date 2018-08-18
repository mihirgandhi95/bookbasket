import React from 'react'
import $ from "jquery";


export default class BookDescription extends React.Component {

    constructor(){
        super();
        this.state = {
            arrayOfBooksObjectNew : [],
        };

        this.SearchService = SearchService.instance;
        this.createSearchForDescription = this.createSearchForDescription.bind(this);
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.SearchService.createSearchForDescription(id).then((response)=> {
            // console.log("************ this is the response ***********")
            // console.log(response.items);


            this.setState(
                {
                    arrayOfBooksObjectNew: response.items[0],
                }
            );
        });
    }


    render() {
        return(
            <div >
                <h1>
                    {this.state.arrayOfBooksObjectNew.title}
                </h1>

            </div>
        );
    }

}