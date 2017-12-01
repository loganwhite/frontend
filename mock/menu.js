export default {
  getMenu(req, res) {
    res.json([{
    "id": "10000",
    "name": "基础资料",
    "children": [{
        "id": "10100",
        "name": "储粮区",
        "children": [],
        "icon": "world_edit",
        "path": "list"
    },
    {
        "id": "10200",
        "name": "地区",
        "children": [],
        "icon": "map",
        "path": "area/list"
    },
    {
        "id": "10800",
        "name": "插件管理",
        "children": [{
            "id": "10810",
            "name": "存储插件",
            "children": null,
            "icon": "plugin_edit",
            "path": "list"
        }],
        "icon": "plugin",
        "path": 'storage_plugin'
    }],
    "icon": "name_padding_left",
    "path": 'admin'
}]);
  },
};
