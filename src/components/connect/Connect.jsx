import React, { useState, useRef, Fragment } from 'react'
import TextField from '@mui/material/TextField';
import "./connect.css"
import { styled } from '@mui/material/styles';
import emailjs from '@emailjs/browser';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const Connect = ({page}) => {

  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [full_name, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();
  const sendEmail = (e) => {
    setSending(true)
    e.preventDefault();

    emailjs.sendForm('sedrickhoffman', 'basic_sedrick', form.current, 'aYAQ5JFb9VXU4N5K9')
      .then((result) => {
        console.log(result.text);
        setOpen(true)
        document.getElementById("sendmessage_form").reset();
        setSending(false)
        resetForm();
      }, (error) => {
        console.log(error.text);
        setOpen2(true)
        setSending(false)
      });
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpen2(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div className="connect__container" id='Contact'>
      <div className="connect_right">
        <div className="connect_bigshot">
          {page===0?"Let's chat.":"Liked what you saw?"}<br />{page===0?"Tell me about your work.":"Tell me more!"}
        </div>
        <div className="connect_smallshot">{page===0?"Let's create something together 🤘":"Tell me what you liked about this!"}</div>
        <a className="connect_mailme" href="mailto:saadhzubairi@outlook.com" style={{textDecoration:"none",color:"inherit"}}>
          <i class='bx bx-envelope connect_mailme_mailbutton' ></i>
          <div className="connect_mailme_col">
            <div className="connect_mailme_col_text">Mail me at</div>
            <div className="connect_mailme_col_email"><a href="mailto:saadhzubairi@outlook.com" className="connect_mailme_col_email_actual">saadhzubairi@outlook.com</a></div>
          </div>
        </a>
      </div>
      <div className="connect_left">
        <div className="sendmessage_float">
          <div className="sendmessage_float_heading">Send me a message!</div>
          <form className="sendmessage_float_form" id='sendmessage_form' onSubmit={sendEmail} ref={form}>

            <CssTextField disabled={sending} value={full_name} onChange={(e) => setFullName(e.target.value)} required variant="outlined" name='full_name' id="full_name" label="Full name" />
            <CssTextField disabled={sending} value={email} onChange={(e) => setEmail(e.target.value)} type='email' required variant="outlined" name='email' id="email" label="Email address" />
            <CssTextField disabled={sending} value={subject} onChange={(e) => setSubject(e.target.value)} id="subject" name='subject' label="Subject" />
            <div className="sendmessage_float_tell">{page===0?"Tell me something about your work*":"Write your feedback and quesions here*"}</div>
            <CssTextField disabled={sending} value={message} onChange={(e) => setMessage(e.target.value)} required id="message" name='message' label="" multiline rows={4} />
            <div className="sendmessage_float_button_div">
              <button disabled={sending} className="sendmessage_float_button" type="submit">
                {sending

                  ?
                  <>
                    <CircularProgress size="1rem" color='inherit' /> Sending...
                  </>
                  :
                  <>
                    Send Message
                  </>
                }


              </button>
            </div>

          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Email Sent!"
        action={action}
      />
      <Snackbar
        open={open2}
        autoHideDuration={6000}
        message="Unable to send email."
        action={action}
      />
    </div>
  )
}

export default Connect