async function onCopyAsMarkdown(data){

    const textToCopy = "[" + document.title + "](" + data.pageUrl + ")"
    navigator.clipboard.writeText(textToCopy)
        .then(() => { alert(`已复制到剪贴板`) })
        .catch((error) => { alert(`复制失败! ${error}`) })
}

async function onCopyImageAsMarkdown(data){

    const textToCopy = "![](" + data.srcUrl + ")"
    navigator.clipboard.writeText(textToCopy)
        .then(() => { alert(`已复制到剪贴板`) })
        .catch((error) => { alert(`复制失败! ${error}`) })
}

// 监听 background 传来的数据 可对页面dom操作
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
	if (data.menuItemId) {
		switch (data.menuItemId) {
			case 'copy_as_markdown':
                onCopyAsMarkdown(data)
				break;
			case 'copy_image_as_markdown':
				onCopyImageAsMarkdown(data)
				break
			default:
				console.log("not defined")
		}
	}
});


