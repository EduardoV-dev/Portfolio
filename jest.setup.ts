import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

// @ts-ignore
Enzyme.configure({adapter: new Adapter()});
// @ts-ignore
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
