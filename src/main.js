async function copyTextToClipboard(text) {
	navigator.clipboard.writeText(text)
		.then(() => { alert(`已复制到剪贴板`) })
		.catch((error) => { alert(`复制失败! ${error}`) })
}

async function onCopyAsMarkdown(data){

    const textToCopy = "[" + document.title + "](" + data.pageUrl + ")"
    copyTextToClipboard(textToCopy)
}

async function onCopyImageAsMarkdown(data){

    const textToCopy = "![](" + data.srcUrl + ")"
    copyTextToClipboard(textToCopy)
}

async function onCopyImageBase64(data) {
	var textToCopy = await fetch(data.srcUrl).then(function(resp) {
		return resp.blob()
	}).then(async function(imageData) {
		const resultString = await blob2Base64(imageData)
		return resultString
	})
	textToCopy = "![](" + textToCopy + ")"
	copyTextToClipboard(textToCopy)
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
			case 'copy_image_base64_encoded':
				onCopyImageBase64(data)
			default:
				console.log("not defined")
		}
	}
});
