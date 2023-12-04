import React from 'react'
import TextField from '@mui/material/TextField';
import "./connect.css"
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
    borderRadius: '1rem',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
      borderRadius: '1rem',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
      borderRadius: '1rem',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
      borderRadius: '1rem',
    },
  },
});

const Connect = () => {

  return (
    <div className="connect__container" id='Contact'>
      <div className="connect_right">
        <div className="connect_bigshot">
          Let's chat.<br />Tell me about your project.
        </div>
        <div className="connect_smallshot">Let's create something together 🤘</div>
        <div className="connect_mailme">
          <i class='bx bx-envelope connect_mailme_mailbutton' ></i>
          <div className="connect_mailme_col">
            <div className="connect_mailme_col_text">Mail me at</div>
            <div className="connect_mailme_col_email"><a href="mailto:saadhzubairi@outlook.com" className="connect_mailme_col_email_actual">saadhzubairi@outlook.com</a></div>
          </div>
        </div>
      </div>
      <div className="connect_left">
        <div className="sendmessage_float">
          <div className="sendmessage_float_heading">Send me a message!</div>
          <div className="sendmessage_float_form">
            <CssTextField id="custom-css-outlined-input" label="Full name*" variant="outlined" />
            <CssTextField id="custom-css-outlined-input" label="Email address*" variant="outlined" />
            <CssTextField label="Subject" id="custom-css-outlined-input" />
            <div className="sendmessage_float_tell">Tell me everything about your project*</div>
            <CssTextField id="outlined-multiline-static" label="" multiline rows={4} />
            <div className="sendmessage_float_button_div">
              <button className="sendmessage_float_button">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connect