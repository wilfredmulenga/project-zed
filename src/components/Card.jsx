import React from 'react'
const whiteBackground = {
  backgroundColor: '#FFF'
}

const Card = ({ key, project }) => (
  <div key={key} className="row justify-content-center">
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
          </div>
          <div className="col-7">
            <p style={{ display: 'inline', marginBottom: 20 }}>{project.description}</p>
            <p>
              {' '}
              Link:
              {' '}
              <a rel="noopener noreferrer" target="_blank" href={project.link}>{project.link}</a>
              {' '}
            </p>
          </div>
          <div>
            {/* TODO: add prop to dispatch action */}
            <button>Upvote</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Card
