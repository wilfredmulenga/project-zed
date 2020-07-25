import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CloseOutlined } from '@material-ui/icons'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { icon } from '../../common/styles'

const useStyles = makeStyles((theme) => ({
  icon,
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const TransitionsModal = ({
  isOpen,
  handleClose,
  title = 'What would you like to do?'
}) => {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={() => handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}>
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <div className={classes.iconWrapper}>
            <CloseOutlined className={classes.icon} onClick={() => handleClose()} />
          </div>
          <h2 id="transition-modal-title">{title}</h2>
        </div>
      </Fade>
    </Modal>
  )
}

export default TransitionsModal
