import React from 'react';
import commentBox from 'commentbox.io';

class PageWithComments extends React.Component {
     constructor(props) {
      super(props);
  }

    componentDidMount() {

        this.removeCommentBox = commentBox('5647378593873920-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.id} />
        );
    }
}

export default PageWithComments;