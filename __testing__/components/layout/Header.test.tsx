import { Header } from "../../../components/layout";
import { mount } from "enzyme";
import { appContext } from '../../../hooks/context/AppContext';

import 'jsdom-global/register'
import { types } from "../../../hooks/reducer/types";

describe('Tests on <Header />', () => {
  const initialState = (darkMode: boolean) => ({
    darkMode: darkMode,
    projects: [],
  });

  it('Should render correctly without dark mode', () => {
    const value = {
      dispatch: jest.fn(),
      state: initialState(false),
    }

    const wrapper = mount(
      <appContext.Provider
        value={value}
      >
        <Header />
      </appContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Link').length).toBe(6);
    expect(wrapper.find('Logo').exists()).toBeTruthy();
    expect(wrapper.find('MenuToggler').exists()).toBeTruthy();
    expect(wrapper.find('ThemeToggler').exists()).toBeTruthy();
    expect(wrapper.find('Backdrop').exists()).toBeTruthy();
  });

  it('Should render correctly with dark mode', () => {
    const value = {
      dispatch: jest.fn(),
      state: initialState(true),
    }

    const wrapper = mount(
      <appContext.Provider
        value={value}
      >
        <Header />
      </appContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Link').length).toBe(6);
    expect(wrapper.find('Logo').exists()).toBeTruthy();
    expect(wrapper.find('MenuToggler').exists()).toBeTruthy();
    expect(wrapper.find('ThemeToggler').exists()).toBeTruthy();
    expect(wrapper.find('Backdrop').exists()).toBeTruthy();
  });

  it('Should turn on dark mode', () => {
    const value = {
      dispatch: jest.fn(),
      state: initialState(false),
    }

    const wrapper = mount(
      <appContext.Provider
        value={value}
      >
        <Header />
      </appContext.Provider>
    );

    expect(wrapper.find('header').prop('className')?.includes('container-light')).toBeTruthy();
    wrapper.find('ThemeToggler input').simulate('click');
    expect(value.dispatch).toHaveBeenCalledWith({ type: types.TOGGLEUIMODE });
  });

  it('Should turn off dark mode', () => {
    const value = {
      dispatch: jest.fn(),
      state: initialState(true),
    }

    const wrapper = mount(
      <appContext.Provider
        value={value}
      >
        <Header />
      </appContext.Provider>
    );

    expect(wrapper.find('header').prop('className')?.includes('container-dark')).toBeTruthy();
    wrapper.find('ThemeToggler input').simulate('click');
    expect(value.dispatch).toHaveBeenCalledWith({ type: types.TOGGLEUIMODE });
  });

  it('Should show the floating menu in a screen width less than 768px and then close it', () => {
    const value = {
      dispatch: jest.fn(),
      state: initialState(true),
    }

    const wrapper = mount(
      <appContext.Provider
        value={value}
      >
        <Header />
      </appContext.Provider>
    );

    // Show the menu
    wrapper.find('MenuToggler button').simulate('click');
    console.log(wrapper.find('Navbar Container nav').html());
    expect(wrapper.find('Backdrop div').prop('className')?.includes('backdrop-true')).toBeTruthy();
    expect(wrapper.find('Navbar Container nav').prop('className')?.includes('navbar-true')).toBeTruthy();
    // Close the menu
    wrapper.find('Backdrop div').simulate('click');
    expect(wrapper.find('Backdrop div').prop('className')?.includes('backdrop-true')).toBeFalsy();
    expect(wrapper.find('Navbar Container nav').prop('className')?.includes('navbar-true')).toBeFalsy();
  });
});