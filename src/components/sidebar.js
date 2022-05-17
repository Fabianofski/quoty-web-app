import React from "react";
import Icon from "./Icon";

import { Navigation } from "react-minimal-side-navigation";
import "../ReactMinimalSideNavigation.css";

function Sidebar() {
  return (
    <>
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId="/management/members"
        onSelect={({ itemId }) => {
          // maybe push to the route
        }}
        items={[
          {
            title: "QUOTY",
            itemId: "/home",
            // you can use your own custom Icon component as well
            // icon is optional
            elemBefore: () => <Icon name="home" />,
          },
          {
            title: "Statistics",
            itemId: "/statistic",
            elemBefore: () => <Icon name="statistics" />,
            subNav: [
              {
                title: "Projects",
                itemId: "/management/projects",
              },
              {
                title: "Members",
                itemId: "/management/members",
              },
            ],
          },
          {
            title: "Another Item",
            itemId: "/another",
            subNav: [
              {
                title: "Teams",
                itemId: "/management/teams",
                elemBefore: () => <Icon name="teams" />,
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default Sidebar;
