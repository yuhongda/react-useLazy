import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Notification from 'vic-common/lib/components/antd/notification';
import { observable, computed, toJS, runInAction } from 'mobx'

export default function BeforeRoute(Component) {

    function getDisplayName(Component) {
        return Component.displayName || 
        Component.name || 
        'Component'
    }


    @observer
    @inject("store")
    class HockRoute extends React.Component {

        static contextTypes = {
            router: PropTypes.object.isRequired
        }
        
        @observable roles = {
            // admin所有权限，manager经理，operator运营
            admin:[
                '/StockInventoryList',
                '/CreateStockInventory',
                '/EditStockInventory',
                '/DashboardMarketingManager',
                '/DashboardMarketing',
                '/StockInventoryInfoList',
                '/NewProductDetector',
                '/DataSpider',
                '/StoreDetail'
            ],
            manager:[
                '/StockInventoryList',
                '/CreateStockInventory',
                '/EditStockInventory',
                '/DashboardMarketingManager',
                '/DashboardMarketing',
                '/StockInventoryInfoList',
                '/StoreDetail'
            ],
            operator:[
                '/StockInventoryList',
                '/CreateStockInventory',
                '/EditStockInventory',
                '/DashboardMarketingManager',
                '/StockInventoryInfoList',
                '/StoreDetail'
            ]
        }

        componentWillMount () {
            const { store: { common } } = this.props
            const { router: { history, route } } = this.context

            if (common.userInfo && common.userInfo.erp) {
                if(common.userInfo.role){
                    const { location: { pathname } } = route;
                    if(pathname == '/'){
                        return;
                    }
                    const _roles = toJS(this.roles);
                    if(_roles[common.userInfo.role].filter(item => {
                        return pathname.indexOf(item) >= 0;
                    }).length == 0){
                        history.replace(`/NoPermission`)
                    }
                }else{
                    history.replace(`/NoPermission`)
                }
            }else{
                Notification.error({ message: nj`登录失效，请重新<a href="http://ph.jd.com/api/logout">登录</a>`(), duration: null });
            }
        }

        render () {
            return React.createElement(
                Component,
                { ...this.props }
            )
        }

    }

    HockRoute.displayName = `HOC(${getDisplayName(Component)})`;
    return HockRoute
}