import React from 'react'
import $ from "jquery";
import SearchService from "../services/SearchService"
import BookViewer from "./BookViewer"




export default class BookDescription extends React.Component {

    constructor(){
        super();
        this.state = {
            arrayOfBooksObjectNew : [],
            title: ''
        };

        this.SearchService = SearchService.instance;
        // this.createSearchForDescription = this.createSearchForDescription.bind(this);
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.SearchService.createSearchForDescription(id).then((response)=> {
            console.log("************ this is the response for BookDescription***********")
            console.log(response);

             // console.log(response.items[0].volumeInfo.allowAnonLogging);


            this.setState(
                {
                    arrayOfBooksObjectNew: response.items,
                    // title: response.items[0].volumeInfo.allowAnonLogging,
                }
            );

            console.log(this.state.arrayOfBooksObjectNew);

            // console.log('this.state.arrayofbookobjectsnew is:' + this.state.arrayOfBooksObjectNew);
        });
    }


    renderBooksNew()
    {
        var grid = this.state.arrayOfBooksObjectNew.map((book)=>{

            console.log("********* each item of the books array *********")
            console.log(book)
            return(
                <div>
                    {/*<img src = {book.volumeInfo.imageLinks.thumbnail}></img>*/}

                    <BookViewer book={book} key={book.id}/>

                </div>
            )
        })
        return(grid)
    }




    render() {
        return(
            <div >
                <h1>
                    {this.renderBooksNew()}
                </h1>

            </div>
        );
    }

}