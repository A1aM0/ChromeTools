
/**
 * 添加右键菜单
 */
chrome.contextMenus.create({
    type: 'normal',
    title: 'Chrome Tools',
    contexts:['all'],
    id:'Menu_1'
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Copy URL as Markdown Format',
    contexts:['all'],
    id:'copy_as_markdown',
    parentId: 'Menu_1'
}, function () {
    console.log("创建成功")
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Copy Image as Markdown Format',
    contexts:['image'],
    id:'copy_image_as_markdown',
    parentId: 'Menu_1'
}, function () {
    console.log("创建成功")
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
	chrome.tabs.sendMessage(tab.id, item, function() {
		console.log(arguments, chrome.runtime.lastError);
	});
});
