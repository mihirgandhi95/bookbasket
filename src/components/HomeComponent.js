import React from 'react'
import $ from "jquery";
import SearchService from "../services/SearchService"
import BookViewer from "./BookViewer"
import HomeBook from "./HomeBook"
import SearchBar from "./SearchBar"
import HeaderComponent from "./HeaderComponent";
import '../styles/BookViewerStyle.css';


export default class HomeComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            arrayOfBooksObjectHome : [],
            title: '',
            booksArray :  []
        };

        this.SearchService = SearchService.instance;
        // this.createSearchForDescription = this.createSearchForDescription.bind(this);
    }

    componentDidMount() {

       this.SearchService.createSearchForHome().then((response)=> {
            // console.log("************ this is the response for BookDescription***********")
            // console.log(response);
            // console.log('response.results is' + response.results);
            // // console.log(response.items[0].volumeInfo.allowAnonLogging);


            this.setState(
                {
                    arrayOfBooksObjectHome: response.results,
                    // title: response.items[0].volumeInfo.allowAnonLogging,
                }
            );

            if(this.state.arrayOfBooksObjectHome.map((book) => {

               if(book.isbns.length != 0)
               {
                   $.ajax({
                       async: false,
                       type:"GET",

                       url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+book.isbns[0].isbn10+"&key=AIzaSyBygcznGjWiVsPul4hXzlHXfeuKSRiIdCs",

                       success: (result)=>{

                           try {
                               console.log(result)
                               var joined = this.state.booksArray.concat(result.items[0].id);
                               this.setState({ booksArray: joined })
                           }
                           catch(err) {
                               //alert("error4")
                               this.setState({ err: true })
                           }



                       }


                   })


               }

                }));










            // console.log('this.state.arrayofbookobjectsnew is:' + this.state.arrayOfBooksObjectNew);
        });
    }

    renderBooksHome()
    {

        console.log("rendering books!!!!!!!!!!!!!!!!!!!")


        // var nonFriends = this.props.list.filter(function (user) {
        //     return !user.friend;
        // });


        var changearray = this.state.arrayOfBooksObjectHome.filter(function(book){
            // console.log('filter books');
            // console.log(book);
            return book.isbns.length != 0;
        });

        // console.log(this.state.booksArray);

        var grid = changearray.slice(0,12).map((book,index)=>{

            var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.booksArray[index])


            // console.log(this.state.booksArray[index])


            return(
                <div>
                    {/*<img src = {book.volumeInfo.imageLinks.thumbnail}></img>*/}

                    {/*<BookViewer book={book} key={book.id}/>*/}


                    <HomeBook book ={book} key={book.title} img={img}/>

                </div>
            )
        })
        return(grid)
    }




    render() {
        return(
            <div >
                <HeaderComponent/>
                <SearchBar/>

                <table>

                    <tbody>
                    <h1 className="ny">NY times Featured Books</h1>
                    <div className="card-deck">
                        {this.renderBooksHome()}
                    </div>
                    </tbody>
                </table>




            </div>
        );
    }




}
