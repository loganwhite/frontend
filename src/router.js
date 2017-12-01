import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData, cMap, mMap, dy } from './common/nav';
import { getPlainNode } from './utils/utils';

import { queryMenu } from './services/api';

import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

async function getDyNavData(app) {
  const response = await queryMenu();
  return processNav(response, app);
}

function processNav(menu, app) {
  let nav = getNavData(app);
  addProperty(menu, app);
  nav[0].children = menu;
  return nav;
}

function addProperty(menu, app) {
  menu.map((item) => {
    if (!(item.children == null || item.children.length == 0)) {
      addProperty(item.children, app);
    } else {
      item.component = dy(app, mMap.get(item.id), cMap.get(item.id));
    }
    
  });
}

async function RouterConfig({ history, app }) {
  const navData = await getDyNavData(app);
  console.log(navData);
  //const navData = getNavData(app);
  const UserLayout = getLayout(navData, 'UserLayout').component;
  const BasicLayout = getLayout(navData, 'BasicLayout').component;

  const passProps = {
    app,
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
