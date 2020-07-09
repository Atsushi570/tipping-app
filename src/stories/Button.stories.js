import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import Button from '~/components/atoms/Button.vue'

storiesOf('atoms.Button', module)
  .add(
    'colors',
    () => ({
      components: { Button },
      template: `
      <div style="display: flex; flex-direction:column; align-items:center;">
        <Button colors="is-primary" @click="action" btn-text="is-primary" style="margin: 16px 0;"></Button>
        <Button colors="is-info" @click="action" btn-text="is-info" style="margin: 16px 0;"></Button>
        <Button colors="is-danger" @click="action" btn-text="is-danger" style="margin: 16px 0;"></Button>
      </div>
    `,
      methods: { action: action('クリックされました') }
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'size',
    () => ({
      components: { Button },
      template: `
        <div style="display: flex; flex-direction:column; align-items:center;">
          <Button colors="is-primary" @click="action" btn-text="small" size="is-small" style="margin: 16px 0;"></Button>
          <Button colors="is-primary" @click="action" btn-text="normal" size="is-normal" style="margin: 16px 0;"></Button>
          <Button colors="is-primary" @click="action" btn-text="medium" size="is-medium" style="margin: 16px 0;"></Button>
        </div>
      `,
      methods: { action: action('クリックされました') }
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'align',
    () => ({
      components: { Button },
      template: `
        <div style="display: flex; flex-direction:column;">
          <Button colors="is-primary" @click="action" btn-text="left" align="left" style="margin: 16px 0;"></Button>
          <Button colors="is-primary" @click="action" btn-text="center" align="center" style="margin: 16px 0;"></Button>
          <Button colors="is-primary" @click="action" btn-text="right" align="right" style="margin: 16px 0;"></Button>
        </div>
      `,
      methods: { action: action('クリックされました') }
    }),
    {
      notes: 'some documentation here'
    }
  )
  .add(
    'disable',
    () => ({
      components: { Button },
      template: `
        <div style="display: flex; flex-direction:column;">
          <Button colors="is-primary" @click="action" btn-text="is-enable" style="margin: 16px 0;"></Button>
          <Button colors="is-primary " @click="action" btn-text="is-disable" :disable="true" style="margin: 16px 0;"></Button>
        </div>
      `,
      methods: { action: action('クリックされました') }
    }),
    {
      notes: 'some documentation here'
    }
  )
