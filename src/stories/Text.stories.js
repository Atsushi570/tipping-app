import { storiesOf } from '@storybook/vue'
import MyText from '~/components/atoms/Text'

storiesOf('atoms.Text', module)
  .add(
    'level',
    () => ({
      components: { MyText },
      template: `
      <div style="display: flex; flex-direction:column; align-items:center;">
        <MyText text="h2" level="h2" />
        <MyText text="h3" level="h3" />
        <MyText text="h4" level="h4" />
        <MyText text="h5" level="h5" />
        <MyText text="p" level="p" />
        <MyText text="label" level="label" />
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
        <MyText text="small" level="p" font-size="small" />
        <MyText text="middle" level="p" font-size="middle" />
        <MyText text="large" level="p" font-size="large" />
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
        <MyText text="black" level="p" font-size="large" font-color="black" />
        <MyText text="red" level="p" font-size="large" font-color="red" />
        <MyText text="green" level="p" font-size="large" font-color="green" />
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
        <MyText text="left" level="p" font-size="large" align="left" />
        <MyText text="center" level="p" font-size="large" align="center" />
        <MyText text="right" level="p" font-size="large" align="right" />
        </div>
        `
    }),
    {
      notes: 'some documentation here'
    }
  )
