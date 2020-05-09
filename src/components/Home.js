import React, { useContext } from 'react'
import { Context as ProjectContext } from '../config/projectContext'
import { Context as AuthContext } from '../config/authContext'

import Loader from './Loader'
import Card from './Card'
import Navbar from './Navbar'
import LoginModal from './Modals/LoginModal'

const Home = () => {
  const { state: projects } = useContext(ProjectContext)
  const { state: auth } = useContext(AuthContext)
  const { loggedIn, isLoginModalOpen } = auth

  if (!projects) {
    return (
      <div className=" row justify-content-center align-items-center loader-wrapper">
        <Loader />
      </div>
    )
  }

  return (
    <div className="main">
      <Navbar />
      <div className="max-height">
        <div className="landing-page-wrapper">
          <div>
            <p className="landing-page-text">Project Zed</p>
          </div>
          <p className="landing-page-subtext">
              Find projects done by Zambian Developers
          </p>
          {/* TODO: refactor logic to submit a project */}
          <button
            // onClick={() => setIsModalOpen(true) }
            className="btn btn-outline-info my-2 my-sm-0">
              Submit a project</button>
          <div className="arrow bounce">
            <a className="fa fa-arrow-down fa-2x down-arrow" href="#projects"><span></span></a>
          </div>
        </div>
      </div>
      <div id='projects'>
        {/*
          // @ts-ignore */}
        { projects.map((project, i) => <Card key={i} index={i} project={project} />) }
      </div>
      {/*
        // @ts-ignore */}
      {
        isLoginModalOpen
          ? <LoginModal
            loggedIn={loggedIn} />
          : null
      }
    </div>
  )
}

export default Home
