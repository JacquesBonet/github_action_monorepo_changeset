import $ from 'jquery';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

console.log('Setting up Jest..');
global.$ = global.jQuery = $;

Enzyme.configure({ adapter: new Adapter() });

window = window || {};

if (!window.localStorage) {
    window.localStorage = {
        setItem: jest.fn().mockImplementation(() => '{}'),
        getItem: jest.fn().mockImplementation(() => '{}'),
        removeItem: jest.fn().mockImplementation(() => '{}'),
    };
}

window.MP = {
    config: {
        currency: 'EUR',
        language: 'fr',
        urls: {
            api: 'http://findthisinjest.config.json',
        },
        enviro: 'sandbox',
    },
    trads: {},
    views: {},
};
