import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TextField, Button, Typography } from '@material-ui/core';

import { ForgotPassword } from '../pages/account/ForgotPassword';

Enzyme.configure({
  adapter: new Adapter(),
});

const props = {
  user: {
    email: 'Email',
    emailRequired: 'Email is required',
    emailNotValid: 'Email is not valid',
  },
};

let wrapper;

describe('<ForgotPassword /> tests rendering', () => {
  beforeEach(() => {
    wrapper = shallow(<ForgotPassword {...props} />).dive();
  });

  it('should render a <Typography /> to display Esqueci a senha', () => {
    expect(wrapper.find(Typography)).toHaveLength(1);
  });

  it('should render a <Button /> to display Entrar/Voltar', () => {
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should render <TextField /> to display email', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('should have an empty email state var', () => {
    expect(wrapper.find('email')).toEqual({});
  });
});

describe('<ForgotPassword /> tests interacting', () => {
  beforeEach(() => {
    wrapper = (props) => shallow(<ForgotPassword {...props} />);
  });

  it('should render the component', () => {
    expect(wrapper(props).length).toEqual(1);
  });
});
