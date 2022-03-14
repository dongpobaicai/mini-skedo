import {Map as ImmutableMap, fromJS} from 'immutable'

import { ComponentMetaConfig, PropsEditorConfigure } from '../types/ComponentMeta'
import { KeyValueCache } from './KeyValueCache'
import { BoxMeta as BoxDescriptor } from './BoxMeta'

export default class ComponentMeta {
  name : string  
  group : string
  image : string
  title : string
  box : BoxDescriptor
  editor : PropsEditorConfigure
  intrinsic? :  boolean
  url? : string
  style? : any
  defaultProps : any
  imageUrl : string
  componentType : 'react' | "vue"
  props : {[name : string] : object}
  groups : Array<object>
  cache : KeyValueCache<any>

  

  constructor(config : ComponentMetaConfig) {
    
    this.cache = new KeyValueCache()
    this.name = config.name
    this.group = config.group
    this.image = config.image
    this.title = config.title
    this.box = new BoxDescriptor(config.box)
    this.intrinsic = config.intrinsic
    this.url = config.url
    this.style = config.style
    this.defaultProps = config.defaultProps
    this.imageUrl = config.imageUrl
    this.componentType = config.componentType || 'react'
    this.editor = config.editor
    this.props = {}
    this.groups = []
  }


  // createDataFromJson(json : object) :ImmutableMap<string, any> {
  //   const box = new BoxDescriptor(json.box, this)
  //   return fromJS({
  //     ...json,
  //     box 
  //   }) as ImmutableMap<string, any>
  // }

  /**
   * 创建实例数据
   * @param id 
   * @param box 
   * @returns 
   */
  createData(id : number, box : BoxDescriptor | null) {

    let data = ImmutableMap({
      id,
      parent: null,
      name : this.name,
      group: this.group,
      style: ImmutableMap<string, any>(),
      children: [],
      allowDrag: true,
      isMoving: false,
      editMode: false,
      passProps: fromJS(this.defaultProps || {}),
      box
    })

    data = data.update(
      "style",
      (style: any) => {
        const metaStyle = fromJS(this.style) as ImmutableMap<string,any>
        return style.merge(metaStyle)
      }
    ) 

    return data
  }

}
