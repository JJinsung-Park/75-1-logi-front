import React from "react";

// MenuStructure은 Sidebar에 import된다

// map형식으로 아이콘삽입은 어려워 보인다 DB에서 저장된 데이터나 경로를 활용해야할듯 우선
// 삭제하지말고 남겨두자

import SidebarLink from "../Sidebar/components/SidebarLink/SidebarLink";

// redux
import { connect } from "react-redux";

// action-saga

const MenuStructure = ({ menuTitle, isSidebarOpened, location }) => {
  if (!menuTitle) {
    return <div>Loading... </div>;
  }

  return (
    <div>
      {menuTitle.map(title => (
        <SidebarLink
          key={title.menuCode}
          location={location}
          isSidebarOpened={isSidebarOpened}
          label={title.menuName}
          {...title}
        />
      ))}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    menuTitle: state.menuListReducer.menuList,
  };
};

export default connect(mapStateToProps)(MenuStructure);
