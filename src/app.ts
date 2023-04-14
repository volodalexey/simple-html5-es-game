import './styles.css'
import { SceneManager } from './SceneManager'
import { MainScene } from './MainScene'
import { LoaderScene } from './LoaderScene'

async function run (): Promise<void> {
  const ellipsis: HTMLElement | null = document.querySelector('.ellipsis')
  if (ellipsis != null) {
    ellipsis.style.display = 'none'
  }
  await SceneManager.initialize()
  const loaderScene = new LoaderScene({
    viewWidth: SceneManager.width,
    viewHeight: SceneManager.height
  })
  await SceneManager.changeScene(loaderScene)
  await loaderScene.initializeLoader()
  const { levelBackground, levelSettings, spritesheet: { animations } } = loaderScene.getAssets()
  await SceneManager.changeScene(new MainScene({
    app: SceneManager.app,
    viewWidth: SceneManager.width,
    viewHeight: SceneManager.height,
    levelSettings,
    textures: {
      levelBackgroundTexture: levelBackground,
      elvenTextures: {
        attackLeftTextures: animations['Elven-Attack-Left'],
        attackRightTextures: animations['Elven-Attack-Right'],
        attackUpTextures: animations['Elven-Attack-Up'],
        attackDownTextures: animations['Elven-Attack-Down'],
        walkLeftTextures: animations['Elven-Walk-Left'],
        walkRightTextures: animations['Elven-Walk-Right'],
        walkUpTextures: animations['Elven-Walk-Up'],
        walkDownTextures: animations['Elven-Walk-Down'],
        deadDownTextures: animations['Elven-Dead-Down']
      },
      orcTextures: {
        attackLeftTextures: animations['Orc-Attack-Left'],
        attackRightTextures: animations['Orc-Attack-Right'],
        attackUpTextures: animations['Orc-Attack-Up'],
        attackDownTextures: animations['Orc-Attack-Down'],
        walkLeftTextures: animations['Orc-Walk-Left'],
        walkRightTextures: animations['Orc-Walk-Right'],
        walkUpTextures: animations['Orc-Walk-Up'],
        walkDownTextures: animations['Orc-Walk-Down'],
        deadDownTextures: animations['Orc-Dead-Down']
      }
    }
  }))
}

run().catch((err) => {
  console.error(err)
  const errorMessageDiv: HTMLElement | null = document.querySelector('.error-message')
  if (errorMessageDiv != null) {
    errorMessageDiv.classList.remove('hidden')
    errorMessageDiv.innerText = ((Boolean(err)) && (Boolean(err.message))) ? err.message : err
  }
  const errorStackDiv: HTMLElement | null = document.querySelector('.error-stack')
  if (errorStackDiv != null) {
    errorStackDiv.classList.remove('hidden')
    errorStackDiv.innerText = ((Boolean(err)) && (Boolean(err.stack))) ? err.stack : ''
  }
  const canvas: HTMLCanvasElement | null = document.querySelector('canvas')
  if (canvas != null) {
    canvas.parentElement?.removeChild(canvas)
  }
})
