import { storiesOf } from '@storybook/vue'
import MyText from '~/components/atoms/Text'

storiesOf('atoms.Text', module)
  .add(
    'level',
    () => ({
      components: { MyText },
      template: `
      <div style="display: flex; flex-direction:column; align-items:center;">
        <MyText level="h2">h2</MyText>
        <MyText level="h3">h3</MyText>
        <MyText level="h4">h4</MyText>
        <MyText level="h5">h5</MyText>
        <MyText level="p">p</MyText>
        <MyText level="label">label</MyText>
      </div>
      `
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'fontSize',
    () => ({
      components: { MyText },
      template: `
        <div style="display: flex; flex-direction:column; align-items:center;">
        <MyText level="p" font-size="small">small</MyText>
        <MyText level="p" font-size="middle">middle</MyText>
        <MyText level="p" font-size="large">large</MyText>
        </div>
        `
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'color',
    () => ({
      components: { MyText },
      template: `
        <div style="display: flex; flex-direction:column; align-items:center;">
        <MyText level="p" font-size="large" font-color="black">black</MyText>
        <MyText level="p" font-size="large" font-color="red">red</MyText>
        <MyText level="p" font-size="large" font-color="green">green</MyText>
        </div>
        `
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'align',
    () => ({
      components: { MyText },
      template: `
        <div style="display: flex; flex-direction:column;">
        <MyText level="p" font-size="large" align="left">left</MyText>
        <MyText level="p" font-size="large" align="center">center</MyText>
        <MyText level="p" font-size="large" align="right">right</MyText>
        </div>
        `
    }),
    {
      notes: 'some documentation here'
    }
  )
