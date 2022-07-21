import { colors } from "../theme";
//import { Node } from 'd3-hierarchy';

var siteData = {
    "name": "App",
    "children": [
      {
        "name": "NavBar",
        "children": [
          {
            "name": "Logo"
          },
          {
            "name": "Buttons",
            "children": [
              {
                "name": "Home"
              },
              {
                "name": "Login"
              },
              {
                "name": "SignUp"
              }
            ]
          }
        ]
      },
      {
        "name": "Body",
        "children": [
          {
            "name": "TodoList"
          }
        ]
      },
      {
        "name": "Footer",
        "children": [
          {
            "name": "ContactInfo"
          },
          {
            "name": "OtherButtons"
          }
        ]
      }
    ]
  };

export const Graph = () => {



};