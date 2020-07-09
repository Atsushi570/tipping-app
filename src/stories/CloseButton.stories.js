import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import CloseButton from '~/components/atoms/CloseButton.vue'

storiesOf('atoms.CloseButton', module).add(
  'default',
  () => ({
    components: { CloseButton },
    template: `
    <div style="display: flex; flex-direction:column; align-items:center;">
      <CloseButton @clickClose="action" style="margin: 16px 0;"></CloseButton>
    </div>
  `,
    methods: { action: action('クリックされました') }
  }),
  {
    notes: 'some documentation here'
  }
)
