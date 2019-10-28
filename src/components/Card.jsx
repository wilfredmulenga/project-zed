import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { likeOrDislike, toggleSignInModal } from '../actions/actionCreators'

const whiteBackground = {
  backgroundColor: '#FFF'
};

const Card = ({
  props: {
    dispatch,
    home: {
      loggedIn,
    },
    index,
    project,
  },
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispatch(likeOrDislike(index, liked));
  });

  const handleClick = () => {
    if (loggedIn) {
      setLiked(!liked);
    } else {
      dispatch(toggleSignInModal());
    }
  };

  return (
    <div key={index} className="row justify-content-center">
      <div className="col-md-8 col-sm-8 mb-4">
        <div>
          <div className="card-body row" style={whiteBackground}>
            <div className="col-5">
              <p style={{ display: 'inline', marginBottom: 20 }} className="card-title">{project.githubUsername}</p>
              <p>
            Tools:
                {' '}
                {project.tools.map((element, i) => (<span key={i} className="card-subtitle mr-1">{element}</span>))}
              </p>
              <p>{project.type}</p>
              <div className='like-container'>
                <div className="like" onClick={() => this.handleCick(index)}><p>{liked ? 'unlike' : 'like' }</p></div>
                <div className='like-count'>{project.likes}</div>
              </div>
            </div>
            <div className="col-7">
              <p className='remove-overflow-text' style={{ display: 'inline', marginBottom: 20 }}>{project.description}</p>
              <p>
                {' '}
            Link:
                {' '}
                <a className='remove-overflow-text' rel="noopener noreferrer" target="_blank" href={project.link}>{project.link}</a>
                {' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps ({ homeReducer }) {
  return {
    home: homeReducer
  }
}

export default connect(mapStateToProps, null)(Card)
