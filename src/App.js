import React, { useEffect, useState } from "react";
import "./index.css";

const NavPrimaryItems = [
  {
    path: "/about/",
    text: "About",
    children: [
      { path: "/about/contributors/", text: "Contributors" },
      { path: "/about/partners/", text: "Partners" },
      { path: "/about/mascots/", text: "Mascots" },
      { path: "/about/governance/", text: "Governance" },
      { path: "/about/guidelines/", text: "Guidelines" },
      { path: "/about/newsletter/", text: "Our newsletter" },
      { path: "/about/contact/", text: "Contact us" }
    ]
  },
  {
    path: "/blog/",
    text: "Our blog",
    children: [
      {
        path: "/blog/categories/",
        text: "Categories"
      }
    ]
  },
  {
    path: "/community/",
    text: "Our community",
    children: [
      {
        path: "/community/membership/",
        text: "Become a member"
      },
      {
        path: "/community/slack/",
        text: "Slack",
        children: [
          {
            path: "/community/slack/channels/",
            text: "Slack channels"
          }
        ]
      },
      {
        path: "/community/sme/",
        text: "Subject matter experts"
      },
      {
        path: "/community/calendar/",
        text: "Calendar of events"
      },
      {
        path: "/community/swag/",
        text: "Swag"
      }
    ]
  },
  {
    path: "/conferences/",
    text: "Our conferences",
    children: [
      {
        href: "https://2021.wpcampus.org/",
        text: "WPCampus 2021"
      },
      {
        href: "https://2020.wpcampus.org/",
        text: "WPCampus 2020"
      },
      {
        href: "https://2019.wpcampus.org/",
        text: "WPCampus 2019"
      },
      {
        href: "https://2018.wpcampus.org/",
        text: "WPCampus 2018"
      },
      {
        href: "https://2017.wpcampus.org/",
        text: "WPCampus 2017"
      },
      {
        href: "https://2016.wpcampus.org/",
        text: "WPCampus 2016"
      },
      {
        href: "https://online.wpcampus.org/",
        text: "WPCampus Online"
      }
    ]
  },
  { path: "/learning/", text: "Learning" },
  { path: "/jobs/", text: "Job board" },
  { path: "/podcast/", text: "Podcast" },
  { href: "https://shop.wpcampus.org/", text: "Shop" }
];

const NavListItem = ({ item, id, selectedItemId, topLevelItemId }) => {
  // submenus start closed
  let open = false
  let topLevelOpen = false

  // if the li's id matches the selectedItem, open the submenu
  if (selectedItemId !== null && selectedItemId !== undefined && selectedItemId === id) {
    open = true
  }

  const topLevelItem = document.querySelector(`#${topLevelItemId}`)
  const selectedItem = document.querySelector(`#${selectedItemId}`)

  // if the top level item exists, and it contains the selected item but it is not the same node as the selected item
  if (topLevelItem && topLevelItem.contains(selectedItem) && !topLevelItem.isSameNode(selectedItem) && id === topLevelItemId) {
    topLevelOpen = true
  }

  // select the elements to create based on if there are submenus
  // if there are, make a new submenu with recursion
  return (
    <li id={id} className={topLevelOpen ? 'parent-open' : ''}>
      {
        item.children ? (
          <>
            <span>
              {item.text}
              <button id={`button-${id}`}>+</button>
            </span>
            <NavList
              list={item.children}
              isSubmenu={true}
              open={open}
              selectedItemId={selectedItemId}
              topLevelItemId={topLevelItemId}
            />
          </>
        ) : ( <span>{item.text}</span> )
      }
    </li>
  );
};

const NavList = ({ isSubmenu, open, topLevelOpen, list, selectedItemId, topLevelItemId }) => {
  const submenuClass = isSubmenu ? 'submenu' : ''
  const openClass = isSubmenu && open ? 'submenu-open' : ''

  return (
    <ul className={`${submenuClass} ${openClass}`}>
      {
        list.map((item, i) => (
          <NavListItem
            key={i}
            item={item}
            id={`item-${item.text.toLowerCase().replace(" ", "-")}`}
            selectedItemId={selectedItemId}
            topLevelItemId={topLevelItemId}
          />
        ))
      }
    </ul>
  );
};

const Nav = () => {
 
  // set the state for the selected item
  const [selectedItemId, setSelectedItemId] = useState(null)

  // figure out if there's a top level item like the our community/slack combo
  const [topLevelItemId, setTopLevelItemId] = useState(null)

  // attach a click handler to the entire nav component
  useEffect(() => {

    const navPrimaryList = document.querySelector('#navPrimary > ul')

    const clickHandler = evt => {
      
      const selectedId = evt.target.closest('li').id
      const topLevelId = evt.target.closest(`#navPrimary > ul > li`).id

      // select for the id of the target's parent <li>
      // pass the id to the list
      setSelectedItemId(selectedId)

      // find the closest item at the top of the tree to keep it open
      setTopLevelItemId(topLevelId)      
    }

    document.addEventListener('click', clickHandler)

    // clean up when the component unmounts
    return () => document.removeEventListener('click', clickHandler)
  }, [])

  return (
    <nav id="navPrimary">
      <NavList
        isSubmenu={false}
        open={true}
        list={NavPrimaryItems}
        selectedItemId={selectedItemId}
        topLevelItemId={topLevelItemId}
      />
    </nav>
  );
};

export default function App() {
  // instantiate the nav component
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Nav />
    </div>
  );
}