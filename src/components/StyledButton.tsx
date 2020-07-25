import React from 'react'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { BASE_GREEN, DARK_GREEN, PURE_WHITE, ERROR_RED, TOMATO_RED } from '../common/colors'

const theme = createMuiTheme()

const useStyles = makeStyles((theme) => ({
  root: {
    color: PURE_WHITE,
    backgroundColor: BASE_GREEN,
    fontFamily: 'Roboto medium',
    '&:hover': {
      backgroundColor: DARK_GREEN
    },
    marginTop: theme.spacing(4)
  },
  error: {
    backgroundColor: ERROR_RED,
    '&:hover': {
      backgroundColor: TOMATO_RED
    },
    marginTop: theme.spacing(4)
  }
}))

const StyledButton = ({ text, error, onClick = () => {} }) => {
  const classes = useStyles(theme)
  return (
    <Button
      onClick={onClick}
      className={error ? classes.error : classes.root}>
      {text}
    </Button>
  )
}

export default StyledButton
