import './_storybook-fonts.scss';
import '../src/css/app.scss';
import './styles.scss';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RecoilRoot } from 'recoil';
import AppInits from '../src/components/general/AppInits';

initialize();

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'dark',
                value: '#050a47',
            },
            {
                name: 'light',
                value: '#fff',
            },
        ],
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    mswDecorator,
    (Story) => (
        <RecoilRoot>
            <AppInits />
            <Story />
        </RecoilRoot>
    ),
];
