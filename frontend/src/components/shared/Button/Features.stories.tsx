import { Meta, StoryObj } from '@storybook/react';
import Playground from './Playground.stories';
import Button from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Button/Features',
    parameters: Playground.parameters,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: { children: 'Button' },
};

export const Primary: Story = {
    args: { ...Default.args, variant: 'primary' },
};
