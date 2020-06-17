import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector }  from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState} from './../../redux/User/user.actions';

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  useErr: user.useErr
})

const EmailPassword = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {resetPasswordSuccess, useErr } = useSelector(mapState);  
  const [email,setEmail] = useState('');
  const [errors,setErrors] = useState('');

  useEffect(() => {
    if (resetPasswordSuccess){
      dispatch(resetUserState());
      history.push('/login');
    }
  },[dispatch, history, resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(useErr) && useErr.length > 0) {
      setErrors(useErr);
    }
  },[useErr])
  

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  }  
    

    const configAuthWrapper = {
      headline: 'Email Password'
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">

          {errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return (
                  <li key={index}>
                    {e}
                  </li>
                );
              })}
            </ul>
          )}

          <form onSubmit={handleSubmit}>

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={e=>setEmail(e.target.value)}
            />

            <Button type="submit">
              Email Password
            </Button>

          </form>

        </div>
      </AuthWrapper>
    );
  }


export default EmailPassword;
