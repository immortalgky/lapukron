import React from 'react';
import styled from 'styled-components'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

//import { Button, Welcome } from '@storybook/react/demo';

// Lapukron component
import MediaPanel from '../../src/components/MediaPanel'

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

const Theme = styled.div`
  font-family: 'Poppins', sans-serif;

  * {
    box-sizing: border-box;
  }
`

storiesOf('MediaPanel', module)
  .add('MediaPanel', () => <Theme><MediaPanel/></Theme>)
