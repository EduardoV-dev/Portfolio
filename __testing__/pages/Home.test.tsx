import {shallow} from "enzyme";
import Home from "../../pages";

describe('Tests on <Home />', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(
      <Home />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.container').exists()).toBeTruthy();
  });
});
