import React, {Component} from 'react'
import {
  graphql,
  createFragmentContainer
} from 'react-relay'

import DrawerTypes from 'react-md/lib/Drawers/DrawerTypes'
import NavigationDrawer from 'react-md/lib/NavigationDrawers'

// inicio do TodoItem

class TodoItem extends React.Component {
  render() {
    const { items } = this.props
    return (
      {items.map(item => (
        <div key={item.id}>item.name</div>
      ))}
    )
  }
}

export default createFragmentContainer(TodoItem, {
  items: graphql`
    fragment TodoItem_items on TodoItemType {
      id
      name
    }
  `
});

// final do fragmento que faz wrap no componente TodoItem

// inicio do componente Layout, que tem o QueryRenderer, que faz as queries e declara os fragmentos
import TodoItem from './TodoItem';

class Layout extends Component {
  render() {
    return(
      <QueryRenderer
        query={graphql`
          query TodoItem {
            todos {
              ...TodoItem_items
            }
            menuInfo {
              ...MenuInfo__menu
            }
            user {
              ...Profile_ser
            }
            errors {
              ...Error_caquinha
            }
          }
        `}
        variables
        render={({ error, props }) => {
          if (props) {
            // return <TodoItem items={props.todos} />
            // esse App component é apenas um exemplo :) ele nao existe
            return (
              <App
                items={props.todos}
                menu={props.menuInfo}
                user={props.user}
              />
            )
          } else if (error) {
            return <Error caquinha={error} />
          }

          return <div>loading</div>
        }}
      />

      <NavigationDrawer
        toolbarTitle="Widget List"
        drawerTitle="NavigationMenu"
        desktopDrawerType={DrawerTypes.CLIPPED}
      >
        {this.props.children}
      </NavigationDrawer>
    )
  }
}

const layoutContainer = createFragmentContainer(Layout, {
  viewer: graphql`
    fragment Layout_viewer on User {
      id
      name
    }
  `
})

export default layoutContainer
