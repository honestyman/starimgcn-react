import React from 'react';
import StarCardProfile from './index';
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme'

test('test starToast', () => {
    const props = {
        domain: 'wuqian',
        name: '吴倩',
        avatar: 'https://img.starimg.cn/star/1/avatar/1-gmmdx5ee.jpg',
        verified: true,
        id: 1,
        description: 'this is person description'
    }
    const component = renderer.create(
        <StarCardProfile {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})