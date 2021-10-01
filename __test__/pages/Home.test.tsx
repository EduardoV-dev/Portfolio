import { mount } from 'enzyme';
import { appContext } from '../../hooks/context/AppContext';
import { IAppContext } from '../../models/interfaces';
import { initialState } from '../fixtures';
import 'jsdom-global/register'
import Home from '../../pages';

describe('Tests on Home />', () => {
  const value = (darkMode: boolean, projects: []): IAppContext => ({
    dispatch: jest.fn(),
    state: initialState(darkMode, projects),
  });

  it('Should render correctly', () => {
    const wrapper = mount(
      <appContext.Provider value={value(false, [])}>
        <Home />
      </appContext.Provider>
    );

    expect(wrapper.find('h1').text()).toBe('Portfolio');
  });
});
