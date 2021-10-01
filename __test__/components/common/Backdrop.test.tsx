import { Backdrop } from "../../../components/common";
import { shallow } from "enzyme";

describe('Tests on <Backdrop />', () => {
  const setState = jest.fn();
  const state = [false, true];

  it('Should render correctly', () => {
    const wrapper = shallow(
      <Backdrop
        state={state[1]}
        setState={setState}
      />
    );

    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('Should show and close after clicking on the component', () => {
    const wrapper = shallow(
      <Backdrop
        state={state[1]}
        setState={setState}
      />
    );

    const div = wrapper.find('div'); 

    expect(div.prop('className')?.includes('backdrop-true')).toBeTruthy();
    div.simulate('click');
    expect(setState).toHaveBeenCalled();
  });

  it('Should not show and open after clicking on the component', () => {
    const wrapper = shallow(
      <Backdrop
        state={state[0]}
        setState={setState}
      />
    );

    const div = wrapper.find('div'); 

    expect(div.prop('className')?.includes('backdrop-true')).toBeFalsy();
    div.simulate('click');
    expect(setState).toHaveBeenCalled();
  });
});