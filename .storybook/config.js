import { configure, addDecorator } from '@storybook/vue'
import CommonCss from './Common.Css'

// bulmaなど共通で読み込みたいcssを読み込んでいるコンポーネントを全てのstoriesに注入する
addDecorator(() => ({
  components: { CommonCss },
  render() {
    return (
      <common-css>
        <story slot="story"></story>
      </common-css>
    )
  }
}))

// storiesディレクトリにある*.stories.jsファイルを読み込む
configure(require.context('../src/stories', true, /\.stories\.js$/), module)
