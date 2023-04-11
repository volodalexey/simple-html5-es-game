export interface ITileLayer {
  data: number[]
  height: number
  id: number
  name: string
  opacity: number
  type: 'tilelayer'
  visible: boolean
  width: number
  x: number
  y: number
}

export interface IGroupLayer {
  id: number
  layers: ITileLayer[]
  name: string
  opacity: number
  type: 'group'
  visible: boolean
  x: number
  y: number
}

export interface IPolylinePoint {
  x: number
  y: number
}

export interface IObject {
  class: string
  height: number
  id: number
  gid: number
  name: string
  polyline: IPolylinePoint[]
  rotation: number
  visible: boolean
  width: number
  x: number
  y: number
}

export interface IObjectGroupLayer {
  draworder: 'topdown'
  id: number
  name: string
  objects: IObject[]
  opacity: number
  type: 'objectgroup'
  visible: boolean
  x: number
  y: number
}

export interface IMapSettings {
  compressionlevel: number
  height: number
  width: number
  infinite: boolean
  layers: Array<ITileLayer | IGroupLayer | IObjectGroupLayer>
  nextlayerid: number
  nextobjectid: number
  orientation: 'orthogonal'
  renderorder: 'right-down'
  tiledversion: number
  tilewidth: number
  tileheight: number
}

export interface IPositionData {
  x: number
  y: number
  width: number
  height: number
}

export abstract class MapSettings {
  static findTileLayer ({ name, mapSettings }: { name: string, mapSettings: IMapSettings }): ITileLayer {
    const layer = mapSettings.layers.find((l): l is ITileLayer => l.type === 'tilelayer' && l.name === name)
    if (layer == null) {
      throw new Error(`Unable to detect "${name}" tile layer`)
    }
    return layer
  }

  static findObjectGroupLayer ({ name, mapSettings }: { name: string, mapSettings: IMapSettings }): IObjectGroupLayer {
    const layer = mapSettings.layers.find((l): l is IObjectGroupLayer => l.type === 'objectgroup' && l.name === name)
    if (layer == null) {
      throw new Error(`Unable to detect "${name}" object group layer`)
    }
    return layer
  }

  static mapObjectToPositions ({
    mapSettings,
    layerName
  }: {
    mapSettings: IMapSettings
    layerName: string
  }): IPositionData[] {
    const positions: IPositionData[] = []
    const tileLayer = MapSettings.findObjectGroupLayer({ name: layerName, mapSettings })
    const tilesPerRow = mapSettings.width
    for (let i = 0; i < tileLayer.objects.length; i += tilesPerRow) {
      const object = tileLayer.objects[i]
      positions.push({ x: object.x, y: object.y, width: object.width, height: object.height })
    }
    return positions
  }
}
