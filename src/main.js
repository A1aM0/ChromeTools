
async function copyTextToClipboard(text) {
	let aux = document.createElement("input"); 
    aux.setAttribute("value", text); 
    document.body.appendChild(aux); 
    aux.select();
    let result = document.execCommand("copy"); 
    document.body.removeChild(aux);
	
    if (result) {
        alert("复制成功");
    } else{
        alert('复制失败');
    }
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
