import { Container, Text } from 'pixi.js'

export class StatusBar extends Container {
  static options = {
    padding: 20,
    textColor: 0xffff00,
    textColorShadow: 0x98cbd8,
    textShadowOffset: 0.5,
    textSize: 40
  }

  public levelText!: Text
  public levelTextShadow!: Text
  public orcsText!: Text
  public orcsTextShadow!: Text
  public timeText!: Text
  public timeTextShadow!: Text

  constructor () {
    super()
    this.setup()
  }

  static getLevelText (append: string | number): string {
    return `Level: ${append}`
  }

  static getOrcsText (append: string | number): string {
    return `Orc(s): ${append}`
  }

  static getTimeText (append: string | number): string {
    return `Time: ${append}`
  }

  setup (): void {
    const {
      options: {
        padding,
        textSize,
        textColor,
        textShadowOffset,
        textColorShadow
      }
    } = StatusBar

    const levelTextShadow = new Text(StatusBar.getLevelText(0), {
      fontSize: textSize * 0.8,
      fill: textColorShadow,
      align: 'center'
    })
    levelTextShadow.position.set(0, padding)
    this.addChild(levelTextShadow)
    this.levelTextShadow = levelTextShadow
    const levelText = new Text(StatusBar.getLevelText(0), {
      fontSize: textSize * 0.8,
      fill: textColor,
      align: 'center'
    })
    levelText.position.set(0 + textShadowOffset, padding + textShadowOffset)
    this.addChild(levelText)
    this.levelText = levelText

    const orcsTextShadow = new Text(StatusBar.getOrcsText(0), {
      fontSize: textSize * 0.8,
      fill: textColorShadow,
      align: 'center'
    })
    orcsTextShadow.position.set(levelTextShadow.x + levelTextShadow.width + padding * 2, levelTextShadow.y)
    this.addChild(orcsTextShadow)
    this.orcsTextShadow = orcsTextShadow
    const orcsText = new Text(StatusBar.getOrcsText(0), {
      fontSize: textSize * 0.8,
      fill: textColor,
      align: 'center'
    })
    orcsText.position.set(levelText.x + levelText.width + padding * 2, levelText.y)
    this.addChild(orcsText)
    this.orcsText = orcsText

    const centerX = this.width / 2
    const timeTextShadow = new Text(StatusBar.getTimeText(0), {
      fontSize: textSize * 0.8,
      fill: textColorShadow,
      align: 'center'
    })
    timeTextShadow.position.set(centerX - timeTextShadow.width / 2, levelTextShadow.y + levelTextShadow.height)
    this.addChild(timeTextShadow)
    this.timeTextShadow = timeTextShadow
    const timeText = new Text(StatusBar.getTimeText(0), {
      fontSize: textSize * 0.8,
      fill: textColor,
      align: 'center'
    })
    timeText.position.set(centerX - timeText.width / 2, levelText.y + levelText.height)
    this.addChild(timeText)
    this.timeText = timeText
  }

  updateTime (time: number): void {
    const timeTxt = (time * 0.001).toFixed(1)
    this.timeText.text = StatusBar.getTimeText(timeTxt)
    this.timeTextShadow.text = StatusBar.getTimeText(timeTxt)
  }

  updateLevel (level: number): void {
    this.levelText.text = StatusBar.getLevelText(level)
    this.levelTextShadow.text = StatusBar.getLevelText(level)
  }

  updateOrcs (orcs: number): void {
    this.orcsText.text = StatusBar.getOrcsText(orcs)
    this.orcsTextShadow.text = StatusBar.getOrcsText(orcs)
  }
}
