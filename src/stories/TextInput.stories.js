import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import TextInput from '~/components/atoms/TextInput.vue'

storiesOf('atoms.TextInput', module)
  .add(
    'colors',
    () => ({
      components: { TextInput },
      template: `
    <div style="display: flex; flex-direction:column; align-items:center;">
      <TextInput colors="is-primary" @input="input($event)" placeholder="is-primary" style="margin: 16px 0;"></TextInput>
      <TextInput colors="is-info" @input="input($event)" placeholder="is-info" style="margin: 16px 0;"></TextInput>
      <TextInput colors="is-danger" @input="input($event)" placeholder="is-danger" style="margin: 16px 0;"></TextInput>
    </div>
  `,
      methods: {
        input: action('input')
      }
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'size',
    () => ({
      components: { TextInput },
      template: `
    <div style="display: flex; flex-direction:column; align-items:center;">
      <TextInput colors="is-primary" size="is-small" @input="input($event)" placeholder="is-small" style="margin: 16px 0;"></TextInput>
      <TextInput colors="is-primary" size="is-middle" @input="input($event)" placeholder="is-middle" style="margin: 16px 0;"></TextInput>
      <TextInput colors="is-primary" size="is-large" @input="input($event)" placeholder="is-large" style="margin: 16px 0;"></TextInput>
    </div>
  `,
      methods: {
        input: action('input')
      }
    }),
    {
      notes: 'some documentation here'
    }
  )
