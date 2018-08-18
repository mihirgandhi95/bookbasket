import React from 'react'
import $ from "jquery";






export default class BookPreview extends React.Component {



    componentDidMount() {
        var id = this.props.match.params.id;
        window.google.books.load();
        function initialize() {
            var viewer = new window.google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load('ISBN:'+id);
        }
        window.google.books.setOnLoadCallback(initialize);
    }


    render() {
        return(
            <div className="pageView">
                <div>
                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">
                            <div id="viewerCanvas" style={{width: "600px", height: "800px"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


