import React, {Component} from 'react'
import {
  graphql,
  QueryRenderer,
  createFragmentContainer
} from 'react-relay'
import Layout from './Layout'
import WidgetList from './WidgetList'

// Usar o Query Renderer aqui e declarar o fragmento do componente Layout igual fizemos na live
//componente do caio
class App extends Component{
  render(){
    return (
      <QueryRenderer 
        environment={ envirorment }
        graphql={ grpahql`
          query Layout{
            layout{
              ...layout_viewer
            }

            errors{
              ...error_type
            }
          }` 
        }

        render={ (error, props) =>{
          if(error)
            return <Error type={ error } />

          if(props)
            return(
                  <Layout viewer={this.props.viewer}>
                    <WidgetList viewer={this.props.viewer}/>
                  </Layout>
            )
        }}
      />
    )
    
  }
}

export default createFragmentContainer(App, {
  viewer: graphql`
    fragment Layout_viewer on LayoutType{
      title
      color
    }
  `
})
//fim do componente do caio

export default class App extends Component {
  render() {
    return(
        <Layout viewer={this.props.viewer}>
          <WidgetList viewer={this.props.viewer}/>
        </Layout>
      );
  }
}
