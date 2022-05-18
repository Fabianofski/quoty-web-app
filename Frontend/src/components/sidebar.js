import React from "react";
import { useNavigate } from 'react-router-dom';

import Icon from "./Icon";
import { Navigation } from "react-minimal-side-navigation";
import "../ReactMinimalSideNavigation.css";

function Sidebar() {

  let navigate = useNavigate();
  return (
    <>
      <Navigation
        onSelect={({ itemId }) => {
          navigate(itemId);
        }}
        items={[
          {
            title: "QUOTY",
            itemId: "/",
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
            title: "Database",
            itemId: "/database",
          },
        ]}
      />
    </>
  );
}

export default Sidebar;
