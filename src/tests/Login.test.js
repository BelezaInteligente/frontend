import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TextField, Button, Typography } from '@material-ui/core';

import { Login } from '../pages/account/Login';

Enzyme.configure({
  adapter: new Adapter(),
});

const props = {
  user: {
    email: 'Email',
    password: 'Password',
    emailRequired: 'Email is required',
    emailNotValid: 'Email is not valid',
    passwordRequired: 'Password is required',
  },
};

let wrapper;

describe('<Login /> tests rendering', () => {
  beforeEach(() => {
    wrapper = shallow(<Login {...props} />);
  });

  it('should render a <Typography /> to display Login and Esqueceu a senha?', () => {
    expect(wrapper.find(Typography)).toHaveLength(2);
  });

  it('should render a <Button /> to display Entrar', () => {
    expect(wrapper.find(Button)).toHaveLength(1);

    expect(wrapper.find(Button).text()).toEqual('Entrar');
  });

  it('should render <TextField /> to display email and password', () => {
    expect(wrapper.find(TextField)).toHaveLength(2);
  });

  it('should have an empty email and password state var', () => {
    expect(wrapper.find('email')).toEqual({});
    expect(wrapper.find('password')).toEqual({});
  });
});

describe('<Login /> tests interacting', () => {
  beforeEach(() => {
    wrapper = (props) => shallow(<Login {...props} />);
  });

  it('should render the component', () => {
    expect(wrapper(props).length).toEqual(1);
  });
});
