import { Navbar } from "../../../components/common";
import { shallow } from "enzyme";
import { LayoutItem } from '../../../models/types';

interface INavbar {
  darkMode: boolean;
  layout: LayoutItem;
  menuState: boolean;
}

describe('Test on <Navbar />', () => {
  const navbarParams: INavbar = {
    darkMode: true,
    layout: 'header',
    menuState: false,
  }

  const wrapper = shallow(
    <Navbar
      darkMode={navbarParams.darkMode}
      layout={navbarParams.layout}
      menuState={navbarParams.menuState}
    />
  );

  it('Should render correctly and show all the links', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Link').length).toBe(6);
  });
})